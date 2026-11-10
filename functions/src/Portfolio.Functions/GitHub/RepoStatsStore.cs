using Npgsql;

namespace Portfolio.Functions.GitHub;

public interface IRepoStatsStore
{
    Task SaveAsync(RepoStats stats, CancellationToken ct);
}

public sealed class RepoStatsStore(NpgsqlDataSource db) : IRepoStatsStore
{
    /// <summary>Insert the repository the first time, update it the following nights.</summary>
    public async Task SaveAsync(RepoStats stats, CancellationToken ct)
    {
        await using var cmd = db.CreateCommand("""
            INSERT INTO repo_stats (repo, last_commit_at, languages, stars, updated_at)
            VALUES ($1, $2, $3, $4, now())
            ON CONFLICT (repo) DO UPDATE
            SET last_commit_at = EXCLUDED.last_commit_at,
                languages = EXCLUDED.languages,
                stars = EXCLUDED.stars,
                updated_at = now()
            """);
        cmd.Parameters.AddWithValue(stats.Repo);
        cmd.Parameters.AddWithValue((object?)stats.LastCommitAt ?? DBNull.Value);
        cmd.Parameters.AddWithValue(stats.Languages.ToArray());
        cmd.Parameters.AddWithValue(stats.Stars);
        await cmd.ExecuteNonQueryAsync(ct);
    }
}
