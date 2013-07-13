<?php

    require "Services/Twilio.php";

    $AccountSid = "ACb5d26098bf4a75147debc91172f165cc";
    $AuthToken = "b72a35563b81fa07fcbc7cabe1000415";
    
    $myval = $_GET['variable'];

    $client = new Services_Twilio($AccountSid, $AuthToken);

    // make an array of people we know, to send them a message. 
    $people = array(
        "+19255968005" => "Lucy Guo"
    );

    // Step 5: Loop over friends

    foreach ($people as $number => $name) {

        $sms = $client->account->sms_messages->create(

            "925-400-6931", 

            // the number we are sending to - Any phone number
            $number,

            // the sms body
            "$myval"
        );

        // Display a confirmation message on the screen
        echo "Sent message to $name";
    }