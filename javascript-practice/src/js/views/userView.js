import { validateEmail, validatePassword } from '../helpers/validation'
import { ERROR_MESSAGE } from '../constants/message'

export const {
  REQUIRED_FIELD_EMAIL,
  REQUIRED_FIELD_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} = ERROR_MESSAGE

export default class UserView {
  constructor() {
    this.loginFormEl = document.getElementById('login-form')
  }

  bindFormLogin = (submitLogin) => {
    this.loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault()
      const valueEmail = document.getElementById('email').value
      const valuePassword = document.getElementById('password').value
      const emailErrorEl = document.getElementById('email-error')
      const passwordErrorEl = document.getElementById('password-error')

      emailErrorEl.textContent = ''
      passwordErrorEl.textContent = ''

      if (!valueEmail || !valuePassword) {
        if (!valueEmail) {
          emailErrorEl.textContent = `${REQUIRED_FIELD_EMAIL}`
        }
        if (!valuePassword) {
          passwordErrorEl.textContent = `${REQUIRED_FIELD_PASSWORD}`
        }

        return
      }

      if (!validatePassword(valuePassword)) {
        passwordErrorEl.textContent = `${INVALID_PASSWORD}`

        return
      }
      submitLogin(valueEmail, valuePassword)
    })

    document.getElementById('email').addEventListener('input', () => {
      document.getElementById('email-error').textContent = ''
    })

    document.getElementById('password').addEventListener('input', () => {
      document.getElementById('password-error').textContent = ''
    })
  }

  redirectPage = (page) => {
    window.location.replace(page)
  }
}
