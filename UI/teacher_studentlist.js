"use strict";

const url = 'https://schooldays2.northeurope.cloudapp.azure.com/app';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');
const announcement = document.querySelector('.announcementbox');
const parentlist = document.querySelector('#listparent');
const studentlist = document.querySelector('#liststudent');
const btnparent = document.querySelector('#btnparent');
const topsection = document.querySelector('.topsection');
const displaystudentlist = document.querySelector('.studentlist');
const btnannouncement = document.querySelector('#btnannouncement');
const btnmessage = document.querySelector('#btnmessage')
const homebtn = document.querySelector('#home');
const username = document.querySelector('#username');
const nameofuser = document.querySelector('.name');
const role = document.querySelector('.role');

let showhide = false;

let user = JSON.parse(sessionStorage.getItem('user'));
welcome.innerHTML ='Welcome ' + user.first_name;
username.innerHTML = user.username;
nameofuser.innerHTML = user.first_name + ' ' + user.last_name;
role.innerHTML = user.role.toUpperCase();

btnannouncement.addEventListener('click', () => {
  location.href="/teacher_announcement.html"
});
btnmessage.addEventListener('click', () => {
  location.href="/teacher_message.html"
});


// create User cards
const createParentCards = (users) => {
  // clear ul
  parentlist.innerHTML = '';
  console.log(users);
  users.forEach((user) => {
    
    const img = document.createElement('img');
    img.src='/cat.jpeg'
  
    const div = document.createElement('div');
    div.className='imgClass';
    div.appendChild(img);
  
    const h2 = document.createElement('h2');
    h2.innerHTML = user.first_name +" " + user.last_name;
  
    const p1 = document.createElement('p');
    p1.innerHTML = `Email: ${user.email}`;
  
    const p3 = document.createElement('p');
    p3.innerHTML = `Phone Number: ${user.phone_number}`;
  
    const p4 = document.createElement('p');
    p4.innerHTML = `Role: Teacher`;

    const moreButton = document.createElement('button');
    moreButton.innerHTML = 'Show children';
    moreButton.addEventListener('click', async() => {
      if(!showhide){
        getAllStudents(user.userssn);
        console.log(user.first_name);
        document.getElementById('studentsparent').innerHTML = `List of ${user.first_name}'s children`;
        moreButton.innerHTML='Hide children';
        displaystudentlist.style.display='block';
        showhide=true;
      }else{
        if(moreButton.innerHTML=='Hide children'){
          moreButton.innerHTML = 'Show children';
          displaystudentlist.style.display='none';
          showhide=false;
        }
        
      }
    });
    moreButton.classList.add('button');
  
    const li = document.createElement('li');
    li.classList.add('light-border');
  
    li.appendChild(h2);
    li.appendChild(div)
    li.appendChild(p1);
    li.appendChild(p3);
    li.appendChild(p4);
    li.appendChild(moreButton);
    parentlist.appendChild(li);
  
  });
};

//create student card
const createStudentCard = (students) => {

  studentlist.innerHTML = '';
  students.forEach((student) => {
    // create li with DOM methods 
    const img = document.createElement('img');

    const div = document.createElement('div');
    div.className='imgClass';
    div.appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = student.first_name +" " + student.last_name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Class: ${student.class}`;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(div)
    li.appendChild(p1);
    studentlist.appendChild(li);

  });

};

//get List of users who are parent
const getAllUsers = async () => {
  const userOption = [];
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/', fetchOptions);
    const users = await response.json();
    
    for (let i = 0; i < users.length; i++) {
      if(users[i].role === 'parent'){
        userOption.push(users[i]);
      }
    };
    createParentCards(userOption);
  } catch (e) {
    console.log("Message " + e.message);
  }
};

//get all students
const getAllStudents = async(userId) => {
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
      if(userId == students[i].userssn){
        usersChildren.push(students[i]);
      } 
    };

    console.log(students);
    createStudentCard(usersChildren);
  } catch (e) {
    console.log("Message " + e.message);
  }
};
getAllUsers();







 


