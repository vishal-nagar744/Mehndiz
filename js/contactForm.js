document
    .getElementById('contactForm')
    .addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const chat_id = '-1002397872339'; // Replace with your chat ID
        const token = '7764380795:AAH3g_HIpcxlyIcxAn2QT44vrlx9RJHXNw4'; // Replace with your bot token

        // Gather form data
        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Get current date and time
        const now = new Date();
        const dateTime = now.toLocaleString();

        // Prepare the message text
        let messageText = `
*🌟Contact Form Details 🌟*

*${dateTime}* 
━━━━━━━━━━━━━━━━━━━━━
- *First Name:* ${firstName}
- *Last Name:* ${lastName}
- *Email:* ${email}
- *Message:* ${message}
`;

        // Send the message
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: messageText,
                parse_mode: 'Markdown',
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Message sent successfully!');
                } else {
                    alert('Error sending message.');
                }
            })
            .catch(error => console.error('Error:', error));
    });