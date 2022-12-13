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
          console.log("Sender is: "+sender)
          getMessages();
          messagesBox.innerHTML=`
          <form action="http://localhost:3000/sendMessage" method="post" enctype="multipart/form-data" class="light-border">
              <input class="light-border" type="text" name="description" placeholder="Type your message...">
              <input type = "hidden" name="sender" value="${reciever}">
              <input type = "hidden" name="reciever" value="${members[i].username}">
              <button type="submit">Send</button>
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
      let messageLeft = document.createElement('p');
      let senderLeft = document.createElement('h4');
      let messageRight = document.createElement('p');
      messageRight.id= "right";
      let senderRight = document.createElement('h4');
      senderRight.id="right";
      console.log(sender==messages[j].sender);
      if(messages[j].sender===sender){
          senderLeft.innerText= messages[j].sender+ " at: "+messages[j].dateandtime;
          messageLeft.innerText= messages[j].description;
          recievedMessages.appendChild(senderLeft);
          recievedMessages.appendChild(messageLeft);
      }else{
      senderRight.innerText= messages[j].sender+ " at: "+messages[j].dateandtime;
      messageRight.innerText= messages[j].description;
      recievedMessages.appendChild(senderRight);
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