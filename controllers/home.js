export const renderHome = (req, res) => {
  console.log(req.session);
  res.render("index.ejs", { path: "Home" });
}

export default { renderHome }