'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');
const h1 = document.querySelector('#userType');
const main = document.querySelector('main');
const logOut = document.querySelector('#log-out');
const loginForm = document.querySelector('#login-form');
const loginWrapper = document.querySelector('#login-wrapper');
const register = document.querySelector('.register');
const userForm = document.querySelector('#addUserForm');
const studentForm = document.querySelector('#addStudentForm');
const addUserButton = document.querySelector('#add-user');
const frontPage = document.querySelector('#front-page');
const topSection = document.querySelector('section');

let user = JSON.parse(sessionStorage.getItem('user'));

const startApp = (logged) => {
  console.log("logged :" + logged);
  loginWrapper.style.display = logged ? 'none' : 'block';
  main.style.display = logged ? 'block' : 'none';
  register.style.display = 'none';

  if (logged) {
    if(user.ROLE === 'admin'){
      addUserButton.style.display='inline-block';

      frontPage.addEventListener('click',() =>{
        topSection.style.display='block';
        register.style.display = 'none';
      });

      addUserButton.addEventListener('click', () => {
        topSection.style.display='none';
        register.style.display = 'flex';
      });

      h1.innerHTML = 'List of Users';
      getAllUsers();

    }else if(user.ROLE === 'parent'){
      h1.innerHTML = 'List of Teachers';
      getTeacherList();

    }else if(user.ROLE === 'teacher'){

    }
  };
};


// create cat cards
const createTeacherCards = (users) => {
  // clear ul
  ul.innerHTML = '';
  users.forEach((user) => {
    // create li with DOM methods
    const img = document.createElement('img');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = user.first_name +" " + user.last_name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Email: ${user.email}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Class: ${user.class}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Phone Number: ${user.phone_number}`;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    ul.appendChild(li);

  });
};



// AJAX call
const getTeacherList = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/teacher', fetchOptions);
    const users = await response.json();
    createTeacherCards(users);
  } catch (e) {
    console.log("Message " + e.message);
  }
};

//get List of Users
const getAllUsers = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/', fetchOptions);
    const users = await response.json();
    console.log(users);
    createTeacherCards(users);
  } catch (e) {
    console.log("Message " + e.message);
  }
};

// submit add user form
userForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/registerUser', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'front.html';
});

// submit add Student form
studentForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addStudentForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  const response = await fetch(url + '/auth/registerStudent', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'front.html';
});

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = 'front.html';
  }
});

//logout
logOut.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    alert('You have logged out');
    startApp(false);
  } catch (e) {
    console.log(e.message);
  }
});

//when app starts, check if token exists and hide login form, show logout button and main content
(async () => {
  if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
    console.log(sessionStorage.getItem('user'));
    // check if token valid
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/token', fetchOptions);
      console.log("Response is : " + response.ok);
      if (!response.ok) {
        startApp(false);
      } else {
        startApp(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  } else {
    // when starting app and nothing in sessionStorage
    startApp(false);
  }
})();
