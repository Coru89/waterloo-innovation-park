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

                if (empty($submission->message['body'])) {
                     // Add the error
                     // (This will be accessible via `message.getErrors(fromName')` in the template.)
                     $submission->addError('message.body', 'Comments cannot be blank.');
                 }

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
                
                if (empty($submission->message['Date Requested'])) {
                    $submission->addError('message.dateRequested', 'Date time cannot be blank.');
                }

                if (empty($submission->message['Start Time'])) {
                    $submission->addError('message.startTime', 'Start time cannot be blank.');
                }

                if (empty($submission->message['End Time'])) {
                    $submission->addError('message.endTime', 'End requested cannot be blank.');
                }

                // if fields have n/a passed in, then remove them from $sumbission so they dont show in the email.
                // i am passing n/a via hidden fields in the case in which they are not being used for contact form
                if (isset ($submission->message['Date Requested']) && $submission->message['Date Requested'] === 'n/a') {
                unset($submission->message['Date Requested']);
                }

                if (isset ($submission->message['Start Time']) && $submission->message['Start Time'] === 'n/a') {
                unset($submission->message['Start Time']);
                }

                if (isset ($submission->message['End Time']) && $submission->message['End Time'] === 'n/a') {
                unset($submission->message['End Time']);
                }

                if (isset ($submission->message['Company Name']) && $submission->message['Company Name'] === 'n/a') {
                unset($submission->message['Company Name']);
                }

            }
        );
    }
}
