'use strict';

const url = 'http://localhost:3000';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');
const announcement = document.querySelector('.announcementbox');

let user = JSON.parse(sessionStorage.getItem('user'));

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;


//get List of Students
const getAllStudents = async() => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/student', fetchOptions);
      const students = await response.json();
      console.log(students);
      createStudentCard(students);
    } catch (e) {
      console.log("Message " + e.message);
    }
};

const createStudentCard = (students) => {

  listStudent.innerHTML = '';
  students.forEach((student) => {
      // create li with DOM methods 
    const img = document.createElement('img');
  
    const div = document.createElement('div');
    div.className='imgClass';
    div.appendChild(img);
  
    const h2 = document.createElement('h2');
    console.log("Student name " + student.first_name)
    h2.innerHTML = student.first_name +" " + student.last_name;
  
    const p1 = document.createElement('p');
    p1.innerHTML = `Class: ${student.class}`;
  
    const li = document.createElement('li');
    li.classList.add('light-border');        li.appendChild(h2);
    li.appendChild(div)
    li.appendChild(p1);
    listStudent.appendChild(li);
  
  });
  
};
 
getAllStudents();

const createAnnouncementCards = (announcements) =>{
  announcement.innerHTML = '';

  for(let i = 0; i<=announcements.length; i++ ){
      const img = document.createElement('img');
      img.src = '../uploads/' + announcements[i].media_filename;
      img.alt = announcements[i].text;
      img.classList.add('resp');
  
      const figure = document.createElement('figure').appendChild(img);
  
      const div1 = document.createElement('div');

      const div2 = document.createElement('div');
      div2.className ='button';

      const h2 = document.createElement('h2');
      h2.innerHTML = `${announcements[i].first_name} ${announcements[i].last_name}`;
  
  
      const p1 = document.createElement('p');
      p1.innerHTML = `${announcements[i].announcementid}`;
  
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
      div1.appendChild(figure);
      div1.appendChild(p1);
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





 