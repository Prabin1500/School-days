'use strict';

const url = 'http://localhost:3000';


const btnannouncement = document.querySelector('#btnannouncement')



  btnannouncement.addEventListener('click', () => {
    location.href="../parent_announcement/parent_announcement.html"
    getAllUsers();
  });

  