const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const baseImage = new Image();
baseImage.src = 'assets/base-image.png'; // Path to your base cat image

let selectedHat = null;
let selectedBackground = null;
let selectedClothing = null;
let selectedWing = null;

// Ensure the base image is drawn on the canvas
    function drawMeme() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    
        // Draw background first (at the back)
        if (selectedBackground) ctx.drawImage(selectedBackground, 0, 0, canvas.width, canvas.height);
    
        // Draw base image on top of the background
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height); 
    
        // Draw clothing on top of the base image
        if (selectedClothing) ctx.drawImage(selectedClothing, 100, 250, 300, 150); // Adjust position and size of clothing
    
        // Draw wings on top of base image
        if (selectedWing) ctx.drawImage(selectedWing, 200, 200, 300, 300); // Adjust position and size of wings
    
        // Draw hat on top of the base image and wings
        if (selectedHat) ctx.drawImage(selectedHat, 200, 200, 300, 300); // Adjust position and size of the hat
    }

// Set the asset based on the category
function setAsset(type, assetPath) {
    const image = new Image();
    image.src = assetPath;

    // Wait for the image to load before updating the canvas
    image.onload = () => {
        switch (type) {
            case 'hat':
                selectedHat = image;
                break;
            case 'background':
                selectedBackground = image;
                break;
            case 'clothing':
                selectedClothing = image;
                break;
            case 'wing':
                selectedWing = image;
                break;
        }
        drawMeme(); // Redraw the canvas every time an asset is set
    }
}

// Clear selected asset of a specific category
function clearAsset(type) {
    switch (type) {
        case 'hat':
            selectedHat = null;
            break;
        case 'background':
            selectedBackground = null;
            break;
        case 'clothing':
            selectedClothing = null;
            break;
        case 'wing':
            selectedWing = null;
            break;
    }
    drawMeme(); // Redraw without the cleared asset
}

// Clear all assets and reset to only base image
function clearAll() {
    selectedHat = null;
    selectedBackground = null;
    selectedClothing = null;
    selectedWing = null;
    drawMeme();
}

// Ensure the base image is drawn when it loads
baseImage.onload = drawMeme;

// Download the current meme as a PNG file
function downloadMeme() {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
}

