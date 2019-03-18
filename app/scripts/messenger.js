export class Messenger {
    constructor(url, author, fetch, moment, submitButtonId) {
        this.url = url;
        this.author = author;
        this.fetch = fetch;
        this.moment = moment;
        this.submitButtonId = submitButtonId;
        this.submitButtonElement = document.getElementById(this.submitButtonId);
        this.addclickEvent(this.submitButtonElement);
    }

    addclickEvent(submitButtonElement) {
        if (submitButtonElement && submitButtonElement.addEventListener) {
            submitButtonElement.addEventListener('click', () => {
                this.sendMessage();
            }, false);
        }
        else {
            throw new Error(`Element with selector "#${this.submitButtonId}" was not found or not appropriate element type`);
        }
    }

    sendMessage = () => {
        this.submitButtonElement.disabled = true;
        const input = document.querySelector('#input-message');
        const message = input.value;
        this.fetch(this.url, {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            method: 'POST',
            body: JSON.stringify({ message, author: this.author })
        }).then(() => {
            input.value = '';
            this.submitButtonElement.disabled = false;
            this.loadMessages();
        });
    }

    loadMessages() {
        this.fetch(this.url)
            .then((response) => response.json())
            .then((messages) => {
                const messageContainer = document.querySelector('#message-container');
                messageContainer.innerHTML = messages.map(element => {
                    const isMessageOwner = element.author === this.author;
                    return `
                            <div class="row ${isMessageOwner ? 'message-out' : 'message-in'}">
                                <div>
                                    ${isMessageOwner ? `` : `<span class="author">${element.author}</span>`}
                                    <span class="message">${element.message}</span>
                                    <span class="timestamp">${this.moment(new Date(element.timestamp)).format('DD MMMM  YYYY HH:mm')}</span>
                                </div>
                            </div>
                        `;
                }).join('');
                messageContainer.scrollTo(0, messageContainer.scrollHeight);
            });
    }
};
