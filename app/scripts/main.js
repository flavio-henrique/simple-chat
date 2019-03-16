const url = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0?token=4Gnep8UgMjdC';

function sendMessage() {
    const input = document.querySelector('#input-message');
    const value = input.value;
    fetch(url, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({ message: value, author: 'Flávio' })
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
                    return `
                        <div class="row">
                            <div>
                                <span>${element.author}</span>
                                <span>${element.message}</span>
                                <span>${element.timestamp}</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }));
}

loadMessages();

