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

                // Make sure that `message[Phone]` was filled in
                if (empty($submission->fromName)) {
                    // Add the error
                    // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                    $submission->addError('fromName', 'Hello World.');
                }

            // Make sure that `message[Phone]` was filled in
                 if (empty($submission->message['Company Name'])) {
                     // Add the error
                     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                     $submission->addError('message.companyName', 'Company name cannot be blank.');
                 }

                // // Make sure that `message[Phone]` was filled in
                // if (empty($submission->message['dateRequested'])) {
                //     // Add the error
                //     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                //     $submission->addError('message.dateRequested', 'Date Requested cannot be blank.');
                // }

                // // Make sure that `message[Phone]` was filled in
                // if (empty($submission->message['startTime'])) {
                //     // Add the error
                //     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                //     $submission->addError('message.startTime', 'Hello World.');
                // }

                // // Make sure that `message[Phone]` was filled in
                // if (empty($submission->message['endTIme'])) {
                //     // Add the error
                //     // (This will be accessible via `message.getErrors('message.phone')` in the template.)
                //     $submission->addError('message.endTime', 'Hello World.');
                // }
            }
        );
    }
}
