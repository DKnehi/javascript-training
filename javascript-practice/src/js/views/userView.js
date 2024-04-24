export default class UserView {
  constructor() {
    this.emailData = document.getElementById('email')
    this.passwordData = document.getElementById('password')
    this.loginFormData = document.getElementById('form-login')
  }

  // Submit(event, handler) {
  //   this.loginFormData.addEventListener('submit', this.Login(handler));
  // }

  // Login(handler) {
  //   return function (event) {
  //     event.prevenDefault()
  //     const emailData = document.getElementById('email')
  //     const passwordData = document.getElementById('password')
  //     handler(emailData.value, passwordData.value)
  //     console.log(emailData)
  //     console.log(passwordData)
  //   }
  // }
}
