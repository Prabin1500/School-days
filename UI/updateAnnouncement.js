'use strict';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const userId =urlParams.get('id');
console.log(userId); 
const url = 'http://localhost:3000'; // change url when uploading to server
const main = document.querySelector('main');
const getAnnouncement = async() =>{
const response = await fetch('http://localhost:3000/announcementById/'+userId);
const announcements = await response.json();
const article = document.createElement('div');
    article.innerHTML += `
    <form action="http://localhost:3000/announcementUpdate" method="post" enctype="multipart/form-data" class="light-border">
      <textarea class="light-border" name="text" rows="5" cols = "50" id="text">${announcements.TEXT}</textarea>
      <input type="hidden" name="announcementid" value ="${announcements.ANNOUNCEMENTID}"> 
      <button class="light-border" type="submit" id="submit">Update</button>
    </form>
    `;
    main.append(article);
};

getAnnouncement();