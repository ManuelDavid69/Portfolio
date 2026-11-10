using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql;
using Portfolio.Functions.Contact;
using Portfolio.Functions.GitHub;

var builder = FunctionsApplication.CreateBuilder(args);

// Same PostgreSQL database as the NestJS API. The functions only touch two tables with plain SQL.
builder.Services.AddSingleton(_ =>
    NpgsqlDataSource.Create(builder.Configuration["Database"]
        ?? throw new InvalidOperationException("The Database setting is missing.")));

builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));
builder.Services.Configure<GitHubOptions>(builder.Configuration.GetSection("GitHub"));

builder.Services.AddSingleton<IContactStore, ContactStore>();
builder.Services.AddSingleton<IMailSender, SmtpMailSender>();
builder.Services.AddSingleton<IRepoStatsStore, RepoStatsStore>();
builder.Services.AddHttpClient<IGitHubClient, GitHubClient>(client =>
{
    client.BaseAddress = new Uri("https://api.github.com/");
    // GitHub refuses requests without a User-Agent.
    client.DefaultRequestHeaders.UserAgent.ParseAdd("davidmanuel-portfolio");
    client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github+json");
});

builder.Build().Run();
