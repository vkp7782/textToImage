document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.trim(); // Added trim() to remove extra spaces
    if (query) {
        searchImages(query);
    } else {
        console.warn('Search query is empty.');
    }
});

async function searchImages(query) {
    const apiKey = 'quoHGof8XFIYi2wujUpwnrSP-WNgC363IPl1vdLdlTs'; // Make sure this key is secure and valid
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayImages(data.results);
        } else {
            console.warn('No images found.');
            document.getElementById('gallery').innerHTML = '<p>No images found.</p>';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Image'; // Default alt text if none is provided
        gallery.appendChild(imgElement);
    });
}
