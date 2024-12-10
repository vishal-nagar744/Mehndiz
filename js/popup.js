
    document.addEventListener('DOMContentLoaded', function () {
      const popup = document.getElementById('popup');
      const closeBtn = document.getElementById('closeBtn');
      const backdrop = document.getElementById('backdrop');

      setTimeout(function () {
        popup.style.display = 'block';
        backdrop.style.display = 'block';
      }, Math.floor(Math.random() * 2000) + 2000);

      closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        backdrop.style.display = 'none';
      });
    });
  