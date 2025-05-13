function sendMail(event) {
  event.preventDefault();
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_xdq3jfs";
  const templateID = "template_73tmhhm";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message was sent successfully!");
    })
    .catch((err) => {
      console.error("Failed to send email:", err);
      alert("There was an error sending your message.");
    });
}
