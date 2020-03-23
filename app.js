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

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showAlert(input, 'Email is not valid');
  }
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

function checkPasswordsMatch(password, password2) {
  if(password.value === password2.value) {
    showSuccess(password)
    showSuccess(password2)
  } else {
    showAlert(password2, 'Passwords must match')
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
  checkEmail(email)
  checkPasswordsMatch(password, password2)
});
