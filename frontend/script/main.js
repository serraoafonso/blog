function postar(){
    document.getElementById('a').innerHTML = "<div id='post'><div id='h3'<h2>Create a new Post</h2></div><form><input type='text' id='title' maxlength='30' width='30' placeholder='Maximum characters: 30'><textarea type='text' id='desc' maxlength='255' rows='8' cols='30' placeholder='Maximum characters: 255'></textarea><input type='submit' id='submit' value='Submit'><input type='submit' value='Return' id='return'></form></div>"
}
function tirar(){
    document.getElementById('post').style.visibility = 'hidden';
}