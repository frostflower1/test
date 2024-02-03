document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('ordinary.html')) {
        // Jika di halaman guestbook.html, tampilkan pesan dari parameter URL
        loadMessagesFromURL();
    } else {
        // Jika di halaman index.html, tampilkan pesan dari localStorage
        loadMessages();
    }
});

function addMessage() {
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    if (name && message) {
        var newMessage = name + ": " + message;

        if (window.location.pathname.includes('ordinary.html')) {
            // Jika di halaman guestbook.html, tambahkan pesan ke parameter URL
            addMessageToURL(newMessage);

            // Menampilkan pesan dan notifikasi pada halaman ini
            loadMessagesFromURL();
            showNotification("Message added successfully!");
        } else {
            // Jika di halaman index.html, tambahkan pesan ke localStorage
            saveMessage(newMessage);
            clearForm();

            // Mengarahkan pengguna ke halaman guestbook.html setelah mengirimkan pesan
            window.location.href = 'ordinary.html?notification=Message+added+successfully!';
        }
    } else {
        showNotification("Please fill in both name and message fields.", true);
    }

    return false; // Menghentikan pengiriman formulir
}

function addMessageToURL(message) {
    var currentURL = new URL(window.location.href);
    var messages = currentURL.searchParams.getAll('message');
    messages.push(message);
    currentURL.searchParams.set('message', messages);
    window.history.replaceState({}, document.title, currentURL.href);
}

function loadMessagesFromURL() {
    var currentURL = new URL(window.location.href);
    var messages = currentURL.searchParams.getAll('message');
    var messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach(function (message) {
        var listItem = document.createElement('li');
        listItem.textContent = message;
        messageList.appendChild(listItem);
    });
}

function saveMessage(message) {
    var messages = getStoredMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function getStoredMessages() {
    var messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : [];
}

function loadMessages() {
    var messages = getStoredMessages();
    var messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach(function (message) {
        var listItem = document.createElement('li');
        listItem.textContent = message;
        messageList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
}

function showNotification(message, isError = false) {
    alert(message);
    
}
