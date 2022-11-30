'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const ul = document.querySelector('ul');

const getAnnouncement = async() =>{
    const response = await fetch(url + '/announcement');
    const announcements = await response.json();
    console.log(announcements);
    for (const announcement of announcements) {
        ul.innerHTML += `
    <li>
        <h1>WORKS</h1>
        <h2>${announcement.text}</h2>
        <figure>
            <img src="${announcement.media_filename}" class="resp">
        </figure>
        <p>Uploaddate: ${announcement.dateandtime}</p>
        <p>Uploader FirstName: ${announcement.first_name}</p>
        <p>Last Name: ${announcement.last_name}</p>
    </li>
    `;
    }
};

getAnnouncement();