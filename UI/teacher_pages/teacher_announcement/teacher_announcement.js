'use strict';

const url = 'http://localhost:3000';

const welcome = document.querySelector('.welcome');
const listStudent = document.querySelector('.studentList');
const childclass = document.querySelector('.childrenClass');
const announcement = document.querySelector('.announcementbox');
const parentlist = document.querySelector('#listparent');
const studentlist = document.querySelector('#liststudent');
const btnparent = document.querySelector('#btnparent');
const topsection = document.querySelector('.topsection');
const displayparentlist = document.querySelector('.parentlist');
const displaystudentlist = document.querySelector('.studentlist');
const btnannouncement = document.querySelector('.active');
const homebtn = document.querySelector('#home');

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

btnannouncement.addEventListener('click', () => {
  getAnnouncement();
  displayparentlist.style.display='none';
  topsection.style.display='block';
});

btnparent.addEventListener('click', () => {
  displayparentlist.style.display='block';
  topsection.style.display='none';
  getAllUsers();
});

homebtn.addEventListener('click', () => {
  topsection.style.display='block';
  displayparentlist.style.display='none';
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
      li.appendChild(div1);
      li.appendChild(div2);
      announcement.appendChild(li);
    };
};

// create User cards
const createParentCards = (users) => {
  // clear ul
  parentlist.innerHTML = '';
  console.log(users);
  users.forEach((user) => {
    
    const img = document.createElement('img');
    img.src='../../../cat.jpeg'
  
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
        getAllStudents(user.first_name);
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





 