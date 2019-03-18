import { Messenger } from './messenger.js';

const url = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=4Gnep8UgMjdC';
const submitButtonId = 'submitButton';
const author = 'Flávio';
const messageContainerId = 'message-container';

const messenger = new Messenger(url, author, fetch.bind(window), moment, submitButtonId, messageContainerId);
messenger.loadMessages();

