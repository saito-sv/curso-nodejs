exports.renderBlog = (req, res) => {
  res.sendFile(process.cwd() + "/views/blog.html");
}
