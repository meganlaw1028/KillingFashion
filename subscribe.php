<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect subscriber data
    $last_name = $_POST['lastname'];
    $email = $_POST['email'];

    // Write subscriber data to file
    $file = 'subscribers.txt';
    $data = $last_name . ',' . $email . "\n";
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

    // Display success message
    echo '<p>Thank you for subscribing!</p>';
}
?>
