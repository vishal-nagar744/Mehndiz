document
	.getElementById('contactForm')
	.addEventListener('submit', function (event) {
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
- *Event Time:* ${eventTime}
- *Expected Duration:* ${duration} hours
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
- *Special Requests:* ${specialRequests}
`;

		// Handle file upload
		const fileInput = document.getElementById('upload-design');

		if (fileInput.files.length > 0) {
			const file = fileInput.files[0];

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
						alert('Message sent successfully!');
					} else {
						alert('Error sending message.');
					}
				})
				.catch(error => console.error('Error:', error));
		} else {
			alert('Please upload a design.');
		}
	});
