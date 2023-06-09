let currentUsername = '';
let pre_username = '';
function guardar(){
  pre_username = document.getElementById('username').value
  localStorage.setItem('username', pre_username)
}
function confirmar(){
  currentUsername = localStorage.getItem('username')
}