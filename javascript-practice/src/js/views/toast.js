const showToast = (message, type = 'success') => {
  const toastElement = document.getElementById('toast-message')

  if (!toastElement) return
  toastElement.textContent = message
  const toastClass = type === 'error' ? 'toast-success' : 'toast-error'

  toastElement.className = `toast-message ${toastClass} show`
  setTimeout(() => {
    toastElement.classList.remove('show')
  }, 3000)
}

export default showToast
