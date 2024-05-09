import App from "./app";

// Sure that scripts called after DOM loaded
document.addEventListener("DOMContentLoaded", async () => {
  const myApp = new App();
  myApp.start();
});
