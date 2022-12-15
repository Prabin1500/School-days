'use strict';
const url = 'https://schooldays2.northeurope.cloudapp.azure.com/app'; 

// select existing html elements
const ul = document.querySelector('#list');
const h1 = document.querySelector('#userType');
const main = document.querySelector('.main');
const logOut = document.querySelector('#log-out');
const loginForm = document.querySelector('.form-wrapper');
const register = document.querySelector('.register');
const userForm = document.querySelector('#addUserForm');
const studentForm = document.querySelector('#addStudentForm');
const frontPage = document.querySelector('#front-page');
const topSection = document.querySelector('section');

const startApp = (logged) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log("logged :" + logged);

  if (logged) {
    if(user.role === 'admin'){
      window.location.href='admin_userlist.html';
    }else if(user.role === 'parent'){
     window.location.href='parent_announcement.html';

    }else if(user.role === 'teacher'){
      window.location.href='teacher_announcement.html';
    }
  };
};


// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  console.log("login");
  const json = await response.json();
  console.log(json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    console.log("login1");
    startApp(true);
  }
});



//when app starts, check if token exists and hide login form, show logout button and main content
(async () => {
  if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
    console.log(sessionStorage.getItem('user'));
    // check if token valid
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/token', fetchOptions);
      console.log("Response is : " + response.ok);
      if (!response.ok) {
        startApp(false);
      } else {
        startApp(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  } else {
    // when starting app and nothing in sessionStorage
    startApp(false);
  }
})();

//getting newsDiv by id 
const newsDiv = document.getElementById("newsDiv");
const newsList = document.getElementById('newsList');

const createAnnouncementCards = (announcements) =>{
  newsDiv.innerHTML='';

  for(let i = 0; i<=announcements.length; i++ ){
    const newsImage = document.createElement('img');
      newsImage.src = url+'/'+announcements[i].media_filename ;
      newsImage.classList.add('news-img');

      const figure = document.createElement('div').appendChild(newsImage);
      figure.classList.add('news-img-wrapper')

    const heading = document.createElement('h3');
    heading.classList.add("news-detail__title");
    heading.innerHTML = `${announcements[i].text}`;

    
    const postedBy = document.createElement("span");
    postedBy.classList.add('news-detail__posted-by');
    postedBy.innerHTML = `Posted By: ${announcements[i].first_name} ${announcements[i].last_name}`;

    const datetime = document.createElement('span');
    datetime.classList.add('news-detail__uploaded-at');
    datetime.innerHTML = `Uploaded at: ${announcements[i].dateandtime}`;


    const li = document.createElement('li');
    li.classList.add('news-item');
    li.appendChild(document.createElement('br'));
    if(announcements[i].media_filename != null){
      li.appendChild(figure);
    }
    li.appendChild(heading);
    li.appendChild(postedBy);
    li.appendChild(datetime);

    newsList.appendChild(li);
    newsDiv.appendChild(newsList);
  }
}

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