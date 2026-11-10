using System.Net;
using System.Text;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Portfolio.Functions.GitHub;

namespace Portfolio.Functions.Tests;

public class GitHubTests
{
    /// <summary>Answers like the GitHub API, without going on the network.</summary>
    private sealed class FakeGitHub(Dictionary<string, string> answers) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        {
            var path = request.RequestUri!.AbsolutePath.TrimStart('/');
            var response = answers.TryGetValue(path, out var json)
                ? new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent(json, Encoding.UTF8, "application/json") }
                : new HttpResponseMessage(HttpStatusCode.NotFound);
            return Task.FromResult(response);
        }
    }

    private static GitHubClient Client(Dictionary<string, string> answers) =>
        new(new HttpClient(new FakeGitHub(answers)) { BaseAddress = new Uri("https://api.github.com/") },
            Options.Create(new GitHubOptions()));

    private static readonly Dictionary<string, string> QrShield = new()
    {
        ["repos/ManuelDavid69/QRShield"] = """{"name":"QRShield","pushed_at":"2026-11-01T10:00:00Z","stargazers_count":3}""",
        ["repos/ManuelDavid69/QRShield/languages"] = """{"TypeScript":5000,"Python":9000,"Dockerfile":100}""",
    };

    [Fact]
    public async Task Reads_the_repository_and_sorts_languages_by_size()
    {
        var stats = await Client(QrShield).GetStatsAsync("ManuelDavid69/QRShield", default);

        Assert.Equal("QRShield", stats.Repo);
        Assert.Equal(new DateTime(2026, 11, 1, 10, 0, 0, DateTimeKind.Utc), stats.LastCommitAt);
        Assert.Equal(["Python", "TypeScript", "Dockerfile"], stats.Languages);
        Assert.Equal(3, stats.Stars);
    }

    private sealed class FakeStore : IRepoStatsStore
    {
        public List<RepoStats> Saved { get; } = [];

        public Task SaveAsync(RepoStats stats, CancellationToken ct)
        {
            Saved.Add(stats);
            return Task.CompletedTask;
        }
    }

    [Fact]
    public async Task A_missing_repository_does_not_stop_the_others()
    {
        var store = new FakeStore();
        var options = Options.Create(new GitHubOptions { Repos = "ManuelDavid69/Deleted, ManuelDavid69/QRShield" });
        var sync = new SyncGitHubStats(Client(QrShield), store, options, NullLogger<SyncGitHubStats>.Instance);

        var updated = await sync.SyncAllAsync(default);

        Assert.Equal(1, updated);
        Assert.Equal("QRShield", store.Saved.Single().Repo);
    }
}
