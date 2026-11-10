using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Portfolio.Functions.Contact;

public sealed class SmtpOptions
{
    public string Host { get; set; } = "";
    public int Port { get; set; } = 587;
    public string User { get; set; } = "";
    public string Password { get; set; } = "";
    public string From { get; set; } = "";
    public string To { get; set; } = "";
}

public interface IMailSender
{
    Task SendAsync(ContactMessage message, CancellationToken ct);
}

/// <summary>Sends the message to my own mailbox. Reply-To is the visitor, so I can answer directly.</summary>
public sealed class SmtpMailSender(IOptions<SmtpOptions> options) : IMailSender
{
    private readonly SmtpOptions _smtp = options.Value;

    public async Task SendAsync(ContactMessage message, CancellationToken ct)
    {
        var mail = BuildMail(message, _smtp);

        using var client = new SmtpClient();
        var security = _smtp.Port == 465 ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTlsWhenAvailable;
        await client.ConnectAsync(_smtp.Host, _smtp.Port, security, ct);
        if (_smtp.User.Length > 0) await client.AuthenticateAsync(_smtp.User, _smtp.Password, ct);
        await client.SendAsync(mail, ct);
        await client.DisconnectAsync(true, ct);
    }

    internal static MimeMessage BuildMail(ContactMessage message, SmtpOptions smtp)
    {
        var mail = new MimeMessage();
        mail.From.Add(new MailboxAddress("Portfolio", smtp.From));
        mail.To.Add(MailboxAddress.Parse(smtp.To));
        mail.ReplyTo.Add(new MailboxAddress(message.Name, message.Email));
        mail.Subject = $"Portfolio : message de {message.Name}";
        mail.Body = new TextPart("plain")
        {
            Text = $"{message.Name} <{message.Email}> ({message.Lang}) a écrit le {message.CreatedAt:dd/MM/yyyy HH:mm} UTC :\n\n{message.Message}",
        };
        return mail;
    }
}
