'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const ul = document.querySelector('ul');

const getAnnouncement = async() =>{
    const response = await fetch(url + '/announcement');
    const announcements = await response.json();
    console.log(announcements);
    for (const announcement of announcements) {
        console.log("Announcement id is :"+announcement.announcementid);
        ul.innerHTML += `
    <li>
        <h1>WORKS</h1>
        <h2>${announcement.text}</h2>
        <figure>
        <img src="/uploads/${announcement.media_filename}" class="resp">
        </figure>
        <p>Uploaddate: ${announcement.dateandtime}</p>
        <p>${announcement.first_name} ${announcement.last_name}</p>
</form>
    </form>
    </li>
    `;
    }
};

getAnnouncement();