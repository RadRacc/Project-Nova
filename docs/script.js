// script.js

// Product data (moved to script.js for easier management with cart)
const products = [
    {
        id: 'supporter-role',
        name: "Supporter Role",
        price: 5.00,
        image: "icons/supporterpackage.png",
        description: "Gain access to exclusive Discord channels, custom chat color, and a special in-game title to show your support!",
        features: [ // Changed from 'benefits' to 'features' for consistency
            "Exclusive Discord Role",
            "Custom Chat Color (Pink)",
            "In-game 'Supporter' Badge",
            "Access to Supporter-only Discord channels",
            "Access to /size /glow /glowcolor commands",
            "Personal 25% Loot Boost"
        ]
    },
    {
        id: 'supporter-plus-role',
        name: "Supporter+ Role",
        price: 10.00,
        image: "icons/supporter+package.png",
        description: "All benefits of Supporter, plus a unique in-game pet, access to pre-release content, and more!",
        features: [
            "All Supporter benefits",
            "Custom Chat Color (Pink, Purple)",
            "Exclusive In-game Pet (Cosmetic)",
            "Access to Pre-Release Content (3 Days before release)",
            "Monthly exclusive items",
            "Personal 80% Loot Boost"
        ]
    },
    {
        id: 'supporter-plusplus-role',
        name: "Supporter++ Role",
        price: 20.00,
        image: "icons/supporter++package.png",
        description: "The ultimate supporter package, combining all previous benefits with even greater perks and recognition!",
        features: [
            "All Supporter and Supporter+ benefits",
            "Custom Chat Color (Pink, Purple, Gold)",
            "Exclusive Legendary In-game Pet (Cosmetic)",
            "Early Access to All New Content (7 Days before release)",
            "Exclusive Monthly Legendary Items",
            "Personal 150% Loot Boost",
            "Priority Support in Discord"
        ]
    },
    {
        id: 'lootboost-20',
        name: "Global Lootboost +20% (1 Day)",
        price: 5.00,
        image: "icons/globallootboost20.png",
        description: "Activate a server-wide 20% loot boost for 24 hours, benefiting all players online!",
        features: [
            "24-hour global loot boost",
            "Affects all players on the server",
            "Activates immediately upon purchase"
        ]
    },
    {
        id: 'lootboost-80',
        name: "Global Lootboost +80% (3 Days)",
        price: 10.00,
        image: "icons/globallootboost80.png",
        description: "A powerful 80% global loot boost for 3 full days, perfect for community events or grinding sessions!",
        features: [
            "72-hour global loot boost",
            "Significant increase in loot drops",
            "Ideal for weekend events"
        ]
    },
    {
        id: 'lootboost-150',
        name: "Global Lootboost +150% (5 Days)",
        price: 20.00,
        image: "icons/globallootboost150.png",
        description: "The ultimate global loot boost, providing a massive 150% increase in drops for 5 days straight!",
        features: [
            "120-hour global loot boost",
            "Massive impact on farming efficiency",
            "Best value for extended playtime"
        ]
    },
    {
        id: 'small-currency-pack',
        name: "Small Currency Pack",
        price: 5.00,
        image: "icons/smallcurrencypack.png",
        description: "A small pack of in-game currency to help you get started or top up your balance.",
        features: [
            "1000 Gold (in-game currency)",
            "Instantly added to your account"
        ]
    },
    {
        id: 'medium-currency-pack',
        name: "Medium Currency Pack",
        price: 10.00,
        image: "icons/mediumcurrencypack.png",
        description: "A medium pack of in-game currency for more significant purchases or trading.",
        features: [
            "2500 Gold (in-game currency)",
            "Better value than small pack"
        ]
    },
    {
        id: 'large-currency-pack',
        name: "Large Currency Pack",
        price: 25.00,
        image: "icons/largecurrencypack.png",
        description: "A large pack of in-game currency for serious players looking to acquire high-value items.",
        features: [
            "7000 Gold (in-game currency)",
            "Great value for dedicated players"
        ]
    },
    {
        id: 'massive-currency-pack',
        name: "Massive Currency Pack",
        price: 40.00,
        image: "icons/massivecurrencypack.png",
        description: "The biggest currency pack available, providing an enormous amount of gold for all your in-game needs!",
        features: [
            "12000 Gold (in-game currency)",
            "Best possible value",
            "For ultimate in-game wealth"
        ]
    }
];

// --- Store Credit & Cart Logic (Existing) ---
let storeCredit = 0.00;
let cart = [];

function updateStoreCreditDisplay() {
    const storeCreditAmountSpan = document.getElementById('store-credit-amount');
    if (storeCreditAmountSpan) {
        storeCreditAmountSpan.textContent = storeCredit.toFixed(2);
    }
}

function addCredit() {
    storeCredit += 10.00;
    updateStoreCreditDisplay();
    // Simulate saving to local storage (for persistence across sessions)
    localStorage.setItem('storeCredit', storeCredit.toFixed(2));
}

function updateCartCount() {
    const cartItemCountSpan = document.getElementById('cart-item-count');
    if (cartItemCountSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCountSpan.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    const savedCredit = localStorage.getItem('storeCredit');
    if (savedCredit) {
        storeCredit = parseFloat(savedCredit);
        updateStoreCreditDisplay();
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        saveCart();
        console.log(`Added ${product.name} to cart. Current cart:`, cart);
    } else {
        console.error("Product not found:", productId);
    }
}

function renderProducts() {
    const productGridSections = ['supporter-ranks', 'global-boosts', 'currency-packs'];

    productGridSections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            const productGrid = sectionElement.querySelector('.product-grid');
            if (productGrid) {
                // Clear existing products to prevent duplicates on re-render
                productGrid.innerHTML = ''; 

                // Filter products for this section (assuming product IDs follow a pattern or you have a section property)
                // For simplicity, we'll just iterate through all products and check if their ID implies they belong
                const sectionProducts = products.filter(p => {
                    if (sectionId === 'supporter-ranks') return p.id.includes('supporter-role');
                    if (sectionId === 'global-boosts') return p.id.includes('lootboost');
                    if (sectionId === 'currency-packs') return p.id.includes('currency-pack');
                    return false;
                });

                sectionProducts.forEach(product => {
                    const productTile = document.createElement('div');
                    productTile.className = 'product-tile';
                    productTile.innerHTML = `
                        <img src="${product.image}" alt="${product.name} Icon">
                        <h3>${product.name}</h3>
                        <div class="price-info">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                        </div>
                        <div class="button-group">
                            <button class="add-to-cart-button" data-product-id="${product.id}">
                                <img src="icons/cart.png" alt="Add to Cart" class="cart-icon">
                            </button>
                            <button class="view-details-button" data-product-id="${product.id}">View Details</button>
                        </div>
                    `;
                    productGrid.appendChild(productTile);
                });
            }
        }
    });

    // Re-attach event listeners after rendering products
    attachProductButtonListeners();
}

function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    let total = 0;

    if (!cartItemsList || !cartTotalSpan) return;

    cartItemsList.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-cart-message">Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item-button" data-product-id="${item.id}">&times;</button>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });
    }
    cartTotalSpan.textContent = total.toFixed(2);

    // Attach remove button listeners
    document.querySelectorAll('.remove-item-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.currentTarget.dataset.productId;
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); // Remove the item
        saveCart();
        renderCartItems(); // Re-render cart after removal
        updateCartCount(); // Update header count
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        renderCartItems(); // Render items before opening
        cartModal.style.display = 'flex'; // Use flex for centering
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

function checkout() {
    if (cart.length === 0) {
        // Using a custom message box instead of alert()
        showCustomMessageBox("Your cart is empty. Please add items before checking out.", "Empty Cart", "warning");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (storeCredit >= total) {
        storeCredit -= total;
        cart = []; // Clear cart
        saveCart();
        localStorage.setItem('storeCredit', storeCredit.toFixed(2)); // Save updated credit
        updateStoreCreditDisplay();
        updateCartCount();
        closeCartModal();
        showCustomMessageBox("Checkout successful! Your items have been processed.", "Purchase Complete", "success");
    } else {
        // Using a custom message box instead of alert()
        showCustomMessageBox("Insufficient store credit. Please add more credit to complete your purchase.", "Insufficient Funds", "error");
    }
}

// Custom Message Box (instead of alert/confirm)
function showCustomMessageBox(message, title, type = 'info') {
    const messageBoxOverlay = document.createElement('div');
    messageBoxOverlay.className = 'message-box-overlay';
    messageBoxOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.7); display: flex;
        justify-content: center; align-items: center; z-index: 1000;
    `;

    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.style.cssText = `
        background-color: #282828; padding: 25px; border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); max-width: 400px;
        text-align: center; color: #f0f0f0; font-family: 'Open Sans', sans-serif;
        position: relative;
    `;

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#DC3545' : type === 'warning' ? '#FFC107' : '#87CEEB'};
        margin-top: 0; margin-bottom: 15px; font-size: 1.4em;
    `;

    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.style.cssText = `
        margin-bottom: 20px; font-size: 1em;
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.style.cssText = `
        background-color: #FF69B4; color: white; padding: 10px 20px;
        border: none; border-radius: 5px; cursor: pointer;
        font-size: 1em; transition: background-color 0.3s ease;
    `;
    closeButton.onmouseover = () => closeButton.style.backgroundColor = '#1E90FF';
    closeButton.onmouseout = () => closeButton.style.backgroundColor = '#FF69B4';
    closeButton.onclick = () => document.body.removeChild(messageBoxOverlay);

    messageBox.appendChild(titleElement);
    messageBox.appendChild(messageElement);
    messageBox.appendChild(closeButton);
    messageBoxOverlay.appendChild(messageBox);
    document.body.appendChild(messageBoxOverlay);
}


// --- Product Details Modal Logic (NEW) ---
const productDetailsModal = document.getElementById('product-details-modal');
const modalProductImage = document.getElementById('modal-product-image');
const modalProductName = document.getElementById('modal-product-name');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductBenefits = document.getElementById('modal-product-benefits');
const modalProductPrice = document.getElementById('modal-product-price');
const modalAddToCartButton = document.getElementById('modal-add-to-cart-button');
const closeProductModalButton = productDetailsModal ? productDetailsModal.querySelector('.close-button') : null;

let currentProductInModal = null; // To keep track of the product currently displayed in the modal

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product && productDetailsModal && modalProductImage && modalProductName && modalProductDescription && modalProductBenefits && modalProductPrice && modalAddToCartButton) {
        currentProductInModal = product; // Store the current product

        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductName.textContent = product.name;
        modalProductDescription.textContent = product.description;
        modalProductPrice.textContent = product.price.toFixed(2);

        // Clear previous benefits
        modalProductBenefits.innerHTML = '';
        if (product.features && product.features.length > 0) {
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalProductBenefits.appendChild(li);
            });
            modalProductBenefits.style.display = 'block'; // Show list if features exist
        } else {
            modalProductBenefits.style.display = 'none'; // Hide list if no features
        }

        // Update the "Add to Cart" button in the modal
        modalAddToCartButton.onclick = () => {
            if (currentProductInModal) {
                addToCart(currentProductInModal.id);
                closeProductModal(); // Close modal after adding to cart
                showCustomMessageBox(`${currentProductInModal.name} added to cart!`, "Item Added", "success");
            }
        };

        productDetailsModal.style.display = 'flex'; // Show the modal
    } else {
        console.error("Failed to open product modal or product not found:", productId);
    }
}

function closeProductModal() {
    if (productDetailsModal) {
        productDetailsModal.style.display = 'none';
        currentProductInModal = null; // Clear the reference
    }
}

// Function to attach event listeners to product buttons
function attachProductButtonListeners() {
    document.querySelectorAll('.view-details-button').forEach(button => {
        // Remove existing listener to prevent duplicates if renderProducts is called multiple times
        button.removeEventListener('click', handleViewDetailsClick); 
        button.addEventListener('click', handleViewDetailsClick);
    });

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        // Remove existing listener to prevent duplicates
        button.removeEventListener('click', handleAddToCartClick);
        button.addEventListener('click', handleAddToCartClick);
    });
}

function handleViewDetailsClick(event) {
    const productId = event.currentTarget.dataset.productId;
    openProductModal(productId);
}

function handleAddToCartClick(event) {
    const productId = event.currentTarget.dataset.productId;
    addToCart(productId);
    showCustomMessageBox("Item added to cart!", "Item Added", "success");
}


// --- DOM Content Loaded ---
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Load cart and credit on page load

    const isShopPage = document.body.id === 'shop-page';
    const addCreditButton = document.getElementById('add-credit-button');
    const cartButton = document.getElementById('cart-button');
    const checkoutButton = document.getElementById('checkout-button');
    const storeCreditDisplay = document.getElementById('store-credit-display');

    if (isShopPage) {
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'flex'; // Ensure it's visible on shop page
        renderProducts(); // Render products only on shop page
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        if (checkoutButton) checkoutButton.addEventListener('click', checkout);
    } else {
        // Ensure they are hidden on other pages if they somehow appear
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        // The cart button is not in other HTML files, so no need to hide it via JS
    }

    // Common modal close listeners for product details modal
    if (closeProductModalButton) {
        closeProductModalButton.addEventListener('click', closeProductModal);
    }
    if (productDetailsModal) {
        productDetailsModal.addEventListener('click', (event) => {
            // Close if clicking on the overlay itself, not the modal content
            if (event.target === productDetailsModal) {
                closeProductModal();
            }
        });
    }

    // Cart modal specific close listeners
    const closeCartModalButton = document.getElementById('cart-modal') ? document.getElementById('cart-modal').querySelector('.close-button') : null;
    const cartModal = document.getElementById('cart-modal');

    if (closeCartModalButton) {
        closeCartModalButton.addEventListener('click', closeCartModal);
    }
    if (cartModal) {
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    }

    // Initial updates for cart count (visible on all pages if cart button is present)
    updateCartCount();
    updateStoreCreditDisplay(); // Also update store credit display initially on shop page
});
