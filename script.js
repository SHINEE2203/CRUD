const url = "https://65182b74582f58d62d3577f8.mockapi.io/user/"


async function getUsers()
{
  const data = await fetch(url, {method: "GET"})
  const users = await data.json()
  //console.log(users);
  return users
}


async function displayuser(){
  const user = await getUsers();
  const userlist = document.querySelector('.user-list') 
  userlist.innerHTML = ""
  
  user.forEach((user)=>{  
    //console.log(user.name) 
    
    userlist.innerHTML += 
      `<div class="userdata">
       <img src = "${user.avatar}">                                 
       <div>
       <h2>${user.name}</h2>
       <button onclick="Deleteuser(${user.id})"> Delete </button>
       <button onclick="Edituser(${user.id})"> Edit </button>
       </div>
       </div>`;
      
  })
}

displayuser()

async function Deleteuser(id){
  console.log("user deleted"+id);
 const data = await  fetch(url+id, {method: "DELETE"}) //note the /"+id at the end your missing it
  displayuser()
}

async function adduser(){
  
  const Username= await document.querySelector(".name").value;
  const Useravatar= await document.querySelector(".avatar").value;
  console.log("Added: "+ Username, Useravatar)
  
  const data = await  fetch(url, {method: "POST", body:JSON.stringify({
       name:Username,
       avatar:Useravatar
 }),
  
  headers:{
    "Content-Type": "application/json"
  }
                                                                                      
})
  displayuser()
}

async function Edituser(id){
  
    const Username= await document.querySelector(".name").value;
   const Useravatar= await document.querySelector(".avatar").value;
 
 const data = await  fetch(url+id, {method: "PUT", body:JSON.stringify({
          name:Username,
       avatar:Useravatar
 }),
  
  headers:{
    "Content-Type": "application/json"
  }                                                                                     
} ) 
  console.log("Edited", id)


  displayuser()
}