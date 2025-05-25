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
        description: "The ultimate supporter package! All previous benefits plus custom sprite, and more server perks.",
        features: [
            "All Supporter and Supporter+ benefits",
            "Custom Chat Color (Pink, Purple, Orange)", // Added missing comma
            "Personal Sprite (Add your own asset! [within reason])",
            "Access to Pre-Release Content (7 Days before release)",
            "Direct contact with Developers",
            "Custom Vault Skin",
            "Custom Character Skins (All Classes + future ones)",
            "Personal 150% Loot Boost"
        ]
    },
    {
        id: 'lootboost-20',
        name: "Global Loot Boost +20% (1 Day)",
        price: 5.00,
        image: "icons/globallootboost20.png",
        description: "Activate a server-wide +20% increase in loot drop rates for 1 Day!",
        features: [
            "Global 20% Loot Boost (1 Day)",
            "Stacks with other Loot Boost purchases"
        ]
    },
    {
        id: 'lootboost-80',
        name: "Global Loot Boost +80% (3 Days)",
        price: 10.00,
        image: "icons/globallootboost80.png",
        description: "Activate a significant server-wide +80% increase in loot drop rates for 3 Days!",
        features: [
            "Global 80% Loot Boost (3 Days)",
            "Stacks with other Loot Boost purchases"
        ]
    },
    {
        id: 'lootboost-150',
        name: "Global Loot Boost +150%",
        price: 20.00,
        image: "icons/globallootboost150.png",
        description: "Unleash the ultimate loot frenzy with a massive +150% Global Loot Boost for 5 Days!",
        features: [
            "Global 150% Loot Boost (5 Days)",
            "Stacks with other Loot Boost purchases"
        ]
    },
    {
        id: 'small-currency-pack',
        name: "Small Currency Pack",
        price: 5.00,
        image: "icons/smallcurrencypack.png",
        description: "A small boost to your in-game currency, perfect for minor purchases or getting started.",
        features: [
            "500 Gold",
            "1,000 Fame",
            "20 Shadow Shards"
        ]
    },
    {
        id: 'medium-currency-pack',
        name: "Medium Currency Pack",
        price: 10.00,
        image: "icons/mediumcurrencypack.png",
        description: "A medium currency pack for more substantial in-game needs. Get more for your money!",
        features: [
            "1,000 Gold + 250 Bonus",
            "2,500 Fame + 500 Bonus",
            "50 Shadow Shards + 20 Bonus"
        ]
    },
    {
        id: 'large-currency-pack',
        name: "Large Currency Pack",
        price: 25.00,
        image: "icons/largecurrencypack.png",
        description: "A generous currency pack for serious players, enabling significant upgrades and purchases.",
        features: [
            "2,500 Gold + 1,000 Bonus",
            "5,000 Fame + 1,000 Bonus",
            "100 Shadow Shards + 50 Bonus"
        ]
    },
    {
        id: 'massive-currency-pack',
        name: "Massive Currency Pack",
        price: 40.00,
        image: "icons/massivecurrencypack.png",
        description: "The ultimate currency pack! Maximize your in-game wealth with a huge injection of gold.",
        features: [
            "6,000 Gold + 1,500 Bonus",
            "10,000 Fame + 2,500 Bonus",
            "150 Shadow Shards + 50 Bonus"
        ]
    }
];

// Global variables
let storeCredit = parseFloat(localStorage.getItem('storeCredit')) || 0; // Ensure float for consistency
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const storeCreditDisplay = document.getElementById('store-credit-display');
const storeCreditAmountSpan = document.getElementById('store-credit-amount');
const addCreditButton = document.getElementById('add-credit-button'); // This will be null on non-shop pages

const productGrid = document.getElementById('product-grid');
const productDetailsModal = document.getElementById('product-details-modal'); // Corrected ID to match HTML
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartItemCountSpan = document.getElementById('cart-item-count');

const modalProductName = document.getElementById('modal-product-name');
const modalProductImage = document.getElementById('modal-product-image');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductBenefits = document.getElementById('modal-product-benefits'); // Corrected to match HTML
const modalProductPrice = document.getElementById('modal-product-price');
const modalAddToCartButton = document.getElementById('modal-add-to-cart-button'); // Corrected ID

const closeProductModalButton = document.querySelector('#product-details-modal .close-button'); // Specific to product modal
const closeCartModalButton = document.querySelector('#cart-modal .close-button'); // Specific to cart modal
const cartButton = document.getElementById('cart-button');
const checkoutButton = document.getElementById('checkout-button');


// FUNCTIONS

function updateStoreCreditDisplay() {
    if (storeCreditAmountSpan) { // Ensure element exists (only on shop page)
        storeCreditAmountSpan.textContent = storeCredit.toFixed(2);
    }
    localStorage.setItem('storeCredit', storeCredit.toFixed(2)); // Save as fixed decimal
}

function addCredit() {
    storeCredit += 10;
    updateStoreCreditDisplay();
    console.log('Successfully added $10 to your store credit! Current credit: $' + storeCredit.toFixed(2));
    // In a real app, you'd show a custom message box here instead of alert.
}

function renderProducts() {
    if (!productGrid) return; // Only run if on shop page

    productGrid.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productTile = document.createElement('div');
        productTile.classList.add('product-tile');
        productTile.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
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

    // Attach event listeners to product buttons
    document.querySelectorAll('.view-details-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            openProductModal(productId);
        });
    });

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId; // Get ID from button's data attribute
            addToCart(productId);
        });
    });
}

function openProductModal(productId) {
    // FIX: Use .find() to get product from array
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with ID "${productId}" not found in products data.`);
        return;
    }

    modalProductName.textContent = product.name;
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductDescription.textContent = product.description;
    modalProductPrice.textContent = product.price.toFixed(2);

    modalProductBenefits.innerHTML = ''; // Clear previous benefits
    if (product.features) { // Use 'features' as per product data structure
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalProductBenefits.appendChild(li);
        });
    }

    // Set data-product-id for the "Add to Cart" button in modal
    if (modalAddToCartButton) {
        modalAddToCartButton.dataset.productId = productId;
    }

    productDetailsModal.classList.add('active');
}

function closeProductModal() {
    productDetailsModal.classList.remove('active');
}


// NEW CART FUNCTIONS

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0); // Sum quantities
    if (cartItemCountSpan) {
        cartItemCountSpan.textContent = count;
        if (count > 0) {
            cartItemCountSpan.style.display = 'inline-block'; // Show badge
        } else {
            cartItemCountSpan.style.display = 'none'; // Hide badge
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
}

function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (!productToAdd) {
        console.error('Product not found:', productId);
        return;
    }

    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity = (existingCartItem.quantity || 1) + 1; // Increment quantity
    } else {
        // Add new product with quantity 1, ensuring all necessary properties are copied
        cart.push({
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            image: productToAdd.image, // Include image for cart display
            quantity: 1
        });
    }

    updateCartCount();
    console.log(`${productToAdd.name} added to cart! Current cart:`, cart);
    // In a real app, you'd show a custom message box here instead of alert.
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--; // Decrement quantity
            console.log(`Decremented quantity for ${item.name}. New quantity: ${item.quantity}`);
        } else {
            cart.splice(itemIndex, 1); // Remove item if quantity is 1
            console.log(`${item.name} removed from cart.`);
        }
        updateCartCount();
        renderCart(); // Re-render cart to show changes
    }
}

function renderCart() {
    if (!cartItemsContainer) return; // Ensure element exists

    cartItemsContainer.innerHTML = ''; // Clear current cart display
    let totalCost = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #bbb;">Your cart is empty.</p>';
        cartTotalSpan.textContent = '0.00';
        if (checkoutButton) checkoutButton.disabled = true; // Disable checkout button
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity || 1}</p>
                </div>
                <span class="item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                <button class="remove-item-button" data-product-id="${item.id}">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalCost += item.price * (item.quantity || 1);
        });
        cartTotalSpan.textContent = totalCost.toFixed(2);
        if (checkoutButton) checkoutButton.disabled = false; // Enable checkout button
    }

    // Attach event listeners to remove buttons (after they are rendered)
    document.querySelectorAll('.remove-item-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            removeFromCart(productId);
        });
    });
}

function openCartModal() {
    renderCart(); // Render cart items before opening
    if (cartModal) {
        cartModal.classList.add('active');
    }
}

function closeCartModal() {
    if (cartModal) {
        cartModal.classList.remove('active');
    }
}

function checkout() {
    const totalCost = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    if (cart.length === 0) {
        console.log('Your cart is empty. Add some items before checking out!');
        // In a real app, you'd show a custom message box here.
        return;
    }

    if (storeCredit >= totalCost) {
        storeCredit -= totalCost;
        cart = []; // Clear the cart
        updateStoreCreditDisplay();
        updateCartCount();
        closeCartModal();
        console.log(`Purchase successful! You spent $${totalCost.toFixed(2)}. Your remaining credit: $${storeCredit.toFixed(2)}.`);
        // In a real app, you'd show a custom success message box here.
    } else {
        console.log(`Insufficient credit! You need $${(totalCost - storeCredit).toFixed(2)} more to complete this purchase.`);
        // In a real app, you'd show a custom error message box here.
    }
}


// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav .button');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        // Adjust for potential leading/trailing slashes
        const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
        const normalizedLinkPath = linkPath.endsWith('/') ? linkPath.slice(0, -1) : linkPath;

        if (normalizedCurrentPath === normalizedLinkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure other links are not active
        }
    });

    // --- Smooth Scrolling (if needed for anchor links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Conditional display of store credit and cart button
    if (document.body.id === 'shop-page') {
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'flex';
        // The cart button is always in shop.html now, so we just ensure it's flex
        if (cartButton) cartButton.style.display = 'flex';
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
            if (event.target === productDetailsModal) {
                closeProductModal();
            }
        });
    }

    // Cart modal specific close listeners
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
