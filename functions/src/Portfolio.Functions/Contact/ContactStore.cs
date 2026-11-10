using Npgsql;

namespace Portfolio.Functions.Contact;

public interface IContactStore
{
    Task<ContactMessage?> FindAsync(Guid id, CancellationToken ct);
    Task MarkSentAsync(Guid id, CancellationToken ct);
}

public sealed class ContactStore(NpgsqlDataSource db) : IContactStore
{
    public async Task<ContactMessage?> FindAsync(Guid id, CancellationToken ct)
    {
        await using var cmd = db.CreateCommand(
            "SELECT id, name, email, message, lang, created_at, sent_at FROM contact_messages WHERE id = $1");
        cmd.Parameters.AddWithValue(id);

        await using var reader = await cmd.ExecuteReaderAsync(ct);
        if (!await reader.ReadAsync(ct)) return null;

        return new ContactMessage(
            reader.GetGuid(0),
            reader.GetString(1),
            reader.GetString(2),
            reader.GetString(3),
            reader.GetString(4),
            reader.GetDateTime(5),
            reader.IsDBNull(6) ? null : reader.GetDateTime(6));
    }

    public async Task MarkSentAsync(Guid id, CancellationToken ct)
    {
        await using var cmd = db.CreateCommand("UPDATE contact_messages SET sent_at = now() WHERE id = $1");
        cmd.Parameters.AddWithValue(id);
        await cmd.ExecuteNonQueryAsync(ct);
    }
}
