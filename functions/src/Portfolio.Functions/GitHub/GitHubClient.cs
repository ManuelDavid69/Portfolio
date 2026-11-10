using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;

namespace Portfolio.Functions.GitHub;

public sealed class GitHubOptions
{
    /// <summary>Comma separated list of "owner/name".</summary>
    public string Repos { get; set; } = "";

    /// <summary>Optional. Without a token GitHub allows 60 requests per hour, which is enough here.</summary>
    public string Token { get; set; } = "";

    public IReadOnlyList<string> RepoList =>
        Repos.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}

public sealed record RepoStats(string Repo, DateTime? LastCommitAt, IReadOnlyList<string> Languages, int Stars);

public interface IGitHubClient
{
    Task<RepoStats> GetStatsAsync(string fullName, CancellationToken ct);
}

public sealed class GitHubClient : IGitHubClient
{
    private readonly HttpClient _http;

    public GitHubClient(HttpClient http, IOptions<GitHubOptions> options)
    {
        _http = http;
        var token = options.Value.Token;
        if (token.Length > 0) _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    }

    public async Task<RepoStats> GetStatsAsync(string fullName, CancellationToken ct)
    {
        var repo = await _http.GetFromJsonAsync<RepoDto>($"repos/{fullName}", ct)
            ?? throw new InvalidOperationException($"Empty answer for {fullName}.");

        // Bytes of code per language. We keep the names, biggest first.
        var languages = await _http.GetFromJsonAsync<Dictionary<string, long>>($"repos/{fullName}/languages", ct) ?? [];

        return new RepoStats(
            repo.Name,
            repo.PushedAt?.UtcDateTime,
            languages.OrderByDescending(l => l.Value).Select(l => l.Key).Take(5).ToList(),
            repo.Stars);
    }

    private sealed record RepoDto(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("pushed_at")] DateTimeOffset? PushedAt,
        [property: JsonPropertyName("stargazers_count")] int Stars);
}
