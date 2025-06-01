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
            "Custom Chat Color (Pink, Purple, Orange)",
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

// Global variables (load from localStorage or default)
let storeCredit = parseFloat(localStorage.getItem('storeCredit')) || 0;
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// DOM Elements (get references once)
const storeCreditDisplay = document.getElementById('store-credit-display');
const storeCreditAmountSpan = document.getElementById('store-credit-amount');
const addCreditButton = document.getElementById('add-credit-button');

const productDetailsModal = document.getElementById('product-details-modal');
const modalProductImage = document.getElementById('modal-product-image');
const modalProductName = document.getElementById('modal-product-name');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductBenefits = document.getElementById('modal-product-benefits');
const modalProductPrice = document.getElementById('modal-product-price');
const modalAddToCartButton = document.getElementById('modal-add-to-cart-button');
const closeProductModalButton = productDetailsModal ? productDetailsModal.querySelector('.close-button') : null;

const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartButton = document.getElementById('cart-button');
const checkoutButton = document.getElementById('checkout-button');
const cartItemCountSpan = document.getElementById('cart-item-count'); // For the count badge in header

// --- FUNCTIONS ---

// Updates the displayed store credit and saves to local storage
function updateStoreCreditDisplay() {
    if (storeCreditAmountSpan) {
        storeCreditAmountSpan.textContent = storeCredit.toFixed(2);
    }
    localStorage.setItem('storeCredit', storeCredit.toFixed(2));
}

// Adds $10 to store credit
function addCredit() {
    storeCredit += 10.00;
    updateStoreCreditDisplay();
    alert('Successfully added $10 to your store credit! Current credit: $' + storeCredit.toFixed(2));
}

// Renders product tiles on the shop page
function renderProducts() {
    const productGridSections = ['supporter-ranks', 'global-boosts', 'currency-packs'];

    productGridSections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            const productGrid = sectionElement.querySelector('.product-grid');
            if (productGrid) {
                productGrid.innerHTML = ''; // Clear existing products

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

    // Attach event listeners after rendering products
    attachProductButtonListeners();
}

// Attaches event listeners to "View Details" and "Add to Cart" buttons
function attachProductButtonListeners() {
    document.querySelectorAll('.view-details-button').forEach(button => {
        // Remove existing listener to prevent duplicates on re-render
        button.removeEventListener('click', handleViewDetailsClick);
        button.addEventListener('click', handleViewDetailsClick);
    });

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        // Remove existing listener to prevent duplicates
        button.removeEventListener('click', handleAddToCartClick);
        button.addEventListener('click', handleAddToCartClick);
    });
}

// Handler for "View Details" button click
function handleViewDetailsClick(event) {
    const productId = event.currentTarget.dataset.productId;
    openProductModal(productId);
}

// Handler for "Add to Cart" button click (from product tile)
function handleAddToCartClick(event) {
    const productId = event.currentTarget.dataset.productId;
    addToCart(productId);
    alert("Item added to cart!");
}

// Opens the product details modal and populates it
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product && productDetailsModal && modalProductImage && modalProductName && modalProductDescription && modalProductBenefits && modalProductPrice && modalAddToCartButton) {
        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductName.textContent = product.name;
        modalProductDescription.textContent = product.description;
        modalProductPrice.textContent = product.price.toFixed(2);

        modalProductBenefits.innerHTML = ''; // Clear previous benefits
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

        // Update the "Add to Cart" button in the modal to add the current product
        modalAddToCartButton.onclick = () => {
            addToCart(product.id);
            closeProductModal(); // Close modal after adding to cart
            alert(`${product.name} added to cart!`);
        };

        productDetailsModal.style.display = 'flex'; // Show the modal
    } else {
        console.error("Failed to open product modal or product not found:", productId);
    }
}

// Closes the product details modal
function closeProductModal() {
    if (productDetailsModal) {
        productDetailsModal.style.display = 'none';
    }
}

// Updates the cart item count in the header and saves cart to local storage
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartItemCountSpan) {
        cartItemCountSpan.textContent = totalItems;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Adds a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Add new item with necessary properties for cart display
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        updateCartCount();
        console.log(`Added ${product.name} to cart. Current cart:`, cart);
    } else {
        console.error("Product not found:", productId);
    }
}

// Removes an item (or decrements quantity) from the cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(itemIndex, 1); // Remove completely if quantity is 1
        }
        updateCartCount();
        renderCartItems(); // Re-render cart modal content
        console.log(`Removed/decremented ${item.name}. Current cart:`, cart);
    }
}

// Renders the items inside the cart modal
function renderCartItems() {
    if (!cartItemsList || !cartTotalSpan) return;

    cartItemsList.innerHTML = ''; // Clear existing items
    let total = 0;

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

// Opens the shopping cart modal
function openCartModal() {
    if (cartModal) {
        renderCartItems(); // Render items before opening
        cartModal.style.display = 'flex'; // Use flex for centering
    }
}

// Closes the shopping cart modal
function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Handles the checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (storeCredit >= total) {
        storeCredit -= total;
        cart = []; // Clear cart
        updateStoreCreditDisplay(); // Save updated credit
        updateCartCount(); // Update header count and save cart
        closeCartModal();
        alert("Checkout successful! Your items have been processed.");
    } else {
        alert("Insufficient store credit. Please add more credit to complete your purchase.");
    }
}

// --- DOM Content Loaded Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Load cart and credit on page load
    updateStoreCreditDisplay(); // This also loads from localStorage
    updateCartCount(); // This also loads from localStorage

    const isShopPage = document.body.id === 'shop-page';

    if (isShopPage) {
        // Ensure store credit display is visible on shop page
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'inline-flex'; // Use inline-flex as per original CSS
        // Ensure cart button is visible on shop page
        if (cartButton) cartButton.style.display = 'inline-flex'; // Use inline-flex as per original CSS

        renderProducts(); // Render products only on shop page
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        if (checkoutButton) checkoutButton.addEventListener('click', checkout);
    } else {
        // Hide shop-specific elements on other pages
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none'; // Hide cart button if not on shop page
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
    const closeCartModalButton = cartModal ? cartModal.querySelector('.close-button') : null; // Re-get for safety
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
});
