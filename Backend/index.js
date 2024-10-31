const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addAppointment, getAppointments } = require("./appointment.controller");
const { addUser, loginUser } = require("./user.controller");
const { default: mongoose } = require("mongoose");
const auth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Submission form",
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addAppointment(req.body);
    res.render("index", {
      title: "Submission form",
      error: err.message,
    });
  } catch (err) {
    res.render("index", {
      title: "Submission form",
      error: err.message,
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Login",
    error: false,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/appointments");
  } catch (err) {
    res.render("login", {
      title: "Login",
      error: err.message,
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Submission form",
    error: undefined,
  });
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      res.render("register", {
        title: "Submission form",
        error: "Email is already registered",
      });
      return;
    }
    res.render("register", {
      title: "Submission form",
      error: err.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
});

app.use(auth);

app.get("/appointments", async (req, res) => {
  res.render("appointments", {
    title: "Appointments",
    appointments: await getAppointments(),
    error: false,
  });
});

mongoose
  .connect(
    "mongodb+srv://grafn7:3ZcWSycvQVYJwREy@cluster0.qrnpn.mongodb.net/Appointments?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.bgGreen(`Server has been started on port ${port}`));
    });
  });
