exports.renderContact = (req, res) => {
  res.sendFile(process.cwd() + "/views/contact.html");
}