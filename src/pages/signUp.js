import bgPNG from "../assests/bg.png";
const Parse = require("parse");
var usernameGenerator = require("random-username-generator");

export default class SignUpForm {
  constructor() {
    this.html = `

    <h1>Sign Up</h1>
    <div class="form-wrapper">
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
          <div id="password-validation"></div>

        </div>

        <div class="form-group"><button>Sign Up</button></div>
      </form>
    </div>`;

    this.css = `
    body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      // gap: 16px;
      background-image: url("${bgPNG}");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      color: white;
  }
  
  
  h1 {
      font-size: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      // margin-top: 30px;
      flex: 1;
  }
  
  .form-wrapper {
      flex: 10;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  
  form {
      border: 1px solid white;
      border-radius: 18px;
      height: 1000px;
      width: 800px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 32px;
      // align-items: center;
      // justify-content: center;
  }
  
  
  label {
      font-size: 64px;
      text-align: center;
  }
  
  .form-group {
      padding: 16px;
      flex: 1;
      display: flex;
      gap: 32px;
      // align-items: center;
      justify-content: center;
      flex-direction: column;
      // border: 1px solid grey;
      border-radius: 24px;
  
  }
  
  input {
      flex: 1;
      max-height: 40px;
      padding: 64px;
      border-radius: 24px;
      font-size: 64px;
  }
  
  
  
  button {
      height: 200px;
      width: 400px;
      font-size: 64px;
      padding: 64px;
      align-self: center;
      border-radius: 24px;
  }
  
  button:active {
    box-shadow: 1px 1px 10px 10px blue;
  }

  #password-validation {
      // position: absolute;
      // width: 1x;
      // height: 100px;
      // flex: 1;
      // flex-shrink: 0;
      // width: 100px;
      // height: 50px;
      // background-color: white;
      color: red;
      text-align: center;
      font-size: 42px;
      // display: none;
      height: 100px;
      width: 100%;
      padding: 16px;
  
  }

  @keyframes vibrate-1 {
    0% {
      -webkit-transform: translate(0);
              transform: translate(0);
    }
    20% {
      -webkit-transform: translate(-2px, 2px);
              transform: translate(-2px, 2px);
              
    }
    40% {
      -webkit-transform: translate(-2px, -2px);
              transform: translate(-2px, -2px);
    }
    60% {
      -webkit-transform: translate(2px, 2px);
              transform: translate(2px, 2px);
    }
    80% {
      -webkit-transform: translate(2px, -2px);
              transform: translate(2px, -2px);
    }
    100% {
      -webkit-transform: translate(0);
              transform: translate(0);
    }
  }
  .vibrate-1
  {-webkit-animation:vibrate-1 .3s linear infinite both;animation:vibrate-1 .3s linear infinite both}
  `;
  }

  getHTML() {
    return this.html;
  }

  async init() {
    document.body.innerHTML = `<style>${this.css}</style>` + this.getHTML();
    document.body
      .querySelector("form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!this.isPasswordValid()) {
          return;
        }
        let user = new Parse.User();
        user.set(
          "username",
          document.querySelector("#username").value.toLowerCase()
        );
        user.set("password", document.querySelector("#password").value);
        try {
          user = await user.save();
          localStorage.setItem("logged-in-user", user.id);
          Parse.User.logIn(
            document.querySelector("#username").value.toLowerCase(),
            document.querySelector("#password").value.toLowerCase()
          );
          PubSub.publish("new-user-created", user.get("username"));
        } catch (error) {
          document.body.querySelector("#password-validation").textContent =
            error.message;
        }
      });

    document.body
      .querySelector("#password")
      .addEventListener("focusout", () => {
        this.isPasswordValid();
      });

    usernameGenerator.setSeperator("_");
    var username = usernameGenerator.generate();
    document.querySelector("button").classList.add("vibrate-1");
    document.querySelector("#username").value = username;
  }

  isPasswordValid() {
    let password = document.querySelector("#password").value;
    if (password.length < 6) {
      document.querySelector("#password-validation").textContent =
        "Password must be more than 6 characters long";
      return false;
    }
    return true;
  }
}
