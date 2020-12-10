exports.renderAbout = (req, res) => {
  res.sendFile(process.cwd() + "/views/about.html");
}
