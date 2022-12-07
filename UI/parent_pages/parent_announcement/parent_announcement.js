'use strict';

const url = 'http://localhost:3000';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');

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
    console.log(students);
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
  
  };

  createAnnouncementCard = (announcement) =>{

  }

  getAllStudents();