import UploadImgPng from "../assests/img.png";
import sendImgPng from "../assests/send.png";
import PubSub from "pubsub-js";
import moment from "moment";
// import Avatar from "boring-avatars";
const Parse = require("parse");

export default class Chat {
  constructor() {
    this.html = `
    <div class="header-area">
    <h1>Your Name: </h1>
    <button id="logout-button">Logout</button>
  </div>
  <div id="chat-area">

  </div>
  <input type="file" name="file-upload" id="file-upload">

  <form>
    <button type="button" id="upload-img-button" class="msg-button"><img id="upload-img" /></button>
    <input id="text" type="text" />
    <button type="button" id="send-button" class="msg-button"><img id="send" /></button>
    </form>
  `;

    this.css = `

    form {
      display: flex;
      // justify-content: space-between;
      flex: 1;
      gap: 32px;
  
      align-items: center;
      // border: 1px solid red;


    }
    body {
      display: flex;
      flex-direction: column;
      padding: 32px;
      background-color: black;
  }
  
  #file-upload {
    position: absolute;
    appearance: none;
    display: none;

}


  .header-area {
      flex: 1;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid white;
      align-items: center;
      padding: 32px;
      max-height: 100px;
  }
  
  h1 {
      font-size: 52px;
  }
  
  #chat-area {
    margin-top: 100px;
    margin-bottom: 100px;
    // border: 1px solid red;
    flex: 12;
    scroll-behavior: smooth;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px;
    overflow-y: scroll;
    overflow-x: hidden;

}
html {
  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-track-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #646464;
  scrollbar-dark-shadow-color: #646464;
}

::-webkit-scrollbar { width: 8px; height: 3px;}
::-webkit-scrollbar-button {  background-color: #666; }
::-webkit-scrollbar-track {  background-color: #646464;}
::-webkit-scrollbar-track-piece { background-color: #000;}
::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
::-webkit-scrollbar-corner { background-color: #646464;}}
::-webkit-resizer { background-color: #666;}
  
  .msg {
      // border: 1px solid white;
      font-size: 48px;
      display: flex;
      justify-content: flex-end;
      // max-width: 50%;

  }
  
  
  .other {
      justify-content: flex-start;
  }
  
  .msg-wrapper {
      background-color: red;
      border-radius: 32px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 70%;
  
  }
  
  .other > .msg-wrapper {
      background-color: blue;
  }

  .other > .img-msg-wrapper {
    background-color: rgba(0, 0, 255, 0.075);
  }
  
  
  .user {
      font-size: 32px;
      colo// query.equalTo('objectId', 'xKue915KBG');
      chatr: rgba(0, 0, 0, 0.788);
      font-style: italic;
  }
  
  .msg-area {
      flex: 1;
      display: flex;
      // border-top: 1px solid white;
      // padding: 32px;
  
      gap: 32px;
  
      align-items: center;
      // max-height: 100px;
      // border: 1px solid red;
  
  
  }


  .img-text-wrapper {
    display: flex;
    align-items: center;
    gap: 32px
  }


  html {
    scrollbar-face-color: #646464;
    scrollbar-base-color: #646464;
    scrollbar-3dlight-color: #646464;
    scrollbar-highlight-color: #646464;
    scrollbar-track-color: #000;
    scrollbar-arrow-color: #000;
    scrollbar-shadow-color: #646464;
    scrollbar-dark-shadow-color: #646464;
  }
  
  ::-webkit-scrollbar { width: 8px; height: 3px;}
  ::-webkit-scrollbar-button {  background-color: #666; }
  ::-webkit-scrollbar-track {  background-color: #646464;}
  ::-webkit-scrollbar-track-piece { background-color: #000;}
  ::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
  ::-webkit-scrollbar-corner { background-color: #646464;}}
  ::-webkit-resizer { background-color: #666;}
  .msg-button {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0);
      border: 0;
      color: white;
  }
  
  button > img {
      fill: white;
      color: white;
      flex: 1;
      // width: 30%;
      // height: 100%;
      max-width: 300px;
      max-height: 300px;
  }
  
  
  input {
      height:100px;
      border-radius: 18px;
      flex: 5;
      padding: 32px;
      font-size: 42px;
  }
  
  #logout-button {
      // position: absolute;
      // top: 50px;
      // right: 50px;
      // margin-left: 16px;
      // margin-top: 16px;
      padding: 32px;
      font-size: 32px;
      width: 200px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
  }
  
//   #clock {
//     color: white;
//     font-size: 64px;
//     // width: 300px;
//     // height: 300px;
//     // z-index: 3;
// }

.msg img {
  // flex: 1;
  // width: auto;
  // height: auto;
  border-radius: 18px;
  max-width: 100%;
}

.img-msg-wrapper {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid grey;
  color: white; 
  display: flex;
  // width: 100vw;
  background-color: rgba(255, 0, 0, 0.116);

  // width: fit-content;
}
`;
  }

  async init(username) {
    document.body.innerHTML = `<style>${this.css}</style>` + this.html;
    document.querySelector("#upload-img").src = UploadImgPng;
    document.querySelector("#send").src = sendImgPng;

    // Form submission
    document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      PubSub.publish("msgSent", Parse.User.current());
    });

    // Uploading images event listener
    document
      .querySelector("#upload-img-button")
      .addEventListener("click", (e) => {
        if (e.clientX === 0) return;
        document.querySelector("#file-upload").click();
      });

    // Send button event listener
    document.querySelector("#send-button").addEventListener("click", () => {
      PubSub.publish("msgSent", Parse.User.current());
    });

    // Change username
    document.querySelector("h1").innerText += ` ${username}`;

    // Reset height of body after keyboard is no longer taking screen space
    document.body.querySelector("#text").addEventListener("focusout", () => {
      document.body.style.minHeight = "calc(100vh - 130px)";
    });

    // Logout button event listener
    document.body
      .querySelector("#logout-button")
      .addEventListener("click", () => {
        console.log("logout-requested");
        PubSub.publish("logout-requested");
      });

    // Initiate uploadImages event listeners
    this.uploadFile();

    // Initial get messages call
    this.updateMessage();

    // test msg order
    this.testMsgOrder();

    // Setup new msg listener
    var client = new Parse.LiveQueryClient({
      applicationId: "z6wry3r4l7uk3P0tWQsOtMz3FB4ifkOqHvkHEbWv",
      serverURL: "wss://" + "elbaselmessage.b4a.io", // Example: 'wss://livequerytutorial.back4app.io'
      javascriptKey: "Pr22k3Z6IN5RGOwdr7adFcF0e1kQsamhe6bi2F4e",
    });
    client.open();

    var query = new Parse.Query("Message").ascending("createdAt");
    let subscription = client.subscribe(query);

    subscription.on("create", (msg) => {
      this.updateMessage();
    });
  }

  testMsgLimit({ times, duration = 300 }) {
    const textField = document.querySelector("#text");
    const sendKey = document.querySelector("#send-button");
    let counter = 0;
    const interval = setInterval(() => {
      textField.value = counter;
      sendKey.click();
      counter++;
      if (times) {
        if (counter >= times) clearInterval(interval);
      }
    }, duration);
  }

  async testMsgOrder() {
    const query = new Parse.Query("Message").descending("createdAt");
    let results = await query.find();
    results.reverse();
    for (const msg of results) {
      console.log({
        body: msg.get("body"),
        username: msg.get("username"),
        object: msg,
      });
    }
  }

  // Update message in the chat area
  async updateMessage() {
    const query = new Parse.Query("Message").descending("createdAt");
    let results = await query.find();

    results.reverse();
    try {
      document.body.querySelector("#chat-area").innerHTML = "";
      for (const message of results) {
        const body = message.get("body");
        const username = message.get("username");
        const createdAt = moment(message.createdAt).format("LT");
        const imgUrl = message.get("img");
        let msgClass = "";
        if (!(username == Parse.User.current().get("username"))) {
          msgClass = "other";
        }
        this.addMsg({ body, username, createdAt, msgClass, imgUrl });
      }

      document.querySelector("#chat-area").scrollTop =
        document.querySelector("#chat-area").scrollHeight;
    } catch (error) {
      console.error("Error while fetching messages", error);
    }
  }

  addMsg({ body, username, createdAt, msgClass, imgUrl }) {
    document.body
      .querySelector("#chat-area")
      .append(
        this.createElementFromHTML(
          this.getMsgHTML(body, username, createdAt, msgClass, imgUrl)
        )
      );
  }

  static async saveImgMessage(fileObject) {
    var messageClass = Parse.Object.extend("Message");
    var message = new messageClass();
    message.set("img", fileObject.url());
    message.set("username", Parse.User.current().get("username"));
    message.set("body", "#");

    message.save();
  }

  uploadFile() {
    document.body
      .querySelector("#file-upload")
      .addEventListener("change", function (e) {
        var fileUploadControl = document.querySelector("#file-upload");
        var file = fileUploadControl.files[0];
        let name = file.name; //This does *NOT* need to be a unique name
        name = name.trim().replace(" ", "");
        name = name.replace("(", "");
        name = name.replace(")", "");
        console.log(name);
        var parseFile = new Parse.File(name, file);

        parseFile.save().then(
          () => {
            Chat.saveImgMessage(parseFile);
          },
          function (error) {
            alert(error);
          }
        );
      });
  }

  createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  getMsgHTML(
    msgText,
    userName,
    sentAt,
    msgClass = "",
    imgUrl = null,
    profileImg = ""
  ) {
    const profilePictureURl = `https://source.boringavatars.com/beam/120/${userName}`;

    if (profileImg) {
      profilePictureURl = profileImg;
    }

    if (userName == Parse.User.current().get("username")) {
      userName = "You";
    }

    if (imgUrl) {
      return `
        <div class="msg ${msgClass}">
        <div class="msg-wrapper img-msg-wrapper">
          <img class="image-msg" src=${imgUrl}>
          <p class="user">${userName} at ${sentAt}</p>
        </div>
      </div>
        `;
    }

    return `
    <div class="msg ${msgClass}">

      <div class="msg-wrapper">

        <div class="img-text-wrapper">
          <img class="profile-img" src=${profilePictureURl}>
          <p class="p-msg">${msgText}</p>
        </div>

        <p class="user">${userName} at ${sentAt}</p>

      </div>

    </div>
  `;
  }
}
