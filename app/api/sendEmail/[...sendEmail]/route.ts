const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: Request) {
    const body = await req.json();
    
    const message = `
        Title: ${body.title}\r\n
        Due: ${body.dueDate}\r\n
        Assigned: ${body.assigned}\r\n
        Link: ${body.link}\r\n
        Subject: ${body.subject}\r\n
        EmailBody: ${body.emailBody}
    `
    
    const data = {
        to: "mallariandrei.main@gmail.com",
        from: "mallariandrei2@gmail.com",
        subject: "Subject",
        text: message,
        html: message.replace(/\r\n/g, '<br>')
    }

    mail.send(data);

    return new Response('OK');
}