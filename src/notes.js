// const signUp = new SignUpForm();
// signUp.init();

// document.body.innerHTML = signUp.getHTML();
// Parse.User.logIn("elbasel", "hello").then((u) => {
//   console.log(u);
// });
var client = new Parse.LiveQueryClient({
  applicationId: "z6wry3r4l7uk3P0tWQsOtMz3FB4ifkOqHvkHEbWv",
  serverURL: "wss://" + "elbaselmessage.b4a.io", // Example: 'wss://livequerytutorial.back4app.io'
  javascriptKey: "Pr22k3Z6IN5RGOwdr7adFcF0e1kQsamhe6bi2F4e",
});
client.open();

const Message = Parse.Object.extend("Message");
var query = new Parse.Query("Message");
let subscription = client.subscribe(query);

subscription.on("create", (msg) => {
  console.log(msg);
  console.log("On create event");
});
