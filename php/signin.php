<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in</title>
    <link rel="stylesheet" href='../frontend/style/signin.css'>
</head>
<body>
<?php 
if(isset($_POST['submit'])){
    if(empty($_POST['username']) || empty($_POST['password'] || empty($_POST['email']))){
        echo "<div class='aviso' id='aviso'>Please fill all the gaps <button id='ok'><a href='../frontend/pages/signin.html'>OK</a></button></div></div>";
    }else{
    if(strlen($_POST['username'])>15){
        echo "<div class='aviso' id='aviso'>Username too big <button id='ok'><a href='../frontend/pages/signin.html'>OK</a></button></div></div>";
    }elseif(strlen($_POST['password'])<8){
        echo "<div class='aviso' id='aviso'>Password too weak <button id='ok'><a href='../frontend/pages/signin.html'>OK</a></button></div>";
    }elseif(strlen($_POST['password'])>20){
        echo "<div class='aviso' id='aviso'>Password too big <button id='ok'><a href='../frontend/pages/signin.html'>OK</a></button></div></div>";
    }else{
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    //dados que vao ser enviados para a database em baixo
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
    $_SESSION['username']=$username;
    $_SESSION['hash']=$hashed_password;

    $db_server = 'localhost';
    $db_user = 'root';
    $db_pass = 'Afonso10';
    $db_name = 'blog_db';
    $conn = '';
    $passou = true;
    try{
        $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    }catch(mysqli_sql_exception){
        echo "<div class='aviso' id='aviso'>Could not sign in!<button id='ok'><a href='../frontend/pages/signin.html' class='bom' onclick='mudar()'>OK</a></button></div>";
        $passou = false;
    }

   
    $sql = "INSERT INTO users (username_users, hashed_password_users, email_users) VALUES ('$username', '$hashed_password', '$email')";

if($passou){
    try{
    mysqli_query($conn, $sql);

    echo "<div class='aviso' id='aviso' onmousemove='mudar()'>Signed in sucessful!<button id='ok' class='bom'  onclick='mudar()'><a href='../frontend/index.html' class='bom' onclick='mudar()'>OK</a></button></div>";
    }catch(mysqli_sql_exception){
        echo "<div class='aviso' id='aviso'>Could not sign in! Username or email already in use.<button id='ok'><a href='../frontend/pages/signin.html' class='bom' onclick='mudar()'>OK</a></button></div>";
    }

}
    mysqli_close($conn);

    }
    }
}
?>
</body>

<script src="../frontend/script/visibilidade.js"></script>
<script src="../frontend/script/grabUser.js"></script>

</html>