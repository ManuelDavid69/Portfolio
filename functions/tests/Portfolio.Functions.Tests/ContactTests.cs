using Microsoft.Extensions.Logging.Abstractions;
using Portfolio.Functions.Contact;

namespace Portfolio.Functions.Tests;

public class ContactTests
{
    private static ContactMessage Message(DateTime? sentAt = null) =>
        new(Guid.NewGuid(), "Ada", "ada@example.com", "Hello", "en", new DateTime(2026, 11, 10, 9, 0, 0, DateTimeKind.Utc), sentAt);

    private sealed class FakeStore(ContactMessage? message) : IContactStore
    {
        public List<Guid> MarkedSent { get; } = [];

        public Task<ContactMessage?> FindAsync(Guid id, CancellationToken ct) =>
            Task.FromResult(message?.Id == id ? message : null);

        public Task MarkSentAsync(Guid id, CancellationToken ct)
        {
            MarkedSent.Add(id);
            return Task.CompletedTask;
        }
    }

    private sealed class FakeMail : IMailSender
    {
        public List<ContactMessage> Sent { get; } = [];

        public Task SendAsync(ContactMessage message, CancellationToken ct)
        {
            Sent.Add(message);
            return Task.CompletedTask;
        }
    }

    private static string Body(Guid id) => $$"""{"id":"{{id}}"}""";

    [Fact]
    public async Task Sends_the_mail_then_marks_the_message_as_sent()
    {
        var message = Message();
        var store = new FakeStore(message);
        var mail = new FakeMail();

        await new SendContactEmail(store, mail, NullLogger<SendContactEmail>.Instance).Run(Body(message.Id), default);

        Assert.Single(mail.Sent);
        Assert.Equal([message.Id], store.MarkedSent);
    }

    [Fact]
    public async Task Does_not_send_a_message_twice()
    {
        var message = Message(sentAt: DateTime.UtcNow);
        var store = new FakeStore(message);
        var mail = new FakeMail();

        await new SendContactEmail(store, mail, NullLogger<SendContactEmail>.Instance).Run(Body(message.Id), default);

        Assert.Empty(mail.Sent);
        Assert.Empty(store.MarkedSent);
    }

    [Fact]
    public async Task Ignores_an_unknown_id()
    {
        var store = new FakeStore(null);
        var mail = new FakeMail();

        await new SendContactEmail(store, mail, NullLogger<SendContactEmail>.Instance).Run(Body(Guid.NewGuid()), default);

        Assert.Empty(mail.Sent);
    }

    [Fact]
    public void The_reply_goes_to_the_visitor()
    {
        var smtp = new SmtpOptions { From = "portfolio@davidmanuel.fr", To = "me@example.com" };

        var mail = SmtpMailSender.BuildMail(Message(), smtp);

        Assert.Equal("ada@example.com", mail.ReplyTo.Mailboxes.Single().Address);
        Assert.Equal("me@example.com", mail.To.Mailboxes.Single().Address);
        Assert.Contains("Hello", mail.TextBody);
    }
}
