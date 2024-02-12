const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const dueDate = new Date(body.dueDate);

  const formattedDueDate = dueDate.toLocaleDateString();
  const formattedReminder = new Date(body.reminderUnixTime * 1000).toLocaleDateString();

  const message = `
        <h3>Hello ${body.assigned}</h3>
        <p>A new task has been assigned to you by: ${body.assignedBy}. Here are the details:</p>
        <hr />
        <br />
        
        <strong>Title:</strong> ${body.title}
        <br />
        <strong>Due:</strong> ${formattedDueDate}
        <br />
        <p>An email will be sent on as a reminder: ${formattedReminder}</p>
        
        <h5>Here are the complementary links:</h5>
        <strong>Link:</strong> ${body.link}<br>

        <hr />
        <h6>Beyond this part is either an automatically generated or manually inputted instructions, please read:</h6>
        <p>${body.emailBody}</p>
    `;

  const scheduledMessage = `
        <h3>Hello ${body.assigned}</h3>
        <p>This is a reminder about the task assigned by: ${body.assignedBy}.</p>
        <hr />
        <br />
    
        <p>The task was previously sent with a subject ${body.subject}. The details are:</p>
        <strong>Title:</strong> ${body.title}
        <br />
        <strong>Due:</strong> ${formattedDueDate}
        <br />
    
        <h5>Here are the complementary links:</h5>
        <strong>Link:</strong> ${body.link}<br>

        <hr />
        <h6>Beyond this part is either an automatically generated email body:</h6>
        <p>This is a scheduled email, if you've already sent the task, ignore this message</p>
    `;

  const data = {
    to: body.assigned,
    from: "mallariandrei2@gmail.com",
    subject: body.subject,
    text: message,
    html: message,
  };

  const scheduledData = {
    to: body.assigned,
    from: "mallariandrei2@gmail.com",
    subject: `Reminder about: ${body.subject}`,
    text: scheduledMessage,
    html: scheduledMessage,
    send_at: body.reminderUnixTime,
  };
  

  try {
    await mail.send(data);
    await mail.send(scheduledData);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }

  return new Response("OK");
}
