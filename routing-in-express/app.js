const express = require("express");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");

const { blogRouter } = require("./routes/blog.route");
const { healthRouter } = require("./routes/health");
const { MONGO_URI } = require("./env");

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { authRouter } = require("./routes/auth.routes");

const PORT = 8080;
const app = express();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(logger);

//passport.js
require('./config/passport')(passport);
app.use(session({secret: process.env["SESSION_KEY"], resave: true, saveUninitialized: true}));

app.use(passport.in());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_massege = req.flash("success_massege");
  res.locals.error_massege = req.flash("error_massege");
  res.locals.error = freq.flash("error");
  res.locals.author = req.author || null;
})

app.use("/health", healthRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRouter)

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
  mongoose.connect(MONGO_URI);
});
