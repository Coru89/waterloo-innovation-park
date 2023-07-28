<?php

$config = [];
$request = Craft::$app->request;

// Get the 'toEmail' field from POST
$toEmailField = $request->getBodyParam('toEmail');
// Check it's not a console request and the field is not null
if ($toEmailField !== null && !$request->getIsConsoleRequest()) {   
   // Hash the email provided
   $toEmailField = Craft::$app->getSecurity()->hashData($toEmailField, null);
   // Verify (may not be needed);
   $isValid = Craft::$app->getSecurity()->validateData($toEmailField);
}

// If not a console request, the 'toEmail' field is not null and the field has ben validated
if (
      !$request->getIsConsoleRequest() &&
      $toEmailField !== null && 
      $isValid !== null
   ) {
      // set the 'toEmail' config to the new hashed email
      $config['toEmail'] = $toEmailField;
} elseif (
      !$request->getIsConsoleRequest() &&
      ($toEmail = $request->getValidatedBodyParam('toEmail')) !== null
      ) {
   $config['toEmail'] = $toEmail;
}

return $config;