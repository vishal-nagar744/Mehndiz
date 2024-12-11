document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('closeBtn');
  const backdrop = document.getElementById('backdrop');

  // Display the popup and backdrop after 5 seconds
  setTimeout(function () {
    popup.style.display = 'block';
    backdrop.style.display = 'block';
  }, 5000); // 5 seconds delay

  // Close popup when the close button is clicked
  closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
    backdrop.style.display = 'none';
  });
});
