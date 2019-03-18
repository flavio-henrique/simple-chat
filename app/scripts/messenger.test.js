import { Messenger } from './messenger.js';

const moment = require( 'moment');

describe('Messenger', () => {
    const url = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=4Gnep8UgMjdC';
    const submitButtonId = 'submitButton';
    const messageContainerId = 'message-container';
    const author = 'Flávio';
    const message = 'hello';
    Element.prototype.scrollTo = () => {}; // Workaround to provide the scrollTo() function Jest DOM

    it('shoud send message', () => {
        // GIVEN
        document.body.innerHTML = `
        <div id="message-container" class="container"></div>
        <div class="box-input">
            <div class="container flex">
                <div class="input-item">
                <input placeholder="Message" type="text" value="${message}" id="input-message">
                </div>
                <div class="submit-item">
                <button class="submit" id="submitButton" type="button">Send</button>
                </div>
            </div>
        </div>`;
        const fetchMock = jest.fn().mockReturnValue(Promise.resolve());
        const messenger = new Messenger(url, author, fetchMock, moment, submitButtonId, messageContainerId);
        messenger.loadMessages = jest.fn(() => {});

        // WHEN
        document.querySelector('#submitButton').click();

        // THEN
        expect(fetchMock).toBeCalledWith(url, {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            method: 'POST',
            body: JSON.stringify({ message: 'hello', author })
        });
       
    });

    it('shoud load messages', () => {
        // GIVEN
        
        document.body.innerHTML = `
        <div id="message-container" class="container"></div>
        <div class="box-input">
            <div class="container flex">
                <div class="input-item">
                <input placeholder="Message" type="text" value="${message}" id="input-message">
                </div>
                <div class="submit-item">
                <button class="submit" id="submitButton" type="button">Send</button>
                </div>
            </div>
        </div>`;
        const fetchMock = jest.fn().mockReturnValue(Promise.resolve({
            json: () => Promise.resolve(JSON.parse(`[
                    {"_id":"5c8c70474e336b001cc6b3e0","message":"Hello","author":"Flávio","timestamp":1552707655289,"token":"4Gnep8UgMjdC"},
                    {"_id":"5c8c70474e336b001cc6b301","message":"Hello, how are you?","author":"Ana","timestamp":1552707655289,"token":"4Gnep8UgMjdC"}
                ]`))
        }
        ));
        const messenger = new Messenger(url, author, fetchMock, moment, submitButtonId, messageContainerId);

        // WHEN
        return messenger.loadMessages().then(() => {
            const messageContainer = document.getElementById('message-container');
            expect(fetchMock).toHaveBeenCalledWith(url);
            expect(messageContainer.children.length).toBe(2);
        })

    });
})
