'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');
const h1 = document.querySelector('#userType');
const main = document.querySelector('.main');
const logOut = document.querySelector('#log-out');
const loginForm = document.querySelector('.form-wrapper');
const register = document.querySelector('.register');
const userForm = document.querySelector('#addUserForm');
const studentForm = document.querySelector('#addStudentForm');
const frontPage = document.querySelector('#front-page');
const topSection = document.querySelector('section');

const startApp = (logged) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log("logged :" + logged);
  main.style.display = logged ? 'block' : 'none';

  if (logged) {
    if(user.ROLE === 'admin'){
      location.href='../admin_pages/admin_userlist/admin_userlist.html';
    }else if(user.ROLE === 'parent'){
      location.href='../parent_pages/parent_announcement/parent_announcement.html';

    }else if(user.ROLE === 'teacher'){
      location.href='../teacher_pages/teacher_announcement/teacher_announcement.html';
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
// userForm.addEventListener('submit', async (evt) => {
//   evt.preventDefault();
//   const data = serializeJson(addUserForm);
//   const fetchOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };
//   const response = await fetch(url + '/auth/registerUser', fetchOptions);
//   const json = await response.json();
//   alert(json.message);
//   location.href = 'front.html';
// });

// // submit add Student form
// studentForm.addEventListener('submit', async (evt) => {
//   evt.preventDefault();
//   const data = serializeJson(addStudentForm);

//   const fetchOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   };

//   const response = await fetch(url + '/auth/registerStudent', fetchOptions);
//   const json = await response.json();
//   alert(json.message);
//   location.href = 'front.html';
// });

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
  console.log("login");
  const json = await response.json();
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    console.log("login1");
    startApp(true);
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
