$(document).ready(() => {
    const socket = io();
    const chatMessages = $('#chatMessages')
    const chatForm = $('#chatForm');
    const chatText = $('#chatText');

    chatForm.submit( function (evt) {
        evt.preventDefault()
        const sendText = chatText.val()
        alert(sendText)
    })
})