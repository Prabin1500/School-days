'use strict';


const url = 'http://localhost:3000';
const welcome = document.querySelector('.welcome');
const ul = document.querySelector('#listTeacher');
const listStudent = document.querySelector('#listStudent');
const addUser = document.querySelector('.addUser');
const addStudent = document.querySelector('.addStudent');
const registerFormUser = document.querySelector('.formsUser');
const registerFormStudent = document.querySelector('.formsStudent');
const userForm = document.querySelector('#addUserForm');
const userList = document.querySelector('.select-user');
const studentForm = document.querySelector('#addStudentForm');
const classFilter = document.querySelector('#class');
const btnTeacher = document.querySelector('#teacherList');
const btnParent = document.querySelector('#ParentList');
const userListOption = document.querySelector('#selectuser');
const announcementbtn = document.querySelector('#announcement');
const btnmessage = document.querySelector('#btnmessage');
const nameofuser = document.querySelector('.username');
const searchvalue = document.querySelector('#searchbar');
const searchvaluestudent = document.querySelector('#searchbarstudent');

let toggleAddUser = false;
let toggleList = false;

//stores the list of users and students in the temporary arraylist
let listofusers = [];
let listofstudents = [];

let user = JSON.parse(sessionStorage.getItem('user'));

welcome.innerHTML ='Welcome ' + user.FIRST_NAME;
nameofuser.innerHTML = user.USERNAME;

//toogle for AddUser button
addUser.addEventListener('click',() =>{
  if(!toggleAddUser){   
      registerFormUser.style.display = 'inline-block';
      toggleAddUser = true;
      toggleList = false;     
  }else{
    registerFormUser.style.display = 'none';
    toggleAddUser = false;
  }
    
});

searchvalue.addEventListener('input', (e) => {
  e.preventDefault();
  let value = e.target.value;

  if( value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    console.log(value);
    createUserCards(listofusers.filter(p => {
      let fname = p.first_name + p.last_name;
      return fname.toLowerCase().includes(value);
    }));
  }
});

searchvaluestudent.addEventListener('input', (e) => {
  e.preventDefault();
  let value = e.target.value;

  if( value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    console.log(value);
    createStudentCard(listofstudents.filter(p => {
      let fname = p.first_name + p.last_name;
      return fname.toLowerCase().includes(value);
    }));
  }
});

//toogle for AddUser button
addStudent.addEventListener('click',() =>{
  if(!toggleAddUser){   
      registerFormStudent.style.display = 'inline-block';
      toggleAddUser = true;
      toggleList = false;     
  }else{
    registerFormStudent.style.display = 'none';
    toggleAddUser = false;
  }
    
});

announcementbtn.addEventListener('click', () => {
  location.href= '../admin_announcement/admin_announcement.html';
});
btnmessage.addEventListener('click', () => {
  location.href="../admin_message/admin_message.html"
  getAllUsers();
});

// create User cards
const createUserCards = (users) => {
  
  // clear ul
  ul.innerHTML = '';
  console.log(users);
  users.forEach((user) => {
    // create li with DOM methods
    
    const img = document.createElement('img');
    img.src='../../../cat.jpeg'
  
    const div = document.createElement('div');
    div.className='imgClass';
    div.appendChild(img);
  
    const h2 = document.createElement('h2');
    h2.innerHTML = user.first_name +" " + user.last_name;
  
    const p1 = document.createElement('p');
    p1.innerHTML = `Email: ${user.email}`;
  
    const p2 = document.createElement('p');
    p2.innerHTML = `Class: ${user.class}`;
  
    const p3 = document.createElement('p');
    p3.innerHTML = `Phone Number: ${user.phone_number}`;
  
    const p4 = document.createElement('p');
    p4.innerHTML = `Role: ${user.role}`;
  
    const li = document.createElement('li');
    li.classList.add('light-border');
  
    li.appendChild(h2);
    li.appendChild(div)
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    ul.appendChild(li);
  
  });
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
    h2.innerHTML = student.first_name +" " + student.last_name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Class: ${student.class}`;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(div)
    li.appendChild(p1);
    listStudent.appendChild(li);

  });

};

// get list of teachers
// const getTeacherList = async () => {
//   try {
//     const fetchOptions = {
//       headers: {
//         Authorization: 'Bearer ' + sessionStorage.getItem('token'),
//       },
//     };
//     const response = await fetch(url + '/teacher', fetchOptions);
//     const users = await response.json();
//     createUserCards(users);
//   } catch (e) {
//     console.log("Message " + e.message);
//   }
// };

//get name of parents in student from option

//get List of Users
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
      listofusers.push(users[i]);
      if(users[i].role === 'parent'){
        userOption.push(users[i]);
      }
    };

    console.log(users);
    createUserOptions(userOption);
    createUserCards(users);
    
  } catch (e) {
    console.log("Message " + e.message);
  }
};

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
    for (let i = 0; i < students.length; i++) {
      listofstudents.push(students[i]);
      
    };
    createStudentCard(students);
  } catch (e) {
    console.log("Message " + e.message);
  }
};



//create user option
const createUserOptions = (users) => {
  userListOption.innerHTML = 'Select Parent';

  users.forEach((user) => {
  
    const option = document.createElement('option');
    option.value = user.userssn;
    
    option.innerHTML = user.first_name + " " + user.last_name;
    option.classList.add('light-border');
    userListOption.appendChild(option);
  });
};

getAllUsers();
getAllStudents();


// submit add user form
userForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/registerUser', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = './admin_userList.html';
});

//submit student form
studentForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addStudentForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  const response = await fetch(url + '/auth/registerStudent', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'admin_userList.html';
});
