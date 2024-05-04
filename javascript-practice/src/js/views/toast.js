import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const showSuccess = ({ text, duration }) =>
  notify({ text, state: 'success', duration });
const showError = ({ text, duration }) =>
  notify({ text, state: 'error', duration });

const notify = ({ text, state, duration = 2000 }) => {
  Toastify({
    text,
    duration,
    gravity: 'top',
    position: 'center',
    className: state,
  }).showToast();
};

export { showSuccess, showError };