let pre_username;
let username = '';
let username2;// variavel com username certo
function salvar(){
    pre_username = document.getElementById('username').value;
    localStorage.setItem('username', pre_username)
}
function mudar(){
  username = localStorage.getItem('username')
 console.log(username)
}
function carregar(){
     username2 = localStorage.getItem('username')
    if(username2 == null || username2 == ''){
        document.getElementById('main').innerHTML =  "Please log in or sign in"
    }else{
        document.getElementById('main').innerHTML = `Username: ${username2}<br><button onclick = 'zerar()'>Log Out</button>`
    }
}

function zerar(){
   localStorage.removeItem('username');
   carregar()
}