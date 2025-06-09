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


// --- SHOP FUNCTIONS ---

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

        // Update checkout button with Discord username if available
        const discordUser = JSON.parse(localStorage.getItem('discordUser'));
        if (checkoutButton && discordUser && discordUser.username) {
            checkoutButton.setAttribute('data-discord-username', discordUser.username);
        } else if (checkoutButton) {
            checkoutButton.removeAttribute('data-discord-username');
        }
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
    console.log("DEBUG: checkout() function started."); // DEBUG LOG 1

    if (cart.length === 0) {
        console.log("DEBUG: Cart is empty, returning."); // DEBUG LOG 2
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("DEBUG: Cart total calculated:", total.toFixed(2)); // DEBUG LOG 3

    if (storeCredit >= total) {
        storeCredit -= total;
        const purchasedItems = [...cart]; // Copy cart items before clearing
        cart = []; // Clear cart
        updateStoreCreditDisplay(); // Save updated credit
        updateCartCount(); // Update header count and save cart
        closeCartModal();
        alert("Checkout successful! Your items have been processed.");
        console.log("DEBUG: Checkout successful, attempting to send notification."); // DEBUG LOG 4

        // Get Discord username for notification (if logged in)
        const discordUsername = checkoutButton.getAttribute('data-discord-username') || 'Guest User';
        sendPurchaseNotificationToDiscord(discordUsername, purchasedItems);

    } else {
        console.log("DEBUG: Insufficient store credit, returning."); // DEBUG LOG 5
        alert("Insufficient store credit. Please add more credit to complete your purchase.");
    }
}


// --- WIKI LOGIC (Existing from previous request) ---
let allWikiItems = []; // Store all parsed items
let currentCategory = 'all';
let currentSubcategory = null;
let currentSearchTerm = '';

const itemSearchBar = document.getElementById('item-search-bar'); // This is for the script.js wiki logic
const categoryButtonsContainer = document.querySelector('#wiki-content .category-buttons'); // This is for the script.js wiki logic
const subcategoryContainer = document.getElementById('subcategory-container'); // This is for the script.js wiki logic
const subcategoryButtonsContainer = document.querySelector('#subcategory-container .subcategory-buttons'); // This is for the script.js wiki logic
const itemDisplayArea = document.getElementById('item-display-area'); // This is for the script.js wiki logic

// Mapping SlotType to display categories/subcategories (from previous request)
const slotTypeToCategory = {
    '1': { main: 'equipment', sub: 'Swords' }, '2': { main: 'equipment', sub: 'Daggers' },
    '3': { main: 'equipment', sub: 'Bows' }, '8': { main: 'equipment', sub: 'Staffs' },
    '9': { main: 'equipment', sub: 'Wands' }, '33': { main: 'equipment', sub: 'Katanas' },
    '44': { main: 'equipment', sub: 'Wands' }, '45': { main: 'equipment', sub: 'Daggers' },
    '46': { main: 'equipment', sub: 'Heavy Weapons' },
    '17': { main: 'equipment', sub: 'Heavy Armor' }, '18': { main: 'equipment', sub: 'Light Armor' },
    '19': { main: 'equipment', sub: 'Robes' }, '24': { main: 'equipment', sub: 'Heavy Armor' },
    '27': { main: 'equipment', sub: 'Heavy Armor' }, '47': { main: 'equipment', sub: 'Heavy Armor' },
    '48': { main: 'equipment', sub: 'Heavy Armor' }, '49': { main: 'equipment', sub: 'Heavy Armor' },
    '50': { main: 'equipment', sub: 'Heavy Armor' }, '51': { main: 'equipment', sub: 'Light Armor' },
    '52': { main: 'equipment', sub: 'Light Armor' }, '53': { main: 'equipment', sub: 'Light Armor' },
    '54': { main: 'equipment', sub: 'Light Armor' }, '55': { main: 'equipment', sub: 'Robes' },
    '56': { main: 'equipment', sub: 'Robes' }, '57': { main: 'equipment', sub: 'Robes' },
    '58': { main: 'equipment', sub: 'Robes' },
    '20': { main: 'accessories', sub: 'Rings' }, '21': { main: 'consumables', sub: 'Potions' },
    '25': { main: 'abilities', sub: 'Quivers' }, '26': { main: 'abilities', sub: 'Tomes' },
    '28': { main: 'abilities', sub: 'Cloaks' }, '29': { main: 'abilities', sub: 'Sheaths' },
    '30': { main: 'abilities', sub: 'Orbs' }, '31': { main: 'abilities', sub: 'Poisons' },
    '32': { main: 'abilities', sub: 'Scepters' }, '34': { main: 'abilities', sub: 'Skulls' },
    '35': { main: 'abilities', sub: 'Seals' }, '36': { main: 'abilities', sub: 'Spells' },
    '37': { main: 'abilities', sub: 'Stars' }, '38': { main: 'abilities', sub: 'Lutes' },
    '39': { main: 'abilities', sub: 'Traps' }, '40': { main: 'abilities', sub: 'Prisms' },
    '41': { main: 'abilities', sub: 'Effusions' }, '42': { main: 'abilities', sub: 'Scabbards'},
    '43': { main: 'abilities', sub: 'Orbs'},
};


// Function to fetch and parse items.txt (from previous request)
async function loadWikiItems() {
    try {
        const response = await fetch('items.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const objectElements = xmlDoc.querySelectorAll('Object[Item]');
        allWikiItems = Array.from(objectElements).map(objElement => {
            const id = objElement.getAttribute('id');
            const typeHex = objElement.getAttribute('type');
            const description = objElement.querySelector('Description')?.textContent || 'No description.';
            const slotType = objElement.querySelector('SlotType')?.textContent;

            let category = 'misc';
            let subcategoryName = 'Other';

            if (slotType && slotTypeToCategory[slotType]) {
                const mapping = slotTypeToCategory[slotType];
                category = mapping.main || 'misc';
                subcategoryName = mapping.sub || 'Other';
            } else {
                 const itemClass = objElement.querySelector('Class')?.textContent;
                 if (itemClass === 'Equipment') {
                     category = 'equipment';
                     subcategoryName = 'Miscellaneous Equipment';
                 } else if (itemClass === 'Ability') {
                     category = 'abilities';
                     subcategoryName = 'Miscellaneous Abilities';
                 } else if (objElement.querySelector('Usable')) {
                     category = 'consumables';
                     subcategoryName = 'Consumables';
                 }
            }

            const textureFile = objElement.querySelector('Texture File')?.textContent || 'lofiObj5';
            const textureIndex = objElement.querySelector('Texture Index')?.textContent || '0x00';
            const indexDecimal = parseInt(textureIndex, 16);
            const spriteSize = 16;
            const itemImageSrc = `https://placehold.co/${spriteSize}x${spriteSize}/333333/FFFFFF?text=${id.substring(0, Math.min(id.length, 3))}`;

            const projectileElement = objElement.querySelector('Projectile');
            let projectileInfo = null;
            if (projectileElement) {
                projectileInfo = {
                    objectId: projectileElement.querySelector('ObjectId')?.textContent,
                    speed: projectileElement.querySelector('Speed')?.textContent,
                    minDamage: projectileElement.querySelector('MinDamage')?.textContent,
                    maxDamage: projectileElement.querySelector('MaxDamage')?.textContent,
                    lifetimeMS: projectileElement.querySelector('LifetimeMS')?.textContent,
                    size: projectileElement.querySelector('Size')?.textContent,
                    conditionEffect: projectileElement.querySelector('ConditionEffect')?.textContent,
                };
            }
            return {
                id: id, typeHex: typeHex, description: description.replace(/\\n/g, '<br>'),
                slotType: slotType, category: category, subcategory: subcategoryName,
                textureFile: textureFile, textureIndex: textureIndex,
                itemImageSrc: itemImageSrc, projectileInfo: projectileInfo,
            };
        });

        console.log("Loaded Items:", allWikiItems);
        renderWikiItems(currentCategory, currentSubcategory, currentSearchTerm);
        if (itemDisplayArea) { itemDisplayArea.innerHTML = ''; }
    } catch (e) {
        console.error("Failed to load or parse items.txt:", e);
        if (itemDisplayArea) { itemDisplayArea.innerHTML = '<p>Error loading items. Please ensure "items.txt" is in the correct directory and valid XML format, then try again.</p>'; }
    }
}

// Function to render items on the wiki page based on filters and search (from previous request)
function renderWikiItems(filterCategory, filterSubcategory, searchTerm) {
    if (!itemDisplayArea) return;
    itemDisplayArea.innerHTML = '';
    let itemsToRender = allWikiItems;
    if (filterCategory !== 'all') { itemsToRender = itemsToRender.filter(item => item.category === filterCategory); }
    if (filterSubcategory && !filterSubcategory.includes('-all')) { itemsToRender = itemsToRender.filter(item => item.subcategory === filterSubcategory); }
    if (searchTerm !== '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        itemsToRender = itemsToRender.filter(item =>
            item.id.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }
    itemsToRender.sort((a, b) => a.id.localeCompare(b.id));
    if (itemsToRender.length === 0) {
        itemDisplayArea.innerHTML = '<p>No items found matching your criteria. Try adjusting your filters or search term.</p>';
        return;
    }
    itemsToRender.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'wiki-item';
        let projectileDetails = '';
        if (item.projectileInfo) {
            projectileDetails = `
                <div class="projectile-info">
                    <h4>Projectile:</h4>
                    <ul>
                        <li><strong>Object Id:</strong> ${item.projectileInfo.objectId || 'N/A'}</li>
                        <li><strong>Damage:</strong> ${item.projectileInfo.minDamage || 'N/A'} - ${item.projectileInfo.maxDamage || 'N/A'}</li>
                        <li><strong>Speed:</strong> ${item.projectileInfo.speed || 'N/A'}</li>
                        <li><strong>Lifetime:</strong> ${item.projectileInfo.lifetimeMS || 'N/A'}ms</li>
                        ${item.projectileInfo.size ? `<li><strong>Size:</strong> ${item.projectileInfo.size}</li>` : ''}
                        ${item.projectileInfo.conditionEffect ? `<li><strong>Effect:</strong> ${item.projectileInfo.conditionEffect}</li>` : ''}
                    </ul>
                </div>
            `;
        }
        itemElement.innerHTML = `
            <img src="${item.itemImageSrc}" alt="${item.id}" title="${item.id}">
            <div class="item-details">
                <h3>${item.id}</h3>
                <p><strong>Category:</strong> ${item.category === 'equipment' ? 'Equipment' : (item.category === 'abilities' ? 'Abilities' : (item.category === 'consumables' ? 'Consumables' : 'Miscellaneous'))}</p>
                <p><strong>Type:</strong> ${item.subcategory}</p>
                <p>${item.description}</p>
                ${projectileDetails}
            </div>
        `;
        itemDisplayArea.appendChild(itemElement);
    });
}

// Function to update subcategory buttons based on the main category selected (from previous request)
function updateSubcategories(selectedCategory) {
    subcategoryButtonsContainer.innerHTML = '';
    let subcategoriesToShow = [];
    if (selectedCategory === 'equipment') {
        subcategoriesToShow = [
            { name: 'All Equipment', filter: 'equipment-all' }, { name: 'Swords', filter: 'Swords' },
            { name: 'Daggers', filter: 'Daggers' }, { name: 'Bows', filter: 'Bows' },
            { name: 'Staffs', filter: 'Staffs' }, { name: 'Wands', filter: 'Wands' },
            { name: 'Katanas', filter: 'Katanas' }, { name: 'Heavy Weapons', filter: 'Heavy Weapons' },
            { name: 'Heavy Armor', filter: 'Heavy Armor' }, { name: 'Light Armor', filter: 'Light Armor' },
            { name: 'Robes', filter: 'Robes' }, { name: 'Rings', filter: 'Rings' },
        ];
    } else if (selectedCategory === 'abilities') {
        subcategoriesToShow = [
            { name: 'All Abilities', filter: 'abilities-all' }, { name: 'Spells', filter: 'Spells' },
            { name: 'Tomes', filter: 'Tomes' }, { name: 'Seals', filter: 'Seals' },
            { name: 'Shields', filter: 'Shields' }, { name: 'Poisons', filter: 'Poisons' },
            { name: 'Cloaks', filter: 'Cloaks' }, { name: 'Quivers', filter: 'Quivers' },
            { name: 'Skulls', filter: 'Skulls' }, { name: 'Scepters', filter: 'Scepters' },
            { name: 'Stars', filter: 'Stars' }, { name: 'Lutes', filter: 'Lutes' },
            { name: 'Traps', filter: 'Traps' }, { name: 'Prisms', filter: 'Prisms' },
            { name: 'Effusions', filter: 'Effusions'}, { name: 'Scabbards', filter: 'Scabbards'},
            { name: 'Orbs', filter: 'Orbs'},
        ];
    } else if (selectedCategory === 'consumables') {
        subcategoriesToShow = [
            { name: 'All Consumables', filter: 'consumables-all' }, { name: 'Potions', filter: 'Potions' }
        ];
    }
    if (subcategoriesToShow.length > 0) {
        subcategoryContainer.style.display = 'block';
        subcategoriesToShow.forEach(sub => {
            const button = document.createElement('button');
            button.className = 'subcategory-button';
            button.textContent = sub.name;
            button.dataset.subcategory = sub.filter;
            if (currentSubcategory === null && sub.filter.includes('-all')) {
                 button.classList.add('active');
                 currentSubcategory = sub.filter;
            } else if (currentSubcategory === sub.filter) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentSubcategory = sub.filter;
                document.querySelectorAll('.subcategory-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderWikiItems(currentCategory, currentSubcategory, currentSearchTerm);
            });
            subcategoryButtonsContainer.appendChild(button);
        });
    } else {
        subcategoryContainer.style.display = 'none';
        currentSubcategory = null;
    }
    if (selectedCategory === 'all' || subcategoriesToShow.length === 0) {
        subcategoryContainer.style.display = 'none';
        currentSubcategory = null;
    }
}


// --- DISCORD VERIFICATION LOGIC (from previous request, kept for context) ---
// REPLACE WITH YOUR ACTUAL DISCORD CLIENT ID AND REDIRECT URI
const DISCORD_CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID'; // <--- IMPORTANT: Replace this
const DISCORD_REDIRECT_URI = 'http://localhost:8000/index.html'; // <--- IMPORTANT: Replace this
const DISCORD_SCOPES = 'identify';

const discordVerifyButton = document.getElementById('discord-verify-button');
const discordStatusDiv = document.getElementById('discord-status');
const discordUserInfoDiv = document.getElementById('discord-user-info');
const discordAvatarImg = document.getElementById('discord-avatar');
const discordUsernameSpan = document.getElementById('discord-username');
const discordIdSpan = document.getElementById('discord-id');
const discordLogoutButton = document.getElementById('discord-logout-button');

let discordAccessToken = localStorage.getItem('discordAccessToken');

function startDiscordOAuth() {
    const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&scope=${DISCORD_SCOPES}`;
    window.location.href = oauthUrl;
}

async function handleDiscordRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
        discordStatusDiv.textContent = `Discord verification failed: ${error}.`;
        discordStatusDiv.classList.add('error');
        console.error("Discord OAuth error:", error);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
    }

    if (code) {
        discordStatusDiv.textContent = 'Attempting Discord login...';
        discordStatusDiv.classList.remove('error');

        // --- IMPORTANT SECURITY WARNING ---
        // In a production environment, the following token exchange
        // MUST happen on a secure backend server to protect your CLIENT_SECRET.
        // This client-side code is for demonstration purposes only.
        // --- END SECURITY WARNING ---

        const backendTokenExchangeUrl = 'http://127.0.0.1:5000/api/discord-token-exchange'; // Conceptual backend endpoint

        try {
            const response = await fetch(backendTokenExchangeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, redirect_uri: DISCORD_REDIRECT_URI }),
            });

            const data = await response.json();

            if (response.ok && data.access_token) {
                discordAccessToken = data.access_token;
                localStorage.setItem('discordAccessToken', discordAccessToken);
                await fetchDiscordUserInfo(discordAccessToken);
            } else {
                console.error('Simulated token exchange failed, assuming no backend or invalid response:', data);
                discordStatusDiv.textContent = 'Simulated login failed. (Requires backend for actual token exchange).';
                discordStatusDiv.classList.add('error');
                const promptToken = prompt("Paste your Discord Access Token here (for demo):");
                if (promptToken) {
                    discordAccessToken = promptToken;
                    localStorage.setItem('discordAccessToken', discordAccessToken);
                    await fetchDiscordUserInfo(discordAccessToken);
                }
            }
        } catch (e) {
            console.error('Error during simulated Discord token exchange:', e);
            discordStatusDiv.textContent = 'Error during simulated Discord token exchange. (Check console for details).';
            discordStatusDiv.classList.add('error');
            const promptToken = prompt("Paste your Discord Access Token here (for demo):");
            if (promptToken) {
                discordAccessToken = promptToken;
                localStorage.setItem('discordAccessToken', discordAccessToken);
                await fetchDiscordUserInfo(discordAccessToken);
            }
        }
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

async function fetchDiscordUserInfo(token) {
    if (!token) { clearDiscordSession(); return; }
    try {
        const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
            headers: { authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();

        if (userResponse.ok) {
            discordStatusDiv.textContent = 'Discord account verified!';
            discordStatusDiv.classList.remove('error');
            displayDiscordUserInfo(userData);
            localStorage.setItem('discordUser', JSON.stringify(userData));
        } else {
            discordStatusDiv.textContent = 'Failed to fetch Discord user info. Token might be invalid.';
            discordStatusDiv.classList.add('error');
            console.error('Failed to fetch user data:', userData);
            clearDiscordSession();
        }
    } catch (e) {
        discordStatusDiv.textContent = 'Error fetching Discord user info.';
        discordStatusDiv.classList.add('error');
        console.error('Error in fetchDiscordUserInfo:', e);
        clearDiscordSession();
    }
}

function displayDiscordUserInfo(user) {
    if (discordUserInfoDiv && discordAvatarImg && discordUsernameSpan && discordIdSpan) {
        const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
        
        discordAvatarImg.src = avatarUrl;
        discordAvatarImg.alt = `${user.username}'s avatar`;
        discordUsernameSpan.textContent = user.username;
        discordIdSpan.textContent = user.id;
        discordUserInfoDiv.style.display = 'flex';
        if (discordVerifyButton) discordVerifyButton.style.display = 'none';
    }
}

function clearDiscordSession() {
    localStorage.removeItem('discordAccessToken');
    localStorage.removeItem('discordUser');
    discordAccessToken = null;
    if (discordUserInfoDiv) discordUserInfoDiv.style.display = 'none';
    if (discordVerifyButton) discordVerifyButton.style.display = 'block';
    if (discordStatusDiv) {
        discordStatusDiv.textContent = 'Not logged in with Discord.';
        discordStatusDiv.classList.remove('error');
    }
    console.log('Discord session cleared.');
}

// --- Discord Purchase Notification (Sends to Backend) ---
// This function sends purchase data to your backend, which then sends to Discord.
async function sendPurchaseNotificationToDiscord(username, purchasedItems) {
    console.log("DEBUG: sendPurchaseNotificationToDiscord() called."); // DEBUG LOG 6
    const backendNotifyUrl = 'http://127.0.0.1:5000/api/purchase-notify'; // <--- MATCH YOUR BACKEND URL AND ROUTE

    try {
        console.log("DEBUG: Sending data to backend:", { username, items: purchasedItems }); // DEBUG LOG 7
        const response = await fetch(backendNotifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                items: purchasedItems,
            }),
        });

        if (response.ok) {
            console.log('DEBUG: Purchase notification successfully sent to backend (status OK).'); // DEBUG LOG 8
            // You might want to parse response.json() here if your backend sends useful info back
        } else {
            const errorText = await response.text();
            console.error('DEBUG: Failed to send purchase notification to backend:', response.status, errorText); // DEBUG LOG 9
            alert(`Failed to send purchase notification to Discord (Status: ${response.status}). Please contact support if issue persists.`);
        }
    } catch (e) {
        console.error('DEBUG: Error sending purchase notification to backend (network/fetch error):', e); // DEBUG LOG 10
        alert('An error occurred while trying to notify Discord of your purchase. Please check your internet connection or contact support.');
    }
}


// --- DOM Content Loaded Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DEBUG: DOMContentLoaded fired."); // DEBUG LOG 11

    // Load cart and credit on page load
    updateStoreCreditDisplay();
    updateCartCount();

    const isShopPage = document.body.id === 'shop-page';
    const isWikiPage = document.body.id === 'wiki-page';
    const isHomePage = document.body.id === 'home-page';

    console.log("DEBUG: Current page ID:", document.body.id); // DEBUG LOG 12

    if (isShopPage) {
        console.log("DEBUG: On Shop Page logic branch."); // DEBUG LOG 13
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'inline-flex';
        if (cartButton) cartButton.style.display = 'inline-flex';

        renderProducts();
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);

        // **CRITICAL: Ensure checkoutButton exists before adding listener.**
        if (checkoutButton) {
            console.log("DEBUG: Attaching checkout button listener."); // DEBUG LOG 14
            checkoutButton.addEventListener('click', checkout);
        } else {
            console.warn("WARN: Checkout button element not found on shop page."); // DEBUG LOG 15
        }

    } else if (isWikiPage) {
        console.log("DEBUG: On Wiki Page logic branch."); // DEBUG LOG 16
        loadWikiItems();

        const wikiSearchInput = document.getElementById('wiki-search-input');
        if (wikiSearchInput) {
            wikiSearchInput.addEventListener('input', (event) => {
                // The provided wiki.html has its own inline script for simple search/display,
                // so this part of script.js related to itemSearchBar might not be directly linked
                // if wiki.html's search is independent. If you integrate, ensure proper IDs match.
                // For this example, assuming the wiki.html's search is separate.
            });
        }

    } else if (isHomePage) {
        console.log("DEBUG: On Home Page logic branch."); // DEBUG LOG 17
        if (discordVerifyButton) {
            discordVerifyButton.addEventListener('click', startDiscordOAuth);
        }
        if (discordLogoutButton) {
            discordLogoutButton.addEventListener('click', clearDiscordSession);
        }

        handleDiscordRedirect();
        if (discordAccessToken) {
            fetchDiscordUserInfo(discordAccessToken);
        } else {
            clearDiscordSession();
        }

    } else {
        console.log("DEBUG: On other page logic branch, hiding shop elements."); // DEBUG LOG 18
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none'; // Corrected variable name from cartCreditDisplay
    }

    // Common modal close listeners
    if (closeProductModalButton) {
        closeProductModalButton.addEventListener('click', closeProductModal);
    }
    if (productDetailsModal) {
        productDetailsModal.addEventListener('click', (event) => {
            if (event.target === productDetailsModal) { closeProductModal(); }
        });
    }

    const closeCartModalButtonElement = cartModal ? cartModal.querySelector('.close-button') : null;
    if (closeCartModalButtonElement) {
        closeCartModalButtonElement.addEventListener('click', closeCartModal);
    }
    if (cartModal) {
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) { closeCartModal(); }
        });
    }
});
