'use strict';

const url = 'http://localhost:3000';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');
const announcement = document.querySelector('.announcementbox');
const announcementheader = document.querySelector('#announcementheader');
let showhide = false;
let user = JSON.parse(sessionStorage.getItem('user'));

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;


//get List of Students
const getAllStudents = async() => {
  let usersChildren = [];
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/student', fetchOptions);
      const students = await response.json();
      for (let i = 0; i < students.length; i++) {
        if(user.USERSSN == students[i].userssn){
          usersChildren.push(students[i]);
        } 
      };
      createStudentCard(usersChildren);
    } catch (e) {
      console.log("Message " + e.message);
    }
};

const createStudentCard = (students) => {
 
  listStudent.innerHTML = '';
  students.forEach((student) => {
      // create li with DOM methods 
      console.log(student.class);
    const h2 = document.createElement('h2');
    console.log("Student name " + student.first_name)
    h2.innerHTML = student.first_name +" " + student.last_name;
  
    const p1 = document.createElement('p');
    p1.innerHTML = `Class: ${student.class}`;
  
    const moreButton = document.createElement('button');
    moreButton.innerHTML = 'Show Info';
    moreButton.addEventListener('click', async() => {
      if(!showhide){
        announcementheader.innerHTML = `Announcements for Class ${student.class}`;
        getAnnouncement(student.class);
        moreButton.innerHTML='Hide Info';
        showhide=true;
      }else{
        if(moreButton.innerHTML=='Hide Info'){
          moreButton.innerHTML = 'Show Info';
          showhide=false;
        }
        
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');     

    li.appendChild(h2);
    li.appendChild(p1);
    li.appendChild(moreButton);
    listStudent.appendChild(li);
  
  });
  announcementheader.innerHTML=`Announcements for Class ${students[0].class}`;
  getAnnouncement(students[0].class);
  
};
 
getAllStudents();

const createAnnouncementCards = (announcements) =>{
  announcement.innerHTML = '';
  console.log
  for(let i = 0; i<=announcements.length; i++ ){

    const div1 = document.createElement('div');

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
  
    const li = document.createElement('li');
    li.classList.add('light-border');
    div1.appendChild(h2);
    div1.appendChild(p1);
    li.appendChild(div1);
    li.appendChild(div2);
    announcement.appendChild(li);  
  };
};  

//AJAX CALL 
const getAnnouncement = async(studentsClass) =>{
  try{
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + `/announcementFilteredByClass/ ${studentsClass}`, fetchOptions);
    const announcements = await response.json();
    console.log(announcements);
    createAnnouncementCards(announcements);
  }catch(e){
      console.log(e.message);
  };
};







 