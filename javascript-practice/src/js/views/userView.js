export default class UserView {
  constructor() {
    this.emailData = document.getElementById('email');
    this.passwordData = document.getElementById('password');
    this.loginFormData = document.getElementById('login-form');
  }

  bindFormLogin = (handler) => {
    this.loginFormData.addEventListener("submit", e => {
      e.preventDefault();
      const valueEmail = this.emailData.value;
      const valuePassword = this.passwordData.value;
      handler(valueEmail, valuePassword); 
    });
  }
  
  redirectPage = (page) => {
    window.location.replace(page);
  };
}
