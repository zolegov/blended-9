// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите

import { STORAGE_KEY, USER_DATA } from './data';
import { refs } from './refs';

// у локальне сховище і змінюй кнопку login на logout і роби поля введення

// Недоступними зміни.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку

// та недоступні для зміни поля з даними користувача.

// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача

// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і

// повідомляти про помилку.

const { email, password, button } = refs.loginForm.elements;

refs.loginForm.addEventListener('submit', onLoginFormSubmit);
console.log('refs.loginForm: ', refs.loginForm);

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedData) {
  email.value = savedData.email;
  password.value = savedData.password;
  button.textContent = 'logout';
  email.disabled = true;
  password.disabled = true;
}

function onLoginFormSubmit(event) {
  event.preventDefault();
  const isUserDataValid =
    email.value.trim() !== USER_DATA.email ||
    password.value.trim() !== USER_DATA.password;

  if (isUserDataValid) {
    alert('Невірно введені логін або пароль');
    return;
  }

  if (button.textContent === 'logout') {
    button.textContent = 'login';
    email.disabled = false;
    password.disabled = false;
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(USER_DATA));

  button.textContent = 'logout';
  email.disabled = true;
  password.disabled = true;
}
