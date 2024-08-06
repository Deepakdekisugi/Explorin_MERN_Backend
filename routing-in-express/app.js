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
const { logger } = require("./middleware/logger");

const PORT = 8080;
const app = express();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(logger);

// Initialize Passport
require('./config/passport')(passport);
app.use(session({
  secret: process.env["SESSION_KEY"],
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  res.locals.author = req.author || null;
  next(); // Ensure to call next() to pass control to the next middleware
});

app.use("/health", healthRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
});
