<?php

$config = [];
$request = Craft::$app->request;

$toEmail = $request->getBodyParam('toEmail');

if ($toEmail !== null && !$request->getIsConsoleRequest()) {
   $config['toEmail'] = $toEmail;
}

return $config;
