using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Portfolio.Functions.GitHub;

/// <summary>Every night at 3 am (UTC), refreshes the GitHub data shown on the project pages.</summary>
public sealed class SyncGitHubStats(
    IGitHubClient github,
    IRepoStatsStore store,
    IOptions<GitHubOptions> options,
    ILogger<SyncGitHubStats> logger)
{
    [Function(nameof(SyncGitHubStats))]
    public async Task Run([TimerTrigger("0 0 3 * * *")] TimerInfo timer, CancellationToken ct)
    {
        var updated = await SyncAllAsync(ct);
        logger.LogInformation("{Count} repositories updated.", updated);
    }

    /// <summary>One repository that fails does not stop the others.</summary>
    internal async Task<int> SyncAllAsync(CancellationToken ct)
    {
        var updated = 0;
        foreach (var repo in options.Value.RepoList)
        {
            try
            {
                var stats = await github.GetStatsAsync(repo, ct);
                await store.SaveAsync(stats, ct);
                updated++;
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogError(ex, "Could not update {Repo}.", repo);
            }
        }
        return updated;
    }
}
