const express = require("express"),
  path = require("path"),
  passport = require("passport"),
  flash = require("connect-flash"),
  session = require("express-session"),
  mysqlStore = require("express-mysql-session");

const app = express();

let { database } = require("./keys.js");
require("./lib/passport");

//ajustes
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view emgine", "ejs");

//para el bodyparser
app.use(express.urlencoded({ extended: true }));

//sesiones
app.use(
  session({
    secret: "CMSMamalon",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  app.locals.helpers = require("./lib/handlebars.js");
  next();
});

//rutas
app.use(require("./routes/index.js"));

//archivos "estaticos"
app.use(express.static(path.join(__dirname, "public")));

//Cuando algo falle
app.get("*", function (req, res) {
  res.render("404.html", { titulo: "Página No Encontrada" });
});

//server
app.listen(app.get("port"), () => {
  console.log("Ya jalo we ");
});
