'use- strict';

const url = 'http://localhost:3000'; // change url when uploading to server
// select existing html elements
const ul = document.querySelector('ul');

const createAnnouncementCards = (announcements) =>{
    ul.innerHTML = '';

    for(let i = 0; i<=announcements.length; i++ ){
        const img = document.createElement('img');
        img.src = '../uploads/' + announcements[i].media_filename;
        img.alt = announcements[i].text;
        img.classList.add('resp');
    
        const figure = document.createElement('figure').appendChild(img);
    
        const h2 = document.createElement('h2');
        h2.innerHTML = `${announcements[i].first_name} ${announcements[i].last_name}`;
    
    
        const p1 = document.createElement('p');
        p1.innerHTML = `${announcements[i].announcementid}`;
    
        // modify button
        const modButton = document.createElement('a');
        modButton.innerHTML = 'Modify';
        modButton.href = `updateAnnouncement.html?id=${announcements[i].announcementid}`;
        modButton.classList.add('button');
    
        // delete selected cat
        const delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.classList.add('button');
        delButton.addEventListener('click', async () => {
          const fetchOptions = {
            method: 'DELETE',
          };
          try {
            const response = await fetch(url + '/announcement/' + announcements[i].announcementid, fetchOptions);
            const json = await response.json();
            console.log('delete response', json);
            getAnnouncement();
          } catch (e) {
            console.log(e.message);
          }
        });
    
        const li = document.createElement('li');
        li.classList.add('light-border');
    
        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(modButton);
        li.appendChild(delButton);
        ul.appendChild(li);
      };
    };  
    



//AJAX CALL 
const getAnnouncement = async() =>{
    try{
        const response = await fetch(url + '/announcement');
        const announcements = await response.json();
        createAnnouncementCards(announcements);
    }catch(e){
        console.log(e.message);
    };
};
getAnnouncement();

//check if user wants to upload only text or image and text as announcement
const radioButtons = document.querySelectorAll("input[name='radio']");
document.getElementById("withoutImage").style.display = "none";
let selected = () => {
    let selectedButton = document.querySelector("input[name='radio']:checked").value;
    console.log(selectedButton);
    if(selectedButton == "noImage"){
        document.getElementById("withoutImage").style.display = "flex";
        document.getElementById("withImage").style.display = "none";
    }else if(selectedButton == "Image"){
        document.getElementById("withoutImage").style.display = "none";
        document.getElementById("withImage").style.display = "flex";
    }
}
radioButtons.forEach(radioButton => {
    radioButton.addEventListener("change", selected)   
})