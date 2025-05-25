// script.js

// Product data (moved to script.js for easier management with cart)
const products = [
    {
        id: 'nova-core-processor',
        name: 'Nova Core Processor',
        price: 1500,
        image: 'icons/nova-core-processor.png', // Corrected path
        description: 'Boost your ship\'s processing power and unlock advanced functionalities. Essential for complex maneuvers and high-speed computations.',
        features: [
            '20% faster processing speed',
            'Enables auto-pilot system',
            'Reduces system lag by 15%',
            'Compatible with all Nova-series ships'
        ]
    },
    {
        id: 'plasma-coil-booster',
        name: 'Plasma Coil Booster',
        price: 2200,
        image: 'icons/plasma-coil-booster.png', // Corrected path
        description: 'Unleash devastating plasma energy for increased weapon damage and propulsion. Feel the surge of power!',
        features: [
            '30% increased weapon damage',
            '10% propulsion efficiency gain',
            'Overcharge capability for burst damage',
            'Requires advanced power coupling'
        ]
    },
    {
        id: 'stealth-field-generator',
        name: 'Stealth Field Generator',
        price: 3000,
        image: 'icons/stealth-field-generator.png', // Corrected path
        description: 'Become invisible to enemy sensors and execute surprise attacks. Perfect for espionage and tactical retreats.',
        features: [
            '95% sensor invisibility',
            'Reduced target lock-on time',
            'Limited duration deployment',
            'High energy consumption'
        ]
    },
    {
        id: 'quantum-repair-drone',
        name: 'Quantum Repair Drone',
        price: 1800,
        image: 'icons/quantum-repair-drone.png', // Corrected path
        description: 'Automated repair unit that swiftly fixes hull damage during combat. A must-have for extended engagements.',
        features: [
            'On-the-fly hull repairs',
            'Autonomous operation',
            'Compact and deployable',
            'Limited repair charges'
        ]
    },
    {
        id: 'warp-drive-accelerator',
        name: 'Warp Drive Accelerator',
        price: 2700,
        image: 'icons/warp-drive-accelerator.png', // Corrected path
        description: 'Significantly decrease warp jump charging time, allowing for quicker escapes and faster travel between star systems.',
        features: [
            '50% faster warp charge',
            'Reduced FTL travel time',
            'Optimized for long-distance jumps',
            'Requires stable power conduit'
        ]
    },
    {
        id: 'holobody-projector',
        name: 'Holobody Projector',
        price: 900,
        image: 'icons/holobody-projector.png', // Corrected path
        description: 'Create realistic holographic decoys to confuse and distract your adversaries. A perfect diversionary tactic.',
        features: [
            'Generates realistic decoys',
            'Customizable appearance',
            'Sound replication included',
            'Effective against AI and players'
        ]
    },
    {
        id: 'orbital-defense-system',
        name: 'Orbital Defense System',
        price: 4500,
        image: 'icons/orbital-defense-system.png', // Corrected path
        description: 'Deploy a powerful defensive array around your base or specific area, providing impenetrable shields and automated turrets.',
        features: [
            'Automated turret defense',
            'Heavy energy shielding',
            'Long-range threat detection',
            'Stationary deployment'
        ]
    },
    {
        id: 'gravity-well-mine',
        name: 'Gravity Well Mine',
        price: 1100,
        image: 'icons/gravity-well-mine.png', // Corrected path
        description: 'Lay concealed mines that generate localized gravity wells, ensnaring enemy ships and making them easy targets.',
        features: [
            'Disables enemy movement',
            'Area of effect damage',
            'Invisible to standard scans',
            'Short deployment cooldown'
        ]
    }
];

// Global variables
let storeCredit = localStorage.getItem('storeCredit') ? parseInt(localStorage.getItem('storeCredit')) : 5000;
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// DOM Elements
const storeCreditDisplay = document.getElementById('store-credit-display');
const storeCreditAmountSpan = document.getElementById('store-credit-amount');
const addCreditButton = document.getElementById('add-credit-button'); // This will be null on non-shop pages

const productGrid = document.getElementById('product-grid');
const productModal = document.getElementById('product-details-modal'); // Changed to match HTML
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartItemCountSpan = document.getElementById('cart-item-count');

const modalProductName = document.getElementById('modal-product-name');
const modalProductImage = document.getElementById('modal-product-image');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductBenefits = document.getElementById('modal-product-benefits'); // Changed to match HTML
const modalProductPrice = document.getElementById('modal-product-price');
const modalAddToCartButton = document.getElementById('modal-add-to-cart-button'); // Changed ID

const closeProductModalButton = document.querySelector('#product-details-modal .close-button'); // Specific to product modal
const closeCartModalButton = document.querySelector('#cart-modal .close-button'); // Specific to cart modal
const cartButton = document.getElementById('cart-button');
const checkoutButton = document.getElementById('checkout-button');


// FUNCTIONS

function updateStoreCreditDisplay() {
    if (storeCreditAmountSpan) {
        storeCreditAmountSpan.textContent = storeCredit.toFixed(2);
    }
    localStorage.setItem('storeCredit', storeCredit);
}

function addCredit() {
    storeCredit += 10; // Original value was 10
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
            const productId = button.dataset.productId;
            addToCart(productId);
        });
    });
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with ID "${productId}" not found.`);
        return;
    }

    modalProductName.textContent = product.name;
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductDescription.textContent = product.description;
    modalProductPrice.textContent = product.price.toFixed(2);

    modalProductBenefits.innerHTML = ''; // Clear previous benefits
    if (product.features) { // Use 'features' as per new product data structure
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

    productModal.classList.add('active');
}

function closeProductModal() {
    productModal.classList.remove('active');
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
        cart.push({ ...productToAdd, quantity: 1 }); // Add new product with quantity 1
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
        if (cartButton) cartButton.style.display = 'flex'; // Show cart button on shop page
        renderProducts(); // Render products only on shop page
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        if (checkoutButton) checkoutButton.addEventListener('click', checkout);
    } else {
        // Ensure they are hidden on other pages if they somehow appear
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none';
    }

    // Common modal close listeners
    if (closeProductModalButton) {
        closeProductModalButton.addEventListener('click', closeProductModal);
    }
    if (productModal) {
        productModal.addEventListener('click', (event) => {
            if (event.target === productModal) {
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
