<?php

$config = [];
$request = Craft::$app->request;

// Get the 'toEmail' field from POST
$toEmail = $request->getBodyParam('toEmail');
// Check it's not a console request and the field is not null
if ($toEmail !== null && !$request->getIsConsoleRequest()) {
   $config['toEmail'] = $toEmail;
}

return $config;