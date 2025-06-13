document.addEventListener('DOMContentLoaded', function() {
    // Floating elements in background
    const bgAnimation = document.getElementById('bgAnimation');
    const elements = ['balloon', 'star', 'cake'];
    const colors = ['#FF69B4', '#FFD700', '#00BFFF', '#FF6347', '#7CFC00'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        const elementType = elements[Math.floor(Math.random() * elements.length)];
        element.className = `floating ${elementType}`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${15 + Math.random() * 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        bgAnimation.appendChild(element);
    }
    
    // Countdown Timer
    const targetDate = new Date("2025-09-28T00:00:00");
    
    function updateCountdown() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
        document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        // Add flip animation
        if (seconds % 10 === 0) {
            document.querySelectorAll('.countdown-number').forEach(el => {
                el.classList.add('flip');
                setTimeout(() => {
                    el.classList.remove('flip');
                }, 500);
            });
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Button actions
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surprisePopup = document.getElementById('surprisePopup');
    
    surpriseBtn.addEventListener('click', function() {
        surprisePopup.classList.add('active');
        createSparkles();
    });

    document.querySelector('.type1.button').addEventListener('click', function() {
window.location.href = 'puzzle.html';
});
    
    document.querySelector('.popup-close').addEventListener('click', function() {
        surprisePopup.classList.remove('active');
    });
    
    // Theme changer
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            changeTheme(theme);
        });
    });

    // Photo Gallery Navigation - Updated with real photo paths
document.addEventListener('DOMContentLoaded', function() {
    // Array of photo URLs - Replace these with your actual photo paths
    const photos = [
        "photo.jpg",
        "photos/gh-1.png", 
        "photos/birthday3.jpg",
        "photos/birthday4.jpg",
        "photos/birthday5.jpg"
        // Add more photo paths as needed
    ];
    
    let currentPhotoIndex = 0;
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Initialize gallery
    function initGallery() {
        // Clear existing content
        galleryContainer.innerHTML = '';
        
        if (photos.length > 0) {
            // Create photo elements for each photo
            photos.forEach((photo, index) => {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                photoItem.style.display = index === currentPhotoIndex ? 'flex' : 'none';
                
                const img = document.createElement('img');
                img.src = photo;
                img.alt = `Birthday Photo ${index + 1}`;
                img.onerror = function() {
                    // Fallback if image doesn't load
                    this.parentElement.innerHTML = '<div class="photo-placeholder">Photo not found</div>';
                };
                
                photoItem.appendChild(img);
                galleryContainer.appendChild(photoItem);
            });
            
            // Show navigation arrows only if there are multiple photos
            const prevBtn = document.querySelector('.gallery-prev');
            const nextBtn = document.querySelector('.gallery-next');
            
            if (photos.length > 1) {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            } else {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
            
        } else {
            // Show placeholder if no photos
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-item';
            placeholder.innerHTML = '<div class="photo-placeholder">Add your favorite photo here</div>';
            galleryContainer.appendChild(placeholder);
        }
    }
    
    // Navigate to previous photo
    document.querySelector('.gallery-prev').addEventListener('click', function() {
        if (photos.length > 1) {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            updateGalleryDisplay();
        }
    });
    
    // Navigate to next photo
    document.querySelector('.gallery-next').addEventListener('click', function() {
        if (photos.length > 1) {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            updateGalleryDisplay();
        }
    });
    
    // Update which photo is displayed with smooth transition
    function updateGalleryDisplay() {
        const photoItems = document.querySelectorAll('.photo-item');
        
        photoItems.forEach((item, index) => {
            if (index === currentPhotoIndex) {
                item.style.display = 'flex';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update photo counter if you want to show it
        updatePhotoCounter();
    }
    
    // Optional: Add photo counter
    function updatePhotoCounter() {
        let counterElement = document.querySelector('.photo-counter');
        if (!counterElement && photos.length > 1) {
            counterElement = document.createElement('div');
            counterElement.className = 'photo-counter';
            document.querySelector('.photo-gallery').appendChild(counterElement);
        }
        
        if (counterElement && photos.length > 1) {
            counterElement.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
        }
    }
    
    // Initialize the gallery on page load
    initGallery();
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.gallery-prev').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.gallery-next').click();
        }
    });
});

// Optional: Add drag/swipe functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // Touch events for mobile
    galleryContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    galleryContainer.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    galleryContainer.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swiped left - show next photo
                document.querySelector('.gallery-next').click();
            } else {
                // Swiped right - show previous photo
                document.querySelector('.gallery-prev').click();
            }
        }
    });
    
    // Mouse events for desktop
    galleryContainer.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        isDragging = true;
        galleryContainer.style.cursor = 'grabbing';
    });
    
    galleryContainer.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        currentX = e.clientX;
    });
    
    galleryContainer.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        isDragging = false;
        galleryContainer.style.cursor = 'grab';
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                document.querySelector('.gallery-next').click();
            } else {
                document.querySelector('.gallery-prev').click();
            }
        }
    });
    
    galleryContainer.addEventListener('mouseleave', function() {
        isDragging = false;
        galleryContainer.style.cursor = 'grab';
    });
});  
    function changeTheme(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'pastel':
                bgAnimation.style.background = 'linear-gradient(135deg, #FFDFD3, #FEC8D8)';
                break;
            case 'ocean':
                bgAnimation.style.background = 'linear-gradient(135deg, #2193b0, #6dd5ed)';
                break;
            case 'sunset':
                bgAnimation.style.background = 'linear-gradient(135deg, #FF512F, #F09819)';
                break;
            default:
                bgAnimation.style.background = 'linear-gradient(135deg, #00FFFF, #E6E6FA)';
        }
        
        // Show notification
        showNotification('Theme Changed', `Switched to ${theme} theme`, '🎨');
    }
    
    // Create sparkle effect
    function createSparkles() {
        const content = document.querySelector('.popup-content');
        
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            content.appendChild(sparkle);
            
            // Animate sparkle
            setTimeout(() => {
                sparkle.style.opacity = '1';
                setTimeout(() => {
                    sparkle.style.opacity = '0';
                    setTimeout(() => {
                        sparkle.remove();
                    }, 300);
                }, 700);
            }, Math.random() * 1000);
        }
    }
    
    // Show notification
    function showNotification(title, message, emoji = '🎉') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span class="notification-emoji">${emoji}</span>
            <div>
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <span class="notification-close">&times;</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        });
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // Birthday wishes generator
    const wishes = [
        "May your birthday be as special as you are!",
        "Wishing you a day filled with happiness and a year filled with joy.",
        "On your special day, I wish you good luck, joy, happiness, and all that your heart desires.",
        "Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!",
        "May the joy that you have spread in the past come back to you on this day. Happy birthday!",
        "Sending you smiles for every moment of your special day. Have a wonderful time and a very happy birthday!",
        "Hope your special day brings you all that your heart desires! Here's wishing you a day full of pleasant surprises!",
        "On your birthday may your spirit be enriched in light, love, and hope for a prosperous year ahead.",
        "Wishing you a beautiful day with good health and happiness forever. Happy birthday!",
        "The day is all yours — have fun!"
    ];
    
    document.getElementById('generateWishBtn').addEventListener('click', function() {
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        const wishDisplay = document.getElementById('wishDisplay');
        
        wishDisplay.style.opacity = 0;
        
        setTimeout(() => {
            wishDisplay.textContent = randomWish;
            wishDisplay.style.opacity = 1;
        }, 300);
        
        showNotification('New Wish', 'Generated a special birthday wish for you!', '✨');
    });
    
    // Messages section
    const messageForm = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messagesContainer');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (message) {
            addMessage('You', message);
            messageInput.value = '';
            
            showNotification('Message Added', 'Your birthday message has been added', '💌');
        }
    });
    
    function addMessage(author, text) {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        messageItem.innerHTML = `
            <div class="message-author">${author}</div>
            <div class="message-text">${text}</div>
        `;
        
        messagesContainer.appendChild(messageItem);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    const timelineContainer = document.querySelector('.timeline-container');
    
    timelineEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        
        eventElement.innerHTML = `
            <div class="timeline-date">${event.date}</div>
            <div class="timeline-description">${event.description}</div>
        `;
        
        timelineContainer.appendChild(eventElement);
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Timeline hover preview positioning and mobile adjustments
        const timelineEvents = document.querySelectorAll('.timeline-event');
        
        timelineEvents.forEach((event) => {
            const preview = event.querySelector('.timeline-hover-preview');
            
            // Initial position adjustment
            adjustPreviewPosition(event, preview);
            
            // When hovering an event, ensure the preview is visible on screen
            event.addEventListener('mouseenter', () => {
                adjustPreviewPosition(event, preview);
            });
        });
        
        // Function to adjust preview position
        function adjustPreviewPosition(event, preview) {
            const rect = event.getBoundingClientRect();
            const previewRect = preview.getBoundingClientRect();
            
            // Center the preview vertically relative to the event
            const topOffset = (rect.height - previewRect.height) / 2;
            preview.style.top = `${topOffset}px`;
            
            // For mobile viewport
            if (window.innerWidth <= 768) {
                // Check if the preview would go off-screen to the right
                const rightEdge = rect.right + 230;
                if (rightEdge > window.innerWidth) {
                    // Place preview on the left instead
                    preview.style.right = 'calc(100% + 15px)';
                    preview.style.left = 'auto';
                } else {
                    // Keep preview on the right
                    preview.style.left = 'calc(100% + 15px)';
                    preview.style.right = 'auto';
                }
            }
        }
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            timelineEvents.forEach((event) => {
                const preview = event.querySelector('.timeline-hover-preview');
                adjustPreviewPosition(event, preview);
            });
        });
        
        // Optional: Add smooth scroll for timeline section
        document.querySelector('.timeline-title').addEventListener('click', () => {
            document.querySelector('.timeline-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        // Optional: Make images lazy load
        const previewImages = document.querySelectorAll('.preview-image img');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            previewImages.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
    });
});
// Bucket List Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bucketListForm = document.getElementById('bucketListForm');
    const bucketListInput = document.getElementById('bucketListInput');
    const bucketListItems = document.getElementById('bucketListItems');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    
    // Load stored bucket list items if any
    loadBucketListItems();
    
    // Add new bucket list item
    bucketListForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const wishText = bucketListInput.value.trim();
        if (wishText) {
            addBucketListItem(wishText);
            bucketListInput.value = '';
        }
    });
    
    // Add suggestion to bucket list
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            addBucketListItem(suggestion);
        });
    });
    
    // Function to add new bucket list item
    function addBucketListItem(text) {
        const item = document.createElement('div');
        item.className = 'bucket-list-item';
        
        const itemText = document.createElement('div');
        itemText.className = 'bucket-list-text';
        itemText.textContent = text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-bucket-item';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', function() {
            item.remove();
            saveBucketListItems();
        });
        
        item.appendChild(itemText);
        item.appendChild(deleteBtn);
        bucketListItems.appendChild(item);
        
        saveBucketListItems();
    }
    
    // Save bucket list items to localStorage
    function saveBucketListItems() {
        const items = [];
        document.querySelectorAll('.bucket-list-text').forEach(item => {
            items.push(item.textContent);
        });
        localStorage.setItem('bucketListItems', JSON.stringify(items));
    }
    
    // Load bucket list items from localStorage
    function loadBucketListItems() {
        const items = JSON.parse(localStorage.getItem('bucketListItems')) || [];
        items.forEach(item => {
            addBucketListItem(item);
        });
    }
});
// Add this code to your wish.js file or create a new file bucketList.js

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const bucketListForm = document.getElementById('bucketListForm');
    const bucketListInput = document.getElementById('bucketListInput');
    const bucketListItems = document.getElementById('bucketListItems');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    // Load existing bucket list items when page loads
    loadBucketListItems();
    
    // Event listener for form submission
    bucketListForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addBucketListItem(bucketListInput.value);
    });
    
    // Event listeners for suggestion buttons
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            bucketListInput.value = suggestion;
            addBucketListItem(suggestion);
        });
    });
    
    // Function to load existing bucket list items from the database
    function loadBucketListItems() {
        fetch('get_bucket_items.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Clear existing items
                    bucketListItems.innerHTML = '';
                    
                    // Display each item
                    data.items.forEach(item => {
                        displayBucketListItem(item.id, item.item_text, item.completed);
                    });
                } else {
                    console.error('Error loading bucket list items:', data.message);
                }
            })
            .catch(error => {
                console.error('Error loading bucket list items:', error);
            });
    }
    
    // Function to add a new bucket list item
    function addBucketListItem(itemText) {
        if (!itemText.trim()) return;
        
        // Create form data for the request
        const formData = new FormData();
        formData.append('item_text', itemText);
        
        // Send request to add item to database
        fetch('add_bucket_item.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display the new item
                displayBucketListItem(data.id, data.item_text, false);
                
                // Clear the input field
                bucketListInput.value = '';
            } else {
                console.error('Error adding bucket list item:', data.message);
            }
        })
        .catch(error => {
            console.error('Error adding bucket list item:', error);
        });
    }
    
    // Function to display a bucket list item in the UI
    function displayBucketListItem(id, text, completed) {
        // Create item element
        const itemElement = document.createElement('div');
        itemElement.className = 'bucket-list-item';
        itemElement.dataset.id = id;
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'bucket-item-checkbox';
        checkbox.checked = completed;
        
        // Add event listener to checkbox
        checkbox.addEventListener('change', function() {
            toggleBucketItemCompletion(id, this.checked);
        });
        
        // Create text element
        const textElement = document.createElement('span');
        textElement.className = 'bucket-item-text';
        textElement.textContent = text;
        
        // Apply completed style if needed
        if (completed) {
            textElement.classList.add('completed');
        }
        
        // Append elements to item
        itemElement.appendChild(checkbox);
        itemElement.appendChild(textElement);
        
        // Add item to the list
        bucketListItems.appendChild(itemElement);
    }
    
    // Function to toggle item completion status
    function toggleBucketItemCompletion(itemId, completed) {
        // Create form data for the request
        const formData = new FormData();
        formData.append('item_id', itemId);
        formData.append('completed', completed ? 1 : 0);
        
        // Send request to update item in database
        fetch('toggle_bucket_item.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update UI to reflect completion status
                const itemElement = document.querySelector(`.bucket-list-item[data-id="${itemId}"] .bucket-item-text`);
                if (itemElement) {
                    if (completed) {
                        itemElement.classList.add('completed');
                    } else {
                        itemElement.classList.remove('completed');
                    }
                }
            } else {
                console.error('Error updating bucket list item:', data.message);
            }
        })
        .catch(error => {
            console.error('Error updating bucket list item:', error);
        });
    }
});