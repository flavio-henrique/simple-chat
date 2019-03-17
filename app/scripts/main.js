
const url = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=4Gnep8UgMjdC';
const author = 'Flávio';
function sendMessage() {
    const input = document.querySelector('#input-message');
    const message = input.value;
    fetch(url, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({ message, author })
    }).then(() => {
        input.value = '';
        loadMessages();
    });


}

function loadMessages() {
    fetch(url)
        .then((response) => response.json()
            .then((messages) => {
                const messageContainer = document.querySelector('#message-container');
                messageContainer.innerHTML = messages.map(element => {
                    const isMessageOwner = element.author === author;
                    return `
                        <div class="row ${isMessageOwner ? 'message-out' : 'message-in'}">
                            <div>
                                ${isMessageOwner ? `` : `<span class="author">${element.author}</span>`}
                                <span class="message">${element.message}</span>
                                <span class="timestamp">${moment(new Date(element.timestamp)).format('d MMMM  YYYY HH:mm')}</span>
                            </div>
                        </div>
                    `;
                }).join('');
                messageContainer.scrollTo(0, messageContainer.scrollHeight);
            }));
}

loadMessages();

