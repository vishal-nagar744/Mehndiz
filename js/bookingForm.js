// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const name = document.getElementById('name').value;
//     const message = document.getElementById('message').value;

//     const chat_id = '1027678669'; // Replace with your chat ID
//     const token = '7764380795:AAH3g_HIpcxlyIcxAn2QT44vrlx9RJHXNw4'; // Replace with your bot token

//     const text = `Name: ${name}\nMessage: ${message}`;

//     const url = `https://api.telegram.org/bot${token}/sendMessage`;

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             chat_id: chat_id,
//             text: text
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.ok) {
//             alert('Message sent successfully!');
//         } else {
//             alert('Error sending message.');
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });















document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const chat_id = '1027678669'; // Replace with your chat ID
    const token = '7764380795:AAH3g_HIpcxlyIcxAn2QT44vrlx9RJHXNw4'; // Replace with your bot token

    // Gather form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const duration = document.getElementById('duration').value;
    const mehndiType = document.getElementById('mehndiType').value;
    const guestCount = document.getElementById('guestCount').value;
    const designPreference = document.getElementById('designPreference').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const specialRequests = document.getElementById('specialRequests').value;

    // Prepare the message text
    let messageText = `**New Event Request**\n\n` +

        `-----------------------------------------------------------------------------\n` +
        `Basic Information\n\n` +
        `First Name:-- ${firstName}\n` +
        `Last Name:-- ${lastName}\n` +
        `Email:-- ${email}\n` +
        `Phone:-- ${phone}\n` +
        `-----------------------------------------------------------------------------\n` +

        `Event Details\n\n` +
        `Event Type:-- ${eventType}\n` +
        `Event Date:-- ${eventDate}\n` +
        `Event Time:-- ${eventTime}\n` +
        `Expected Duration:-- ${duration} hours \n` +
        `-----------------------------------------------------------------------------\n` +

        `Mehndi Details\n\n` +
        `Mehndi Type:-- ${mehndiType}\n` +
        `Number of Guests:-- ${guestCount}\n` +
        `Design Preference:-- ${designPreference}\n` +
        `-----------------------------------------------------------------------------\n` +

        `Location Details\n\n` +
        `Locality:-- ${locality}\n` +
        `City:-- ${city}\n` +
        `State:-- ${state}\n` +
        `Pincode:-- ${pincode}\n` +
        `-----------------------------------------------------------------------------\n` +

        `Additional Preferences\n\n` +
        `Special Requests:-- ${specialRequests}\n`;

    // Handle file upload
    const fileInput = document.getElementById('upload-design');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Create a FormData object for sending the photo
        const photoData = new FormData();
        photoData.append('chat_id', chat_id);
        photoData.append('photo', file);
        photoData.append('caption', messageText); // Send message as caption

        // Send the photo with caption
        fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: 'POST',
            body: photoData
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

    } else {
        alert("Please upload a design.");
    }
});
