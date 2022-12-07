'use strict';


const url = 'http://localhost:3000';

const ul = document.querySelector('#listTeacher');
const listStudent = document.querySelector('#listStudent');
const addUser = document.querySelector('.addUser');
const registerForm = document.querySelector('.forms');
const main = document.querySelector('.main');
const userForm = document.querySelector('#addUserForm');
const userList = document.querySelector('.select-user');
const studentForm = document.querySelector('#addStudentForm');
const classFilter = document.querySelector('#class');
const btnTeacher = document.querySelector('#teacherList');
const btnParent = document.querySelector('#ParentList');
const btnStudent = document.querySelector('#StudentList');

let toggleAddUser = false;
let toggleList = false;


btnTeacher.addEventListener('click', () =>{
  if(!toggleList){
    main.style.display = 'block';
    toggleList = true;
  }else{
    main.style.display = 'none';
    toggleList = false;
  }
});
//toogle for AddUser button
addUser.addEventListener('click',() =>{
  if(!toggleAddUser){
    registerForm.style.display = 'inline-block';
    toggleAddUser = true;
  }else{
    registerForm.style.display = 'none';
    toggleAddUser = false;
  }
    
});

//select classes
classFilter.onchange = function(){
  const output = this.value;
  getFilteredUsers(output);
  return false;
};



const getFilteredUsers = async (output) => {
  const filtereduser = [];
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/teacher', fetchOptions);
    const users = await response.json();

    if(output == 0){
      createUserCards(users);
      console.log("Bye");
    }else{
      for (let i = 0; i < users.length; i++) {
        if(users[i].class == output){
          console.log("Output " + output);
          filtereduser.push(users[i]);
        }
      }
      createUserCards(filtereduser);
    }
   
  } catch (e) {
    console.log("Message " + e.message);
  }
};

// create User cards
const createUserCards = (users) => {
  // clear ul
  ul.innerHTML = '';
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
    p4.innerHTML = `Role: Teacher`;
  
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
    console.log("Student name " + student.first_name)
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

}

// get list of teachers
const getTeacherList = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/teacher', fetchOptions);
    const users = await response.json();
    createUserCards(users);
  } catch (e) {
    console.log("Message " + e.message);
  }
};

//get name of parents in student from option
//Not working atm
// s

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
      if(users[i].role === 'parent'){
        userOption.push(users[i]);
      }
    };
    createUserOptions(userOption)
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
    createStudentCard(students);
  } catch (e) {
    console.log("Message " + e.message);
  }
};


getTeacherList();
getAllStudents();
getAllUsers();

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
  location.href = 'admin_userList.html';
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