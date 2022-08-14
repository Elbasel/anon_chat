const Parse = require("parse");
import "./styles/main.scss";
// import "./styles/chat.scss";

// Pages
import SignUpForm from "./pages/signUp";
import Home from "./pages/home";
import Chat from "./pages/chat";
import PubSub from "pubsub-js";

function initParse() {
  Parse.initialize(
    "z6wry3r4l7uk3P0tWQsOtMz3FB4ifkOqHvkHEbWv",
    "Pr22k3Z6IN5RGOwdr7adFcF0e1kQsamhe6bi2F4e"
  );
  Parse.serverURL = "https://parseapi.back4app.com/";
}

function initSite() {
  initParse();
  const signUpForm = new SignUpForm();
  const home = new Home();
  const chat = new Chat();

  let loggedInUser = "";
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).endsWith("currentUser")) {
      let value = localStorage.getItem(localStorage.key(i));
      loggedInUser = JSON.parse(value);
    }
  }
  // debugger;
  if (loggedInUser) {
    if (loggedInUser.objectId == localStorage.getItem("logged-in-user")) {
      chat.init(loggedInUser.username);
    } else home.init();
  } else home.init();

  PubSub.subscribe("user-logged-in", (msg, user) => {
    const username = user.get("username");
    document.body.innerHTML = "";
    chat.init(username);
  });

  PubSub.subscribe("sign-up-page-requested", () => {
    document.body.innerHTML = "";
    signUpForm.init();
  });

  PubSub.subscribe("new-user-created", (msg, username) => {
    document.body.innerHTML = "";
    chat.init(username);
  });

  PubSub.subscribe("logout-requested", () => {
    document.body.innerHTML = "";
    localStorage.clear(home.init());
  });

  PubSub.subscribe("msgSent", async (pubsubMsg, user) => {
    const username = user.get("username");
    let body = document.querySelector("#text").value;
    console.log(body);
    if (!body) body = "#";
    const msgClass = Parse.Object.extend("Message");
    // debugger;
    const msg = new msgClass();
    const savedMsg = await msg.save({ body: body, username: username });
    console.log({ savedMsg });
    PubSub.publish("msgSaved", savedMsg);
    document.querySelector("#text").value = "";
  });
}
// initParse();
initSite();
// const chat = new Chat();
// chat.init();
