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
      handler(valueEmail, valuePassword); // Pass form data to handler
    });
  }
  
  // Emit custom event for successful login
  emitLoginSuccess = () => {
    const event = new Event('loginSuccess');
    document.dispatchEvent(event);
  }
}
