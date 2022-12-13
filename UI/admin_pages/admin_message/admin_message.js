'use strict';

const url = 'http://localhost:3000';

const nameofuser = document.querySelector('.username');
const btnparent = document.querySelector('#btnparent');
const btnmessage = document.querySelector('#btnmessage');
const ul = document.getElementById("userlist");
const recievedMessages = document.getElementById("recieverDiv");
const messagesBox = document.getElementById("messagebox");
let user = JSON.parse(sessionStorage.getItem('user'));
let reciever = user.USERNAME;
let sender;

nameofuser.innerHTML = user.USERNAME;

btnlist.addEventListener('click', () => {
    location.href="../admin_userlist/admin_userlist.html"
});

  btnannouncement.addEventListener('click', () => {
    location.href="../admin_announcement/admin_announcement.html"
});

const createMemberList = (members) =>{
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
          <form action="http://localhost:3000/sendMessage" method="post" enctype="multipart/form-data" id ="messageForm">
              <textarea class="light-border" name="description" rows="5" cols = "50" id="messageText"></textarea>
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
      createMemberList(members);
  }catch(e){
      console.log(e.message);
  };
};
getUsers();

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
const dashboardMessagesList = (allMessages) =>{
  recievedMessages.innerHTML=``;
  for(let k=0;k<allMessages.length;k++){
      let messageText = document.createElement('p');
      messageText.innerHTML = `${allMessages[k].description} Sender: ${allMessages[k].sender} at ${allMessages[k].dateandtime}`;
      recievedMessages.appendChild(messageText);
  }

}

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