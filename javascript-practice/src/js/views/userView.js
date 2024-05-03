export default class UserView {
  constructor() {
    this.loginFormEl = document.getElementById('login-form');
  }

  bindFormLogin = (submitLogin) => {
    this.loginFormEl.addEventListener("submit", e => {
      e.preventDefault();
      const valueEmail = document.getElementById('email').value;
      const valuePassword = document.getElementById('password').value;
      submitLogin(valueEmail, valuePassword); 
    });
  }
  
  redirectPage = (page) => {
    window.location.replace(page);
  };
}
