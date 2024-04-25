export default class UserView {
  constructor() {
    this.emailData = document.getElementById('email')
    this.passwordData = document.getElementById('password')
    this.loginFormData = document.getElementById('#login-form');
  }

  bindFormLogin = (handler) => {
    this.loginFormData.addEventListener("click", e => {
      e.preventDefault();
      const valueEmail = this.emailData;
      const valuePassword = this.passwordData;
      console.log(valueEmail );
      console.log(valuePassword);
      handler(valueEmail, valuePassword);
    });
  }

}
