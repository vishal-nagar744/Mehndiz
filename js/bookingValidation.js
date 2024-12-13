//image upload validation --
document.getElementById('upload-design').addEventListener('change', function () {
    const fileLabel = document.getElementById('file-label');
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    const file = this.files[0];

    if (file) {
        if (allowedFormats.includes(file.type)) {
            fileLabel.textContent = file.name; // Display the file name
            fileLabel.classList.add('uploaded'); // Add the "uploaded" class to change style
            fileLabel.classList.remove('error'); // Remove error class if previously added
        } else {
            fileLabel.textContent = 'Invalid file format. Please upload an image (JPG, PNG, GIF).';
            fileLabel.classList.add('error'); // Add error class for styling
            fileLabel.classList.remove('uploaded');
            this.value = ''; // Clear the input value
        }
    } else {
        fileLabel.textContent = 'Upload Your Preferred Design';
        fileLabel.classList.remove('uploaded'); // Remove the "uploaded" class if no file
        fileLabel.classList.remove('error');
    }
});
