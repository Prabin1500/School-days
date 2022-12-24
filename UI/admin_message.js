'use strict';

const url = 'http://localhost:3000';

//getting html items into js
const nameofuser = document.querySelector('.username');
const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage');
const ul = document.getElementById("userlist");
const recievedMessages = document.getElementById("recieverDiv");
const messagesBox = document.getElementById("messagebox");
const searchvalue = document.querySelector('#searchbar');

//getting user information when logged in 
let user = JSON.parse(sessionStorage.getItem('user'));
let reciever = user.username;
let sender;
nameofuser.innerHTML = user.USERNAME;

//stores the list of users and students in the temporary arraylist
let listofusers = [ ];

//adding navigation route
btnlist.addEventListener('click', () => {
    location.href="./admin_userlist.html"
});

  btnannouncement.addEventListener('click', () => {
    location.href="./admin_announcement.html"
});

searchvalue.addEventListener('input', (e) => {
  e.preventDefault();
  let value = e.target.value;

  if( value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    console.log(value);
    createMemberList(listofusers.filter(p => {
      let fname = p.first_name + p.last_name;
      return fname.toLowerCase().includes(value);
    }));
  }
});

//members list card which works eith ajax call
const createMemberList = (members) =>{
  ul.innerHTML = '';
  for(let i = 0; i<=members.length; i++ ){
      const btn = document.createElement('button');
      btn.id="btn";
      btn.value =members[i].username ;
      btn.innerText  = members[i].first_name+" "+members[i].last_name  ;
      btn.addEventListener('click',function(){
          recievedMessages.innerHTML=``;
          sender=btn.value;
          document.getElementById('chatName').innerText =members[i].first_name+" "+members[i].last_name  ;
          console.log("Sender is: "+sender)
          getMessages();
          messagesBox.innerHTML=`
          <form action="https://schooldays2.northeurope.cloudapp.azure.com/app/sendMessage" method="post" enctype="multipart/form-data" id ="messageForm">
              <textarea class="light-border" name="description" rows="5" cols = "50" id="messageText" required></textarea>
              <input type = "hidden" name="sender" value="${reciever}">
              <input type = "hidden" name="reciever" value="${members[i].username}">
              <button type="submit" id="submit">Send</button>
          </form>
          `;
       })
      ul.appendChild(btn);

  }

}


//AJAX CALL 
const getUsers = async() =>{
  try{
      const response = await fetch(url + '/');
      const members = await response.json();
      
      for (let j = 0; j < members.length; j++) {
        listofusers.push(members[j]);
      };

      createMemberList(members);
  }catch(e){
      console.log(e.message);
  };
};
getUsers();

//message list which is called in getMessages ajax call
const createMessageList=(messages)=>{
  recievedMessages.innerHTML=``;
  for(let j=0;j<messages.length;j++){
      let messageLeft = document.createElement('div');
      let messageRight = document.createElement('div');
      messageRight.id= "right";
      messageLeft.id="left";
      if(messages[j].sender===sender){
          messageLeft.innerHTML = `
            <h6>${messages[j].sender} at: ${messages[j].dateandtime}</h6>
            <p><b>${messages[j].description}</b></p>`;
          recievedMessages.appendChild(messageLeft);
      }else{
      messageRight.innerHTML= `
        <h6 id ="rightItem">${messages[j].sender} at: ${messages[j].dateandtime}</h6>
        <p id="rightItem"><b>${messages[j].description}</b></p>
      `;
      recievedMessages.appendChild(messageRight);
      }
  }

}
//ajax call to get messages
const getMessages = async() =>{
  try{
      const messageResponse = await fetch(url + '/messages/'+reciever+'&'+sender);
      const messages = await messageResponse.json();
      createMessageList(messages);
  }
  catch(e){
      console.log(e.message)
  }
}

//dashboard messages to be displayed when message tab is open and see new messages user recieved.
const dashboardMessagesList = (allMessages) =>{
  recievedMessages.innerHTML=``;
  for(let k=0;k<allMessages.length;k++){
      let messageText = document.createElement('p');
      messageText.innerHTML = `${allMessages[k].description} Sender: ${allMessages[k].sender} at ${allMessages[k].dateandtime}`;
      recievedMessages.appendChild(messageText);
  }

}

//ajax call for dashboard message
const dashboardMessages= async() =>{
  try{
      const allMessageResponse = await fetch(url + '/allMessages/'+reciever);
      const allMessages = await allMessageResponse.json();
      dashboardMessagesList(allMessages);
  }catch(e){
      console.log(e.message);
  }
}

dashboardMessages();  

//clears the input value in search field while refreshing the page
window.onload = function() {
  document.getElementById('searchbar').value = '';
}