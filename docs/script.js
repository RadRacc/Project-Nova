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

// --- Store Credit & Cart Logic ---
let storeCredit = parseFloat(localStorage.getItem('storeCredit')) || 0;
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// --- Wiki Item Data (keep this part as it is used by wiki.html) ---
let wikiItemsData = []; // To store parsed data from items.txt
let currentViewMode = 'spacious'; // Default view mode for wiki items
let expandedItemId = null; // Stores the ID of the currently expanded item in compact view

// Marketplace Server Status (Hardcoded for now, can be dynamic with a backend)
let marketplaceStatus = 'Online'; // 'Online' or 'Down'


// Mapping SlotType numbers to readable names for display (for Wiki)
const slotTypeMap = {
    "1": "Sword",
    "2": "Dagger",
    "3": "Bow",
    "8": "Staff",
    "9": "Wand",
    "17": "Heavy Armor", // Plate Armor
    "18": "Light Armor", // Leather Armor
    "19": "Robe",
    "20": "Ring",
    "23": "Katana",
    "24": "Helmet", // Helm (Warrior)
    "25": "Quiver",
    "26": "Tome",
    "27": "Shield",
    "28": "Cloak",
    "29": "Trap",
    "30": "Orb",
    "31": "Poison",
    "32": "Scepter",
    "34": "Skull",
    "35": "Seal",
    "36": "Spell",
    "40": "Prism",
    "41": "Shuriken",
    "42": "Lute",
    "43": "Wakizashi",
    "44": "Sheath",
    "45": "Mace"
};

// Mapping Stat IDs to readable names for ActivateOnEquip (for Wiki)
const statIdMap = {
    "21": "Max HP",
    "22": "Max MP",
    "20": "Attack",
    "26": "Defense",
    "27": "Speed",
    "28": "Dexterity",
    "29": "Vitality",
    "30": "Wisdom"
};


// --- DOM Elements (get references once) ---
// Global elements (used across multiple pages)
const storeCreditDisplay = document.getElementById('store-credit-display');
const storeCreditAmountSpan = document.getElementById('store-credit-amount');
const addCreditButton = document.getElementById('add-credit-button');
const cartButton = document.getElementById('cart-button');
const cartItemCountSpan = document.getElementById('cart-item-count');

// Modals (used by shop page)
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
const checkoutButton = document.getElementById('checkout-button');
const closeCartModalButton = cartModal ? cartModal.querySelector('.close-button') : null;

// Wiki specific elements
const wikiSearchInput = document.getElementById('wiki-search-input');
const itemDisplayArea = document.getElementById('item-display-area');
const itemTypeLinks = document.querySelectorAll('#item-type-list a');
const wikiViewToggle = document.getElementById('wiki-view-toggle'); // Wiki view toggle

// How to Play specific elements (for server status)
const serverStatusText = document.getElementById('server-status-text');
const serverStatusCircle = document.getElementById('server-status-circle');

// Shop specific new elements
const usernamePromptModal = document.getElementById('username-prompt-modal');
const ingameUsernameInput = document.getElementById('ingame-username-input');
const confirmPurchaseButton = document.getElementById('confirm-purchase-button');
const cancelPurchaseButton = document.getElementById('cancel-purchase-button');

const marketplaceStatusText = document.getElementById('marketplace-status-text');
const marketplaceStatusCircle = document.getElementById('marketplace-status-circle');


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
    showCustomMessageBox('Successfully added $10 to your store credit! Current credit: $' + storeCredit.toFixed(2), "Credit Added", "success");
}

// Renders product tiles on the shop page
function renderProducts() {
    const productGridSections = ['supporter-ranks', 'global-boosts', 'currency-packs'];

    productGridSections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId); // This gets the SECTION element by ID
        if (sectionElement) {
            const productGrid = sectionElement.querySelector('.product-grid'); // This finds the .product-grid DIV inside the section
            if (productGrid) {
                productGrid.innerHTML = ''; // Clear existing products

                const sectionProducts = products.filter(p => {
                    if (sectionId === 'supporter-ranks') {
                        return p.id.startsWith('supporter-');
                    }
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
        button.removeEventListener('click', handleViewDetailsClick);
        button.addEventListener('click', handleViewDetailsClick);
    });

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
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
    showCustomMessageBox("Item added to cart!", "Item Added", "success");
}

// Opens the product details modal and populates it
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product && productDetailsModal && modalProductImage && modalProductName && modalProductDescription && modalProductBenefits && modalProductPrice && modalAddToCartButton) {
        modalAddToCartButton.onclick = () => {
            addToCart(product.id);
            closeProductModal();
            showCustomMessageBox(`${product.name} added to cart!`, "Item Added", "success");
        };

        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductName.textContent = product.name;
        modalProductDescription.textContent = product.description;
        modalProductPrice.textContent = product.price.toFixed(2);

        modalProductBenefits.innerHTML = '';
        if (product.features && product.features.length > 0) {
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalProductBenefits.appendChild(li);
            });
            modalProductBenefits.style.display = 'block';
        } else {
            modalProductBenefits.style.display = 'none';
        }

        productDetailsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Failed to open product modal or product not found:", productId);
    }
}

// Closes the product details modal
function closeProductModal() {
    if (productDetailsModal) {
        productDetailsModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Updates the cart item count in the header and saves to local storage
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
            cart.splice(itemIndex, 1);
        }
        updateCartCount();
        renderCartItems();
        console.log(`Removed/decremented ${item.name}. Current cart:`, cart);
    }
}

// Renders the items inside the cart modal
function renderCartItems() {
    if (!cartItemsList || !cartTotalSpan) return;

    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-cart-message">Your cart is empty.</li>';
    }
    else {
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
        renderCartItems();
        cartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Closes the shopping cart modal
function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// New: Prompts for in-game username before checkout
function promptForUsernameAndCheckout() {
    if (cart.length === 0) {
        showCustomMessageBox("Your cart is empty. Please add items before checking out.", "Empty Cart", "warning");
        return;
    }

    if (usernamePromptModal && ingameUsernameInput) {
        ingameUsernameInput.value = ''; // Clear previous input
        usernamePromptModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Event listener for confirm button (remove old one first to prevent duplicates)
        confirmPurchaseButton.removeEventListener('click', handleConfirmPurchase);
        confirmPurchaseButton.addEventListener('click', handleConfirmPurchase);

        // Event listener for cancel button (remove old one first to prevent duplicates)
        cancelPurchaseButton.removeEventListener('click', closeUsernamePromptModal);
        cancelPurchaseButton.addEventListener('click', closeUsernamePromptModal);
    }
}

// New: Handles the confirmation of purchase after username input
async function handleConfirmPurchase() {
    const inGameUsername = ingameUsernameInput.value.trim();

    if (!inGameUsername) {
        showCustomMessageBox("Please enter your in-game username to proceed with the purchase.", "Username Required", "warning");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (storeCredit >= total) {
        storeCredit -= total;
        updateStoreCreditDisplay(); // Update credit display immediately

        closeUsernamePromptModal(); // Close the username prompt modal
        closeCartModal();           // Close the cart modal

        // Generate a unique order ID
        const orderId = crypto.randomUUID(); // Uses Web Crypto API for unique ID

        // Send order details to the backend
        await sendOrderToBackend(inGameUsername, cart, total, orderId);

        cart = []; // Clear cart after successful processing attempt
        updateCartCount(); // Update header count and save cart

        showCustomMessageBox(
            `Purchase successful! Your order #${orderId} has been placed for delivery to **${inGameUsername}**.` +
            `<br>If Store Services are currently **Down**, please DM someone with a screenshot of this message for verification.`,
            "Purchase Complete",
            "success"
        );
    } else {
        closeUsernamePromptModal(); // Close the username prompt modal
        showCustomMessageBox("Insufficient store credit. Please add more credit to complete your purchase.", "Insufficient Funds", "error");
    }
}

// New: Sends order data to the backend (your app.py)
async function sendOrderToBackend(username, cartItems, total, orderId) {
    const payload = {
        username: username,
        items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total,
        orderId: orderId,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch('/purchase', { // Assuming /purchase endpoint on the same origin
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('Order sent to backend successfully:', result);

    } catch (error) {
        console.error('Error sending order to backend:', error);
        // Inform user that there was an issue with backend communication
        // But the credit has already been deducted and the order ID is shown in messagebox
        showCustomMessageBox(
            `There was an issue contacting the delivery server.` +
            `<br>Your credit has been deducted. Please use order #${orderId} and screenshot this for manual verification if needed.`,
            "Delivery Error",
            "error"
        );
    }
}


// New: Closes the username prompt modal
function closeUsernamePromptModal() {
    if (usernamePromptModal) {
        usernamePromptModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scroll
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
    messageElement.innerHTML = message; // Use innerHTML to allow <br> tags
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


// --- WIKI SPECIFIC FUNCTIONS --- (Keeping these for completeness, relevant to wiki.html)

// Function to fetch and parse items.txt
async function fetchItemsData() {
    try {
        const response = await fetch('items.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        const items = [];
        const objectElements = xmlDoc.querySelectorAll('Object[Item="true"]');

        objectElements.forEach(obj => {
            const item = {};
            item.type = obj.getAttribute('type');
            item.id = obj.getAttribute('id');
            item.DisplayId = obj.querySelector('DisplayId')?.textContent;
            item.Class = obj.querySelector('Class')?.textContent;
            item.SlotType = obj.querySelector('SlotType')?.textContent;
            item.Description = obj.querySelector('Description')?.textContent;
            item.Tag = obj.querySelector('Tag')?.textContent || 'N/A'; // Parse the new Tag

            // Collect common equipment/ability properties
            const damageMin = obj.querySelector('MinDamage')?.textContent;
            const damageMax = obj.querySelector('MaxDamage')?.textContent;
            if (damageMin && damageMax) {
                item.Damage = `${damageMin}-${damageMax}`;
            }

            item.RateOfFire = obj.querySelector('RateOfFire')?.textContent;
            item.MPCost = obj.querySelector('MPCost')?.textContent;
            item.Defense = obj.querySelector('Defense')?.textContent;
            item.Range = obj.querySelector('Range')?.textContent; // Range for weapons
            item.ArcGap = obj.querySelector('ArcGap')?.textContent; // Arc Gap for projectiles
            item.FameBonus = obj.querySelector('FameBonus')?.textContent; // Fame Bonus
            item.Soulbound = obj.querySelector('Soulbound') && obj.querySelector('Soulbound').textContent.toLowerCase() === 'true'; // Soulbound (boolean)
            item.UsableBy = obj.querySelector('UsableBy')?.textContent; // UsableBy Classes

            // Handle ActivateOnEquip for stat boosts (modified to handle multiple)
            const activateOnEquipElements = obj.querySelectorAll('ActivateOnEquip');
            if (activateOnEquipElements.length > 0) {
                item.StatBoosts = []; // Initialize as an array to hold multiple boosts
                activateOnEquipElements.forEach(aoe => {
                    const statId = aoe.getAttribute('stat');
                    const statValue = aoe.textContent;
                    const statName = statIdMap[statId] || `Stat ${statId}`; // Use the mapping
                    item.StatBoosts.push(`${statName}: +${statValue}`);
                });
            }

            // Handle Projectile Specific Properties (nesting within <Projectile> tag)
            const projectileElement = obj.querySelector('Projectile');
            if (projectileElement) {
                item.NumProjectiles = projectileElement.querySelector('NumProjectiles')?.textContent || '1'; // Default to 1 if not specified
                item.ShotsBoomerang = projectileElement.querySelector('Boomerang') ? true : false;
                item.ShotsMultiHit = projectileElement.querySelector('MultiHit') ? true : false;
                item.ShotsPassesCover = projectileElement.querySelector('PassesCover') ? true : false;
                item.IgnoresDefense = projectileElement.querySelector('PierceDefense') ? true : false;
            } else {
                item.NumProjectiles = obj.querySelector('NumProjectiles')?.textContent;
            }


            // Handle Set Bonuses
            const setElement = obj.querySelector('Set');
            if (setElement) {
                item.Set = {
                    Name: setElement.getAttribute('name'),
                    Bonuses: [],
                    FullBonus: setElement.querySelector('FullSetBonus')?.textContent
                };
                setElement.querySelectorAll('SetBonus').forEach(bonusElem => {
                    item.Set.Bonuses.push({
                        pieces: bonusElem.getAttribute('pieces'),
                        description: bonusElem.textContent
                    });
                });
            }

            items.push(item);
        });
        wikiItemsData = items;
        console.log("Parsed Wiki Items:", wikiItemsData);

    } catch (error) {
        console.error("Error fetching or parsing items.txt:", error);
        if (itemDisplayArea) {
            itemDisplayArea.innerHTML = '<p style="text-align: center; color: #DC3545;">Failed to load wiki items. Please ensure items.txt is correctly formatted.</p>';
        }
    }
}

// Function to display items in the wiki based on current view mode
function displayItems(filterSlotType = null, searchQuery = '') {
    if (!itemDisplayArea) return;

    itemDisplayArea.innerHTML = '';

    let filteredItems = wikiItemsData;

    if (filterSlotType) {
        filteredItems = filteredItems.filter(item => item.SlotType === filterSlotType);
    }

    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.DisplayId?.toLowerCase().includes(lowerCaseQuery) ||
            item.Description?.toLowerCase().includes(lowerCaseQuery) ||
            item.id?.toLowerCase().includes(lowerCaseQuery) ||
            (item.Class && item.Class.toLowerCase().includes(lowerCaseQuery)) ||
            (slotTypeMap[item.SlotType] && slotTypeMap[item.SlotType].toLowerCase().includes(lowerCaseQuery)) ||
            (item.Tag && item.Tag.toLowerCase().includes(lowerCaseQuery)) ||
            (item.Set && item.Set.Name && item.Set.Name.toLowerCase().includes(lowerCaseQuery)) ||
            (item.UsableBy && item.UsableBy.toLowerCase().includes(lowerCaseQuery))
        );
    }

    if (filteredItems.length === 0) {
        itemDisplayArea.innerHTML = '<p style="text-align: center; color: #bbb;">No items found matching your criteria.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const itemCard = document.createElement('div');
        const cardDisplayMode = (currentViewMode === 'compact' && item.id !== expandedItemId) ? 'compact' : 'spacious';
        itemCard.className = `item-card ${cardDisplayMode}-view`;

        itemCard.addEventListener('click', () => {
            if (currentViewMode === 'compact') {
                if (expandedItemId === item.id) {
                    expandedItemId = null;
                } else {
                    expandedItemId = item.id;
                }
                displayItems(filterSlotType, searchQuery);
            }
        });


        const itemImageName = item.id.replace(/[^a-zA-Z0-9]/g, '');
        const imagePath = `icons/items/${itemImageName}.png`;
        const fallbackImageUrl = `https://placehold.co/100x100/FF69B4/FFFFFF?text=${item.DisplayId ? item.DisplayId.split(' ')[0] : 'ITEM'}`;

        let itemContentHtml = '';

        if (cardDisplayMode === 'compact') {
            let soulboundIndicator = item.Soulbound ? '<span class="item-soulbound-indicator">SB</span>' : '';
            itemContentHtml = `
                <img src="${imagePath}" alt="${item.DisplayId || item.id} Icon" onerror="this.onerror=null;this.src='${fallbackImageUrl}';">
                <h3>${item.DisplayId || item.id}</h3>
                <div class="item-tag ${item.Tag.toLowerCase()}">${item.Tag}</div>
                ${soulboundIndicator}
            `;
        } else {
            let itemPropertiesHtml = '';

            itemPropertiesHtml += `<p><strong>Type:</strong> <span>${slotTypeMap[item.SlotType] || 'N/A'}</span></p>`;
            if (item.UsableBy) {
                itemPropertiesHtml += `<p><strong>Usable By:</strong> <span>${item.UsableBy}</span></p>`;
            }
            if (item.Damage) {
                itemPropertiesHtml += `<p><strong>Damage:</strong> <span>${item.Damage}</span></p>`;
            }
            if (item.Soulbound) {
                itemPropertiesHtml += `<p><strong>Soulbound?:</strong> <span>Yes</span></p>`;
            } else {
                itemPropertiesHtml += `<p><strong>Soulbound?:</strong> <span>No</span></p>`;
            }
            if (item.Description) {
                itemPropertiesHtml += `<p><strong>Description:</strong> ${item.Description}</p>`;
            }

            const hasProjectileProperties = item.NumProjectiles || item.ShotsBoomerang || item.ShotsMultiHit || item.ShotsPassesCover || item.IgnoresDefense;
            if (hasProjectileProperties || item.Range || item.ArcGap || item.RateOfFire || item.FameBonus) {
                 itemPropertiesHtml += `<hr class="item-properties-separator">`;
            }

            if (item.NumProjectiles) {
                itemPropertiesHtml += `<p><strong>Shots:</strong> <span>${item.NumProjectiles}</span></p>`;
            }
            if (item.Range) {
                itemPropertiesHtml += `<p><strong>Range:</strong> <span>${item.Range}</span></p>`;
            }
            if (item.NumProjectiles) {
                itemPropertiesHtml += `<p><strong>Shots boomerang:</strong> <span>${item.ShotsBoomerang ? 'Yes' : 'No'}</span></p>`;
                itemPropertiesHtml += `<p><strong>Shots hit multiple targets:</strong> <span>${item.ShotsMultiHit ? 'Yes' : 'No'}</span></p>`;
                itemPropertiesHtml += `<p><strong>Shots pass through obstacles:</strong> <span>${item.ShotsPassesCover ? 'Yes' : 'No'}</span></p>`;
                itemPropertiesHtml += `<p><strong>Ignores defense of target:</strong> <span>${item.IgnoresDefense ? 'Yes' : 'No'}</span></p>`;
            }
            if (item.ArcGap) {
                itemPropertiesHtml += `<p><strong>Arc Gap:</b> <span>${item.ArcGap}°</span></p>`;
            }
            if (item.RateOfFire) {
                itemPropertiesHtml += `<p><strong>Rate of Fire:</strong> <span>${item.RateOfFire}</span></p>`;
            }
            if (item.FameBonus) {
                itemPropertiesHtml += `<p><strong>Fame Bonus:</strong> <span>${item.FameBonus}%</span></p>`;
            }

            if (item.StatBoosts && item.StatBoosts.length > 0) {
                 if (itemPropertiesHtml.includes('<hr class="item-properties-separator">') && hasProjectileProperties) {
                 } else if (itemPropertiesHtml.trim() !== '') {
                      itemPropertiesHtml += `<hr class="item-properties-separator">`;
                 }
                itemPropertiesHtml += `<p><strong>Stat Boosts:</strong> <span>${item.StatBoosts.join(', ')}</span></p>`;
            }

            let setBonusHtml = '';
            if (item.Set) {
                itemPropertiesHtml += `<hr class="item-properties-separator">`;
                setBonusHtml += `
                    <div class="item-set-bonus">
                        <h4>Set: ${item.Set.Name}</h4>
                        <ul>
                `;
                item.Set.Bonuses.forEach(bonus => {
                    setBonusHtml += `<li><strong>${bonus.pieces} Pieces:</strong> <span>${bonus.description}</span></li>`;
                });
                setBonusHtml += `
                            <li><strong>Full Set Bonus:</strong> <span>${item.Set.FullBonus}</span></li>
                        </ul>
                    </div>
                `;
            }

            itemContentHtml = `
                <img src="${imagePath}" alt="${item.DisplayId || item.id} Icon" onerror="this.onerror=null;this.src='${fallbackImageUrl}';">
                <h3>${item.DisplayId || item.id}</h3>
                <div class="item-tag ${item.Tag.toLowerCase()}">${item.Tag}</div>
                ${itemPropertiesHtml}
                ${setBonusHtml}
            `;
        }

        itemCard.innerHTML = itemContentHtml;
        itemDisplayArea.appendChild(itemCard);
    });
}


// --- How to Play Page Specific Functions (Server Status) ---
function updateServerStatus() {
    if (serverStatusText && serverStatusCircle) {
        const currentStatus = document.body.dataset.serverStatus || 'Checking...';

        if (currentStatus === 'Online') {
            serverStatusText.textContent = 'Online';
            serverStatusCircle.classList.remove('offline');
            serverStatusCircle.classList.add('online');
        } else if (currentStatus === 'Down') {
            serverStatusText.textContent = 'Down';
            serverStatusCircle.classList.remove('online');
            serverStatusCircle.classList.add('offline');
        } else {
            serverStatusText.textContent = 'Checking...';
            serverStatusCircle.classList.remove('online', 'offline');
        }
    }
}

// New: Updates the marketplace status display
function updateMarketplaceStatusDisplay() {
    if (marketplaceStatusText && marketplaceStatusCircle) {
        if (marketplaceStatus === 'Online') {
            marketplaceStatusText.textContent = 'Online';
            marketplaceStatusCircle.classList.remove('offline');
            marketplaceStatusCircle.classList.add('online');
        } else if (marketplaceStatus === 'Down') {
            marketplaceStatusText.textContent = 'Down';
            marketplaceStatusCircle.classList.remove('online');
            marketplaceStatusCircle.classList.add('offline');
        } else {
            marketplaceStatusText.textContent = 'Checking...';
            marketplaceStatusCircle.classList.remove('online', 'offline');
        }
    }
}


// --- DOM Content Loaded Event Listener ---
document.addEventListener('DOMContentLoaded', async () => {
    const currentPage = window.location.pathname.split('/').pop();
    const isShopPage = document.body.id === 'shop-page';
    const isWikiPage = document.body.id === 'wiki-page';
    const isHowToPlayPage = document.body.id === 'howtoplay-page';

    const navButtons = document.querySelectorAll('nav .button');
    navButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').endsWith(currentPage)) {
            button.classList.add('active-button');
        } else {
            button.classList.remove('active-button');
        }
    });

    updateStoreCreditDisplay();
    updateCartCount();

    if (isShopPage) {
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'flex';
        if (cartButton) cartButton.style.display = 'flex';
        renderProducts();
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        // Changed checkout button to trigger username prompt
        if (checkoutButton) checkoutButton.addEventListener('click', promptForUsernameAndCheckout);

        updateMarketplaceStatusDisplay(); // Initialize marketplace status
    } else {
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none';
    }

    if (isWikiPage) {
        await fetchItemsData();

        currentViewMode = localStorage.getItem('wikiViewMode') || 'spacious';
        if (wikiViewToggle) {
            wikiViewToggle.checked = (currentViewMode === 'compact');
            wikiViewToggle.addEventListener('change', (event) => {
                currentViewMode = event.target.checked ? 'compact' : 'spacious';
                localStorage.setItem('wikiViewMode', currentViewMode);
                expandedItemId = null;
                displayItems();
            });
        }
        displayItems();

        itemTypeLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const slotType = event.target.dataset.slottype;
                if (wikiSearchInput) wikiSearchInput.value = '';
                expandedItemId = null;
                displayItems(slotType);
            });
        });

        if (wikiSearchInput) {
            wikiSearchInput.addEventListener('input', (event) => {
                const query = event.target.value;
                expandedItemId = null;
                displayItems(null, query);
            });
        }
    }

    if (isHowToPlayPage) {
        updateServerStatus();
    }


    // Common modal close listeners
    if (productDetailsModal) {
        if (closeProductModalButton) {
            closeProductModalButton.addEventListener('click', closeProductModal);
        }
        productDetailsModal.addEventListener('click', (event) => {
            if (event.target === productDetailsModal) {
                closeProductModal();
            }
        });
    }

    if (cartModal) {
        if (closeCartModalButton) {
            closeCartModalButton.addEventListener('click', closeCartModal);
        }
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    }

    // Username prompt modal close listeners
    if (usernamePromptModal) {
        usernamePromptModal.addEventListener('click', (event) => {
            if (event.target === usernamePromptModal) {
                closeUsernamePromptModal();
            }
        });
    }
});
