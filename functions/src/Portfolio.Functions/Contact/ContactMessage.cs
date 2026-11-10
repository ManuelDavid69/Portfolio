namespace Portfolio.Functions.Contact;

/// <summary>A row of the contact_messages table, written by the NestJS API.</summary>
public sealed record ContactMessage(Guid Id, string Name, string Email, string Message, string Lang, DateTime CreatedAt, DateTime? SentAt);

/// <summary>What the API puts in the queue: only the id, never the content of the message.</summary>
public sealed record QueuedMessage(Guid Id);
