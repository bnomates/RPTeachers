<?php
// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Get the JSON data from the fetch request
    $json_str = file_get_contents('php://input');
    $data = json_decode($json_str, true);

    // 2. Sanitize and Validate Inputs
    $name = strip_tags(trim($data["name"]));
    $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($data["message"]));
    $honeyPot = trim($data["website_url"]); // The hidden field

    // 3. Check for Spam (Honeypot)
    if (!empty($honeyPot)) {
        // If the hidden field is filled, it's a bot.
        // Pretend to succeed but do nothing.
        http_response_code(200);
        echo json_encode(["message" => "Success"]);
        exit;
    }

    // 4. Validate Required Fields
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Please complete the form and try again."]);
        exit;
    }

    // 5. Prepare the Email
    // REPLACE THIS WITH YOUR EMAIL ADDRESS
    $recipient = "danny.leggatt@gmail.com"; 
    
    $subject = "New Message from R&P Teachers Website";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: R&P Website <no-reply@rpteachers.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";

    // 6. Send the Email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Message sent successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Oops! Something went wrong and we couldn't send your message."]);
    }

} else {
    // Not a POST request
    http_response_code(403);
    echo json_encode(["message" => "There was a problem with your submission, please try again."]);
}
?>