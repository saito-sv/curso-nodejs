exports.renderAuth = (req, res) => {
  res.sendFile(process.cwd() + "/views/auth.html");
}
