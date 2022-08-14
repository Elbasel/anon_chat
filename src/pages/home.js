import loadingGif from "../assests/loading.gif";
import bgPNG from "../assests/bg.png";
const PubSub = require("pubsub-js");
const Parse = require("parse");

export default class Home {
  constructor() {
    this.html = `
    <h1>Anonymous Chat!</h1>
    <div id="loading-div">
      <div class="loading">
        <h1>Logging in</h1>
        <img id="loading-img" />
      </div>
    </div>
    <div class="form-wrapper">
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
          <div id="login-error"></div>
        </div>
        <div class="form-group">
          <button>Login</button>
        </div>
      </form>

      <button id="sign-up-button">Or Sign Up</button>
    </div>`;

    this.css = `


    body {
      display: flex;
      flex-direction: column;
      background-image: url("${bgPNG}");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
  
  }
  
  h1 {
      flex: 1;
      font-size: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  
  .form-wrapper {
      flex: 10;
      // width: 100px;
      // height: 100px;
      // border: 1px solid white;
      // display: grid;
      // place-items: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
  }
  
  form {
      width: 90%;
      height: 80%;
      font-size: 64px;
      padding: 64px;
      border-radius: 18px;
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      gap: 150px;
  }
  
  .form-group {
      height: 30%;
      // border: 1px solid grey;
      // padding: 64px;
      display: flex;
      flex-direction: column;
      gap: 32px;
  
  }
  
  input {
      flex: 1;
      // padding: 32px;
      border-radius: 18px;
      font-size: 64px;
      display: block;
      padding: 16px;
  }
  
  button {
      flex: 1;
      padding: 32px;
      font-size: 64px;
      border-radius: 18px;
      max-height: 300px;
      background-color: rgb(33, 33, 139);
      color: white;
      border: 0;
  
      // transition: all 10ms;
  }
  
  button:active {
      box-shadow: 1px 1px 10px 10px white;
  
      transform: scale(0.9);
  }
  
  #loading-div {
      position: absolute;
      width: 100vw;
      height: 100vh;
      background-color: black;
  
      display: flex;
      justify-content: center;
      align-items: center;
      display: none;
  
  }
  
  .loading {
      // border: 1px solid white;
      padding: 64px;
      display: flex;
      flex-direction: column;
      gap: 32px;
  }
  
  
  #login-error {
      color: red;
      // background-color: white;
      // padding: 16px;
      min-height: 72px;
  
  }
  
  #sign-up-button {
      // padding: 32px;
      max-height: 180px;
      flex: 1;
      width: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: yellow;
      font-style: italic;
      font-size: 64px;
  }`;
  }

  async init() {
    document.body.innerHTML = `<style>${this.css}</style>` + this.html;

    document.querySelector("#sign-up-button").addEventListener("click", () => {
      console.log("sign-up-page-button-pressed");
      PubSub.publish("sign-up-page-requested");
    });
    document.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.querySelector("#username").value.toLowerCase();
      const password = document.querySelector("#password").value;
      document.querySelector("#loading-div").style.display = "flex";

      try {
        const user = await Parse.User.logIn(username, password);
        localStorage.setItem("logged-in-user", user.id);
        PubSub.publish("user-logged-in", user);
      } catch (error) {
        document.querySelector("#loading-div").style.display = "none";
        document.querySelector("#login-error").textContent = error.message;
      }
    });

    document.querySelector("#loading-img").src = loadingGif;
  }
}
