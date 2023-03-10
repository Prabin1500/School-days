'use strict';

const url1 = 'http://localhost:3000';
const logOut = document.querySelector('#log-out');

logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
      const options = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url1 + '/auth/logout', options);
      const json = await response.json();
      console.log(json);
      // remove token
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      alert('You have logged out');
      location.href='./index.html';
    } catch (e) {
      console.log(e.message);
    }
  });
