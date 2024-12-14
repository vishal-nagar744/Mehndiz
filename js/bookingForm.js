document
.getElementById('contactForm')
.addEventListener('submit', function (event) {
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
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const eventType = document.getElementById('eventType').value.trim();
    const eventDate = document.getElementById('eventDate').value.trim();
    const eventTime = document.getElementById('eventTime').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const mehndiType = document.getElementById('mehndiType').value.trim();
    const guestCount = document.getElementById('guestCount').value.trim();
    const designPreference = document.getElementById('designPreference').value.trim();
    const locality = document.getElementById('locality').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const specialRequests = document.getElementById('specialRequests').value.trim();

    // Check required fields
    if (!firstName || !lastName || !email || !phone || !eventType || !eventDate || !mehndiType || !guestCount || !designPreference || !locality || !city || !state || !pincode) {
        notyf.error('Please fill in all required fields.');
        return;
    }

    // Prepare the message text
    let messageText = `
*🌟 New Event Request 🌟*

━━━━━━━━━━━━━━━━━━━━━
*🔹 Basic Information*
- *First Name:* ${firstName}
- *Last Name:* ${lastName}
- *Email:* ${email}
- *Phone:* ${phone}
━━━━━━━━━━━━━━━━━━━━━

*🔹 Event Details*
- *Event Type:* ${eventType}
- *Event Date:* ${eventDate}
- *Event Time:* ${eventTime || 'Not Provided'}
- *Expected Duration:* ${duration || 'Not Provided'} hours
━━━━━━━━━━━━━━━━━━━━━

*🔹 Mehndi Details*
- *Mehndi Type:* ${mehndiType}
- *Number of Guests:* ${guestCount}
- *Design Preference:* ${designPreference}
━━━━━━━━━━━━━━━━━━━━━

*🔹 Location Details*
- *Locality:* ${locality}
- *City:* ${city}
- *State:* ${state}
- *Pincode:* ${pincode}
━━━━━━━━━━━━━━━━━━━━━

*🔹 Additional Preferences*
- *Special Requests:* ${specialRequests || 'None'}
`;

    // Handle file upload
    const fileInput = document.getElementById('upload-design');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Check file size (Telegram's limit is 10 MB)
        if (file.size > 10000000) {
            notyf.error('The selected file is too large. Please choose a file smaller than 10 MB.');
            return;
        }

        // Create a FormData object for sending the photo
        const photoData = new FormData();
        photoData.append('chat_id', chat_id);
        photoData.append('photo', file);
        photoData.append('caption', messageText); // Send message as caption
        photoData.append('parse_mode', 'Markdown'); // Specify parse mode

        // Send the photo with caption
        fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: 'POST',
            body: photoData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // On successful submissions
                    document.getElementById('contactForm').style.display = 'none';
                    document.getElementById('head1').style.display = 'none';
                    document.getElementById('thankYouMessage').style.display = 'block';
                    notyf.success('Message sent successfully!');
                } else {
                    notyf.error('Error sending message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                notyf.error('An error occurred while sending the message.');
            });
    } else {
        // Send the message without a photo
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
                    document.getElementById('head1').style.display = 'none';
                    document.getElementById('thankYouMessage').style.display = 'block';
                    notyf.success('Message sent successfully!');
                } else {
                    notyf.error('Error sending message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                notyf.error('An error occurred while sending the message.');
            });
    }
});