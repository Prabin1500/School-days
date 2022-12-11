'use strict';

const url = 'http://localhost:3000';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');
const announcement = document.querySelector('.announcementbox');
const parentlist = document.querySelector('#listparent');
const studentlist = document.querySelector('#liststudent');
const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage');
const topsection = document.querySelector('.topsection');
const displayparentlist = document.querySelector('.parentlist');
const displaystudentlist = document.querySelector('.studentlist');
const btnannouncement = document.querySelector('.active');





let showhide = false;

let user = JSON.parse(sessionStorage.getItem('user'));
welcome.innerHTML ='Welcome ' + user.FIRST_NAME;

document.getElementById('submit').onclick= onclickL();
document.getElementById('submit1').onclick= onclickR();

function onclickL(){
  document.getElementById('userssn').value = user.USERSSN;
};

function onclickR(){
  document.getElementById('userssn2').value = user.USERSSN;
};

btnparent.addEventListener('click', () => {
  location.href="../admin_userlist/admin_userlist.html"
  getAllUsers();
});

btnmessage.addEventListener('click', () => {
  location.href="../admin_message/admin_message.html"
  getAllUsers();
});

const createAnnouncementCards = (announcements) =>{
  announcement.innerHTML = '';

  for(let i = 0; i<=announcements.length; i++ ){

    const div1 = document.createElement('div');
    div1.className='text';
    const div2 = document.createElement('div');
    div2.className ='button';

    const newsImage = document.createElement('img');
      newsImage.src = '../../../uploads/' + announcements[i].media_filename;
      newsImage.classList.add('resp');
      const figure = document.createElement('figure').appendChild(newsImage);
      figure.style.width = '200px';
      figure.style.height = '200px';
      figure.style.marginLeft='20px';

    if(announcements[i].media_filename != null){
      div1.appendChild(figure);
    }

    const h2 = document.createElement('h3');
    h2.innerHTML = `${announcements[i].text}`;
  
    const p1 = document.createElement('p');
    p1.innerHTML = `Posted by ${announcements[i].first_name} ${announcements[i].last_name}  at ${announcements[i].dateandtime}`;
  
    // modify button
    const modButton = document.createElement('button');
    modButton.classList.add('button');
    modButton.id = 'modbutton';
    modButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    modButton.addEventListener('click', async() => {
      location.href =`../../updateAnnouncement.html?id=${announcements[i].announcementid}`;
    });
    

  
    // delete selected 
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    delButton.classList.add('button');
    delButton.id = 'delbutton';
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
  
      div1.appendChild(h2);
      div2.appendChild(p1);
      div2.appendChild(modButton);
      div2.appendChild(delButton);
      li.appendChild(div1);
      li.appendChild(div2);
      announcement.appendChild(li);
    };
};

// create User cards


//AJAX CALL 
const getAnnouncement = async() =>{
  try{
      const response = await fetch(url + '/announcementFiltered/' + user.USERSSN);
      const announcements = await response.json();
      console.log(announcements);
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
      document.getElementById("withoutImage").style.flexDirection="column";
      document.getElementById("withImage").style.display = "none";
  }else if(selectedButton == "Image"){
      document.getElementById("withoutImage").style.display = "none";
      document.getElementById("withImage").style.flexDirection = "column";
      document.getElementById("withImage").style.display = "flex";
  }
}
radioButtons.forEach(radioButton => {
  radioButton.addEventListener("change", selected)   
})