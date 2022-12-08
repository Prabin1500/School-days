'use strict';

const url = 'http://localhost:3000';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');
const announcement = document.querySelector('.announcementbox');

let user = JSON.parse(sessionStorage.getItem('user'));
console.log("USERSSN IS: "+user.USERSSN);

document.getElementById('submit').onclick= onclickL();
document.getElementById('submit1').onclick= onclickR();
function onclickL(){
  document.getElementById('userssn').value = user.USERSSN;
  console.log(document.getElementById('userssn'));
}
function onclickR(){
  document.getElementById('userssn2').value = user.USERSSN;
  console.log(document.getElementById('userssn2'));
}

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;
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
    modButton.innerHTML = 'Modify';
    modButton.addEventListener('click', async() => {
      location.href =`../../updateAnnouncement.html?id=${announcements[i].announcementid}`;
    });
    modButton.classList.add('button');
  
    // delete selected 
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
  
      div1.appendChild(h2);
      div2.appendChild(p1);
      div2.appendChild(modButton);
      div2.appendChild(delButton);
      // li1.appendChild(h2);
      // li1.appendChild(figure);
      // li1.appendChild(p1);
      // li2.appendChild(modButton);
      // li2.appendChild(delButton);
      li.appendChild(div1);
      li.appendChild(div2);
      announcement.appendChild(li);
    };
  };  

//AJAX CALL 
const getAnnouncement = async() =>{
  try{
      const response = await fetch(url + '/announcementFiltered/'+user.USERSSN);
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
      document.getElementById("withImage").style.display = "none";
  }else if(selectedButton == "Image"){
      document.getElementById("withoutImage").style.display = "none";
      document.getElementById("withImage").style.display = "flex";
  }
}
radioButtons.forEach(radioButton => {
  radioButton.addEventListener("change", selected)   
})





 