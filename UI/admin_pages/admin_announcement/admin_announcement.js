'use strict';

const url = 'http://localhost:3000';

const btnparent = document.querySelector('#btnparent');

btnparent.addEventListener('click', () => {
    location.href="../admin_userlist/admin_userlist.html"
    getAllUsers();
  });