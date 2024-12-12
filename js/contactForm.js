document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const chat_id = '-1002397872339'; // Replace with your chat ID
    const token = '7764380795:AAH3g_HIpcxlyIcxAn2QT44vrlx9RJHXNw4'; // Replace with your bot token

    // Gather form data
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation: Check if any field is empty
    if (!firstName || !lastName || !email || !message) {
        alert('Please fill in all fields before submitting the form.');
        return; // Stop further execution
    }

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
            // Hide the form and show the Thank You message
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('thankYouMessage').style.display = 'block';
        } else {
            alert('Error sending message.');
        }
    })
    .catch(error => console.error('Error:', error));
});
