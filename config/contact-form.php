<?php

$config = [];
$request = Craft::$app->request;

$toEmail = $request->getValidatedBodyParam('toEmail');

if ($toEmail !== null && !$request->getIsConsoleRequest()) {
   $config['toEmail'] = $toEmail;
}

return $config;
