<?php
namespace foo;


use Craft;
use craft\contactform\models\Submission;
use yii\base\Event;
// use yii\base\Module;

class Module extends \yii\base\Module
{
    public function init()
    {
        parent::init();

        // Listen to the EVENT_AFTER_VALIDATE event
        Event::on(
            Submission::class, 
            Submission::EVENT_AFTER_VALIDATE, 
            function(Event $e) {
                /** @var Submission $submission */
                $submission = $e->sender;

                // if (empty($submission->message['body'])) {
                //     // Add the error
                //     // (This will be accessible via `message.getErrors(fromName')` in the template.)
                //     $submission->addError('message.body', 'Comments cannot be blank.');
                // }

                // if (empty($submission->fromEmail)) {
                //     // Add the error
                //     // (This will be accessible via `message.getErrors(fromName')` in the template.)
                //     $submission->addError('fromEmail', 'Email cannot be blank.');
                // }

                // Make sure that `fromName` was filled in
                if (empty($submission->fromName)) {
                    // Add the error
                    // (This will be accessible via `message.getErrors(fromName')` in the template.)
                    $submission->addError('fromName', 'Name cannot be blank.');
                }

                // Make sure that `message[Company Name]` was filled in
                 if (empty($submission->message['Company Name'])) {
                     // Add the error
                     // (This will be accessible via `message.getErrors('message.companyName')` in the template.)
                     $submission->addError('message.companyName', 'Company name cannot be blank.');
                 }

                 // Make sure that `message[Phone]` was filled in
                 if (empty($submission->message['Date Requested'])) {
                     // Add the error
                     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                     $submission->addError('message.dateRequested', 'Date time cannot be blank.');
                 }

                 // Make sure that `message[Phone]` was filled in
                 if (empty($submission->message['Start Time'])) {
                     // Add the error
                     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                     $submission->addError('message.startTime', 'Start time cannot be blank.');
                 }

                 // Make sure that `message[Phone]` was filled in
                 if (empty($submission->message['End Time'])) {
                     // Add the error
                     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                     $submission->addError('message.endTime', 'End time cannot be blank.');
                 }
            }
        );
    }
}
