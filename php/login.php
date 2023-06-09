
<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in</title>
    <link rel="stylesheet" href='../frontend/style/signin.css'>
</head>
<body>
<?php
if(isset($_POST['submit'])){
    if(empty($_POST['username'])||empty($_POST['password'])){
        echo "<div class='aviso' id='aviso'>Please fill all the gaps <button id='ok'><a href='../frontend/pages/login.html'>OK</a></button></div></div>";
    }else{
        $username = $_POST['username'];
        $password = $_POST['password'];

    $db_server = 'localhost';
    $db_user = 'root';
    $db_pass = 'Afonso10';
    $db_name = 'blog_db';
    $conn = '';
    try{
        $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

    }catch(mysqli_sql_exception){

        echo "<div class='aviso' id='aviso'>Could not sign in!<button id='ok'><a href='../frontend/pages/login.html' class='bom'>OK</a></button></div>";
    }

    $sql = "SELECT * FROM users WHERE username_users = '$username'";
    $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result)>0 ){

            $row = mysqli_fetch_assoc($result);
            $stored_hash = $row['hashed_password_users'];

            if(password_verify($password, $stored_hash)){

                $sql2 = "UPDATE currentuser SET username = '$username' WHERE id = 1";
                mysqli_query($conn, $sql2);

                echo "<div class='aviso' id='aviso'>Loged in sucessful! <button id='ok'><a href='../frontend/index.html' onclick='confirmar()'>OK</a></button></div></div>";
                
                

                    }
                    else{
                        echo "<div class='aviso' id='aviso'>Password or username incorrect<button id='ok'><a href='../frontend/pages/login.html' class='bom'>OK</a></button></div>";
                    }}
        else{
            echo "<div class='aviso' id='aviso'>Password or username incorrect<button id='ok'><a href='../frontend/pages/login.html' class='bom'>OK</a></button></div>";
        }
        mysqli_close($conn);
    }
}
?>
</body>
<script src="../frontend/script/visibilidade.js"></script>

<script src="../frontend/script/grabUser2.js"></script>
</html>
