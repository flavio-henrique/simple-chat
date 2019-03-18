import { moment } from 'moment';

import { Messenger } from './messenger.js';

describe('Messenger', () => {

    it('shoud send message', () => {
        // GIVEN
        const url = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=4Gnep8UgMjdC';
        const submitButtonId = 'submitButton';
        const author = 'Flávio';
        const message = 'hello';
        // Set up our document body
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
        new Messenger(url, author, fetchMock, moment, submitButtonId);

        // WHEN
        document.querySelector('#submitButton').click();

        // THEN
        expect(fetchMock).toBeCalledWith(url, {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            method: 'POST',
            body: JSON.stringify({ message: 'hello', author })
        });
    });
})
