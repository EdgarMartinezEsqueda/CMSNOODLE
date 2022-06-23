//Métodos para validar si está logeado o no... sirve para redirigir en páginas que no queremos que se viisten
module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    return res.redirect("/user");
  }
};
