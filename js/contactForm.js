let isSubmitting = false; // Declare the flag outside the event listener

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Disable the submit button to prevent multiple submissions
    const submitButton = document.querySelector('.btn-primary-hover-outline');
    submitButton.disabled = true;

    // Prevent multiple submissions
    if (isSubmitting) {
        return;
    }
    isSubmitting = true;

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

    // Check required fields
    if (!firstName || !lastName || !email || !phone || !message) {
        notyf.error('Please fill in all required fields.');
        submitButton.disabled = false; // Re-enable the submit button
        isSubmitting = false; // Reset submission flag
        return;
    }

    // Prepare the message text
    let messageText = `
*🌟 New Contact Request 🌟*

━━━━━━━━━━━━━━━━━━━━━
*🔹 Basic Information*
- *First Name:* ${firstName}
- *Last Name:* ${lastName}
- *Email:* ${email}
- *Phone:* ${phone}
━━━━━━━━━━━━━━━━━━━━━

*🔹 Message*
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
                // On successful submission
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('thankYouMessage').style.display = 'block';
                notyf.success('Message sent successfully!');
            } else {
                notyf.error('Error sending message. Please try again.');
                submitButton.disabled = false; // Re-enable the submit button
                isSubmitting = false; // Reset submission flag
            }
        })
        .catch(error => {
            console.error('Error:', error);
            notyf.error('An error occurred while sending the message.');
            submitButton.disabled = false; // Re-enable the submit button
            isSubmitting = false; // Reset submission flag
        });
});