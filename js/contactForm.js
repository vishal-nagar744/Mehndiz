document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Configure Notyf
    const notyf = new Notyf({
        duration: 5000, // Set duration to 5 seconds
        position: {
            x: 'center', // Position notifications on the right
            y: 'top', // Position notifications at the top
        },
        types: [
            {
                type: 'success',
                background: '#3b5d50',
                icon: {
                    className: 'fas fa-check-circle', // Use FontAwesome for success icon
                    tagName: 'i',
                    text: '', // Text is not needed for icons
                },
            },
            {
                type: 'error',
                background: 'red',
                icon: {
                    className: 'fas fa-exclamation-circle', // Use FontAwesome for error icon
                    tagName: 'i',
                    text: '', // Text is not needed for icons
                },
            },
        ],
    });

    const chat_id = '-1002397872339'; // Replace with your chat ID
    const token = '7764380795:AAH3g_HIpcxlyIcxAn2QT44vrlx9RJHXNw4'; // Replace with your bot token

    // Gather form data
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation: Check if any field is empty
    if (!firstName || !lastName || !email || !phone || !message) {
        notyf.error('Please fill in all fields before submitting the form.');
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
- *Phone No:* ${phone}
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
            notyf.success('Message sent successfully!');
        } else {
            notyf.error('Error sending message.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        notyf.error('An error occurred while sending the message.');
    });
});