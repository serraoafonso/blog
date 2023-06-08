let pre_username;
let username = '';
let username2;
function salvar(){
    pre_username = document.getElementById('username').value;
    localStorage.setItem('username', pre_username)
}
function mudar(){
  username = 'afonsoserrao'//localStorage.getItem('username')//variavel certa
  return username

}
function carregar(){
     username2 = localStorage.getItem('username')
}

module.exports = {mudar}
