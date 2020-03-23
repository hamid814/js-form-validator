const form = document.querySelector('#form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function showAlert(input, message) {
  const formControl = input.parentElement;
  const alert = formControl.querySelector('.alert')
  
  alert.innerText = message

  formControl.classList.remove('valid')
  formControl.classList.add('invalid')
}

function showSuccess(input) {
  const formControl = input.parentElement

  formControl.classList.remove('invalid')
  formControl.classList.add('valid')
}

function checkRequired(...inputs) {
  inputs.forEach(input => {
    if(input.value.trim() === '') {
      showAlert(input, `${getInputName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

function checkLength(input, min, max) {
  if(input.value.length < min) {
    showAlert(input, `${getInputName(input)} must be at least ${min} long`)
  } else if(input.value.length > max) {
    showAlert(input, `${getInputName(input)} must Not be longer than ${max}`)
  } else {
    showSuccess(input)
  }
}

const getInputName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1).toLowerCase()
}

// event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired(name, email, password, password2)
  checkLength(name, 3, 14)
  checkLength(password, 6, 20)
});
