let currentUsername = '';
tirarUser()
function tirarUser(){
  currentUsername = localStorage.getItem('username')
  console.log(currentUsername)
}

function postar(){
    document.getElementById('a').innerHTML = "<div id='post'><div id='h3'<h2>Create a new Post</h2></div><form><input type='text' id='title' maxlength='30' width='30' placeholder='Maximum characters: 30'><textarea type='text' id='desc' maxlength='255' rows='8' cols='30' placeholder='Maximum characters: 255'></textarea><input type='submit' id='submit' value='Submit'><input type='submit' value='Return' id='return'></form></div>"
}
function tirar(){
    document.getElementById('post').style.visibility = 'hidden';
}


window.addEventListener('load', ()=>buscarPosts())

const buscarPosts = async()=>{
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();
    document.getElementById('b').innerHTML = ''
    mostrarPosts(posts)
    
}

const mostrarPosts = async(posts)=>{
  let dataCerta = 'Unknown date'; // Valor padrão

  posts.forEach((post) => {
    if (post.posted_at_posts !== null) {
      let data = post.posted_at_posts;
      dataCerta = data.substring(0, 10);
    }

   const {idposts_posts} = post

    if(currentUsername.toUpperCase()==post.username_users.toUpperCase()){

    document.getElementById('b').innerHTML += `<main>
    <div id="userDate">
     <div id="user">${post.username_users}</div>
     <div id="data">${dataCerta}</div>
    </div>
    <div id="titulo">
      ${post.title_posts}
    </div>
    <div id="descricao">
      ${post.desc_posts}
    </div>
    <div class="btn">
      <button class="edit">
        <span class="material-symbols-outlined">
            edit
            </span>
      </button>
      <button class="trash" id='delete'>
        <span class="material-symbols-outlined">
            delete
            </span>
      </button>
      </div>
  </main>`
}
else{
      document.getElementById('b').innerHTML += `<main>
    <div id="userDate">
     <div id="user">${post.username_users}</div>
     <div id="data">${dataCerta}</div>
    </div>
    <div id="titulo">
      ${post.title_posts}
    </div>
    <div id="descricao">
      ${post.desc_posts}
    </div>
  </main>`
    }

document.getElementById('delete').addEventListener('click', ()=>apagar(idposts_posts))

  })
}

const apagar = async(id)=>{
  console.log('Bom dia')
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'delete'
  })
  loadPosts()
}
const loadPosts = async()=>{
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json(); 
    document.getElementById('b').innerHTML = ''
    mostrarPosts(posts)
}