const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  const message = `
  <h3>A file was shared to you by ${body.assignedBy}</h3>

  <h4>Check this document out:</h4>
  <strong>Link:</strong> ${body.link}<br/>
  `

  const data = {
    to: body.email,
    from: "mallariandrei2@gmail.com",
    subject: `${body.assignedBy} shared a document with you`,
    text: message,
    html: message,
  };

  try {
    await mail.send(data);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }

  return new Response("OK");
}
