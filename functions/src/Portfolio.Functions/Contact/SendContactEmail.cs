using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Portfolio.Functions.Contact;

/// <summary>
/// Runs each time the API puts a message id in the "contact-messages" queue.
/// If sending fails, the function throws and Azure retries the message up to 5 times (see host.json).
/// </summary>
public sealed class SendContactEmail(IContactStore store, IMailSender mail, ILogger<SendContactEmail> logger)
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    [Function(nameof(SendContactEmail))]
    public async Task Run([QueueTrigger("contact-messages", Connection = "StorageConnection")] string body, CancellationToken ct)
    {
        var queued = JsonSerializer.Deserialize<QueuedMessage>(body, Json)
            ?? throw new InvalidOperationException("Empty queue message.");

        var message = await store.FindAsync(queued.Id, ct);
        if (message is null)
        {
            logger.LogWarning("Message {Id} not found, nothing to send.", queued.Id);
            return;
        }

        // A message can be read twice from a queue. We never send the same e-mail twice.
        if (message.SentAt is not null)
        {
            logger.LogInformation("Message {Id} was already sent.", queued.Id);
            return;
        }

        await mail.SendAsync(message, ct);
        await store.MarkSentAsync(message.Id, ct);
        logger.LogInformation("Message {Id} sent.", queued.Id);
    }
}
