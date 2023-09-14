<?php
$host       = "localhost";
$username   = "root";
$password   = "";
$database   = "vue-php-crud";
$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error)
{
    exit('Could not connect to database');
}

$response = ['error' => false];

$action = 'action';

if (isset($_GET['action']))
{
    $action = $_GET['action'];
}

if ($action == 'read')
{
    $sql    = "SELECT * FROM `users`";
    $result = $connection->query($sql);
    $users  = [];

    while ($row = $result->fetch_assoc())
    {
        array_push($users, $row);
    }

    $response['users'] = $users;
}

if ($action == 'create')
{
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $mobile   = $_POST['mobile'];

    $sql = "INSERT INTO `users` (`username`, `email`, `mobile`) VALUES ('$username', '$email', '$mobile')";

    if ($connection->query($sql))
    {
        $response['message'] = "User added successfully";
    }
    else
    {
        $response['error']   = true;
        $response['message'] = "Could not add user";
    }
}

if ($action == 'update')
{
    $id       = $_POST['id'];
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $mobile   = $_POST['mobile'];

    $sql = "UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` = '$id'";

    if ($connection->query($sql))
    {
        $response['message'] = "User updated successfully";
    }
    else
    {
        $response['error']   = true;
        $response['message'] = "Could not update user";
    }
}

if ($action == 'delete')
{
    $id       = $_POST['id'];

    $sql = "DELETE FROM `users` WHERE `id` = '$id'";

    if ($connection->query($sql))
    {
        $response['message'] = "User deleted successfully";
    }
    else
    {
        $response['error']   = true;
        $response['message'] = "Could not delete user";
    }
}

$connection->close();
header('content-type: application/json');

echo json_encode($response);

exit();