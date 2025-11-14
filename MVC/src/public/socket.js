$(document).ready(() => {
    const socket = io();
    const chatMessages = $('#chatMessages')
    const chatForm = $('#chatForm');
    const chatText = $('#chatText');

    chatForm.submit( function (evt) {
        evt.preventDefault()
        const sendText = chatText.val()
        socket.emit('chat message', sendText)
        chatText.val('')
        return false;
    })

    socket.on('chat message', function(msg) {
        const newMessage = `<h5>${msg.user}: <small class="text-body-secondary">${msg.message}</small></h5>`
        chatMessages.append(newMessage)
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
    })
})