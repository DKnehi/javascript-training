export default class UserView {
  constructor() {
    this.emailEl = document.getElementById('email');
    this.passwordEl = document.getElementById('password');
    this.loginFormEl = document.getElementById('login-form');
  }

  bindFormLogin = (handler) => {
    this.loginFormEl.addEventListener("submit", e => {
      e.preventDefault();
      const valueEmail = this.emailEl.value;
      const valuePassword = this.passwordEl.value;
      handler(valueEmail, valuePassword); 
    });
  }
  
  redirectPage = (page) => {
    window.location.replace(page);
  };
}
