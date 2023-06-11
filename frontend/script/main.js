let currentUsername = '';
let a = true
tirarUser()
async function tirarUser(){
  let response = await fetch('http://localhost:3000/posts/username');
  currentUsername = await response.json()
  console.log(currentUsername)
}

async function logout(){
 await fetch('http://localhost:3000/posts/logout', {
  method: 'delete'
 })
  currentUsername = '';
  localStorage.removeItem('username')
  logar()
  buscarPosts()
}
logar()
async function logar(){
  
   if(a){
  await tirarUser()
  }
  if(currentUsername != ''){
    document.getElementById('header').innerHTML= `<div class="tituloh1"><h1>MyBlog</h1></div>Loged with: ${currentUsername}<button id='log'>Log out</button>`
    document.getElementById('log').addEventListener('click', ()=>logout())
    a = false
  }else{
    document.getElementById('header').innerHTML = '<div class="tituloh1">  <h1>MyBlog</h1></div> <nav class="menu"><a href="pages/login.html">Log in</a><a href="pages/signin.html">Sign in</a></nav>'
  }
}


function postar(){
    document.getElementById('a').innerHTML = "<div id='post'><div id='h3'<h2>Create a new Post</h2></div><form><input type='text' id='title' maxlength='30' width='30' placeholder='Maximum characters: 30'><textarea type='text' id='desc' maxlength='255' rows='8' cols='30' placeholder='Maximum characters: 255'></textarea><input type='submit' id='submit' value='Submit'><input type='submit' value='Return' id='return'></form></div>"

    document.getElementById('submit').addEventListener('click',()=>createPost(document.getElementById('title').value, document.getElementById('desc').value))
}
function tirar(event){
  event.preventDefault()
    document.getElementById('post').style.visibility = 'hidden';
}




const buscarPosts = async()=>{
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();
    document.getElementById('b').innerHTML = ''
    mostrarPosts(posts)
    
    
}

const createElement =(tag, innerText = '', innerHTML = '')=>{//faz o valor padrao do inner text vazio
  const element = document.createElement(tag);
  if(innerText){
  element.innerText = innerText
  };
  if(innerHTML){
  element.innerHTML = innerHTML;
  }
  return element
}

const mostrarPosts = async(posts)=>{
  let dataCerta = 'Unknown date'; // Valor padrão

  posts.forEach((post) => {
    if (post.posted_at_posts !== null) {
      let data = post.posted_at_posts;
      dataCerta = data.substring(0, 10);
    }

    if(currentUsername.toUpperCase()==post.username_users.toUpperCase()){

      const { idposts_posts } = post;


  document.getElementById('b').innerHTML += `
    <main>
      <div id="userDate">
        <div id="user">${post.username_users}</div>
        <div id="data">${dataCerta}</div>
      </div>
      <div id="titulo-${idposts_posts}" class="titulo">
        ${post.title_posts}
      </div>
      <div id="descricao-${idposts_posts}" class="descricao">
        ${post.desc_posts}
      </div>
      <div class="btn">
        <button class="edit" id='edit-${idposts_posts}'>
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="trash" id='delete-${idposts_posts}'>
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </main>`;
  
    
/*
    document.getElementById(`edit-${idposts_posts}`).addEventListener('click', () => editar(idposts_posts));
    document.getElementById(`delete-${idposts_posts}`).addEventListener('click', () => apagar(idposts_posts));*/
    document.getElementById(`edit-${idposts_posts}`).onclick = () => editar(idposts_posts);
    
    document.getElementById(`delete-${idposts_posts}`).onclick = () => apagar(idposts_posts);


}
else{
      document.getElementById('b').innerHTML += `<main>
    <div id="userDate">
     <div id="user">${post.username_users}</div>
     <div id="data">${dataCerta}</div>
    </div>
    <div class="titulo">
      ${post.title_posts}
    </div>
    <div class="descricao">
      ${post.desc_posts}
    </div>
  </main>`
    }

  })

}

window.addEventListener('load', ()=>buscarPosts())


const apagar = async (id) => {
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'delete'
  });
  loadPosts();
}
const loadPosts = async()=>{
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json(); 
    document.getElementById('b').innerHTML = ''
    mostrarPosts(posts)
}

const createPost = async(titulo, desc)=>{
  event.preventDefault()
  console.log(titulo, desc)
 const post = {
  title: titulo,
  desc: desc
} 
await fetch('http://localhost:3000/posts', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(post)
})
loadPosts()
}

const editar = (id)=>{
console.log(id)
  document.getElementById(`titulo-${id}`).style.padding ='0px'
  document.getElementById(`titulo-${id}`).style.border ='none'
  document.getElementById(`descricao-${id}`).style.padding ='0px'
  document.getElementById(`descricao-${id}`).style.border ='none'

  let titleValue = document.getElementById(`titulo-${id}`).textContent;
  document.getElementById(`titulo-${id}`).innerHTML = '<input type="text" class="editfield" id="editTitle">'
  document.getElementById('editTitle').value = titleValue;


  

  let descValue = document.getElementById(`descricao-${id}`).textContent
  document.getElementById(`descricao-${id}`).innerHTML = '<textarea  class = "editfield" id="editDesc"></textarea>'
  document.getElementById('editDesc').value = descValue;

  let titulo = '';
  document.getElementById('editTitle').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      titulo = document.getElementById(`editTitle`).value;
      document.getElementById(`titulo-${id}`).innerHTML = titulo;
      desc = document.getElementById('editDesc').value;
      document.getElementById(`descricao-${id}`).innerHTML = desc;

      editTask(titulo, desc, id);
    }
  });

  let desc = '';
  document.getElementById('editDesc').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      titulo = document.getElementById('editTitle').value;
      document.getElementById(`titulo-${id}`).innerHTML = titulo;
      desc = document.getElementById('editDesc').value;
      document.getElementById(`descricao-${id}`).innerHTML = desc;

      editTask(titulo, desc, id);
    }
  });
  
  
  
}//tentar fazer com que o editar fique todo na mesma funcao

const editTask = async(titulo, desc, id)=>{
  console.log(titulo, desc, id)
  const post = {
    title: titulo,
    desc: desc
  }
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  })
  loadPosts()
}