// script.js

// Product data for the shop page
const products = [
    {
        id: 'supporter-role',
        name: "Supporter Role",
        price: 5.00,
        image: "icons/supporterpackage.png",
        description: "Gain access to exclusive Discord channels, custom chat color, and a special in-game title to show your support!",
        features: [
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
            "24-hour Global Loot Boost",
            "Good for running a few dungeons, or just getting an extra boost"
        ]
    },
    {
        id: 'lootboost-80',
        name: "Global Lootboost +80% (3 Days)",
        price: 10.00,
        image: "icons/globallootboost80.png",
        description: "A powerful 80% global loot boost for 3 full days, perfect for community events or grinding sessions!",
        features: [
            "72-hour Global Loot Boost",
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
            "5 Day Global Loot Boost",
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
            "700 Gold",
            "2500 Fame",
            "25 Nova Fragments"
        ]
    },
    {
        id: 'medium-currency-pack',
        name: "Medium Currency Pack",
        price: 10.00,
        image: "icons/mediumcurrencypack.png",
        description: "A medium pack of in-game currency for more significant purchases or trading.",
        features: [
            "1750 Gold",
            "7500 Fame",
            "70 Nova Fragments"
        ]
    },
    {
        id: 'large-currency-pack',
        name: "Large Currency Pack",
        price: 25.00,
        image: "icons/largecurrencypack.png",
        description: "A large pack of in-game currency for serious players looking to acquire high-value items.",
        features: [
            "5000 Gold",
            "15000 Fame",
            "125 Nova Fragments"
        ]
    },
    {
        id: 'massive-currency-pack',
        name: "Massive Currency Pack",
        price: 40.00,
        image: "icons/massivecurrencypack.png",
        description: "The biggest currency pack available, providing an enormous amount of gold for all your in-game needs!",
        features: [
            "15000 Gold",
            "35000 Fame",
            "200 Nova Fragments"
        ]
    },
    {
        id: 'starter-pack',
        name: "Starter Pack",
        price: 5.00,
        image: "icons/startercurrencypack.png",
        description: "An awesome currency pack for players who are just starting out, or want a quick little boost to their wealth.",
        features: [
            "2000 Gold",
            "10000 Fame",
            "50 Nova Fragments"
        ]
    }
];

// --- Store Credit & Cart Logic ---
let storeCredit = parseFloat(localStorage.getItem('storeCredit')) || 0;
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// --- Wiki Item Data ---
let wikiItemsData = []; // To store parsed data from items.txt
let currentViewMode = 'spacious'; // Default view mode for wiki items
let expandedItemId = null; // Stores the ID of the currently expanded item in compact view

// New global variables for filters
let currentSlotTypeFilter = null;
let currentSearchQuery = '';
let currentTierFilter = 'all'; // Default to 'all' (No Filter)
let currentUsableByFilter = 'all'; // Default to 'all' (No Filter)


// Marketplace Server Status (dynamic)
let marketplaceStatus = 'Down'; // Set this to 'Online' or 'Down' as desired

// Mapping SlotType numbers to readable names for display (for Wiki)
const slotTypeMap = {
    "1": "Sword",
    "2": "Dagger",
    "3": "Bow",
    "4": "Tome",
    "5": "Shield",
    "6": "Light Armor",
    "7": "Heavy Armor",
    "8": "Wand",
    "9": "Ring",
    "10": "Consumables",
    "11": "Spell",
    "12": "Seal",
    "13": "Cloak",
    "14": "Robe",
    "15": "Quiver",
    "16": "Helms",
    "17": "Staffs",
    "18": "Poison",
    "19": "Skull",
    "20": "Trap",
    "21": "Orb",
    "22": "Prism",
    "23": "Scepter",
    "24": "Katana",
    "25": "Star",
    "26": "Wakizashi",
    "27": "Lute",
    "28": "Mace",
    "29": "Sheath"
};

// Mapping Stat IDs to readable names for ActivateOnEquip (for Wiki)
const statIdMap = {
    "19": "Max HP", "20": "Max MP", "21": "Attack", "22": "Defense",
    "23": "Speed", "24": "Dexterity", "25": "Vitality", "26": "Wisdom"
};


// --- DOM Elements (get references once) ---
// Global elements (used across multiple pages)
const storeCreditDisplay = document.getElementById('store-credit-display');
const storeCreditAmountSpan = document.getElementById('store-credit-amount');
const addCreditButton = document.getElementById('add-credit-button');
const cartButton = document.getElementById('cart-button');
const cartItemCountSpan = document.getElementById('cart-item-count');

// Modals (unified for both shop page and wiki page)
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

// New filter dropdown elements
const tierFilterDropdown = document.getElementById('tier-filter');
const usableByFilterDropdown = document.getElementById('usable-by-filter');


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
//function addCredit() {
//    storeCredit += 10.00;
//    updateStoreCreditDisplay();
//    showCustomMessageBox('Successfully added $10 to your store credit! Current credit: $' + storeCredit.toFixed(2), "Credit Added", "success");
//}

// Renders product tiles on the shop page
function renderProducts() {
    const supporterRanksGrid = document.getElementById('supporter-ranks');
    const globalBoostsGrid = document.getElementById('global-boosts');
    const currencyPacksGrid = document.getElementById('currency-packs');

    // Clear existing products before rendering
    if (supporterRanksGrid) supporterRanksGrid.innerHTML = '';
    if (globalBoostsGrid) globalBoostsGrid.innerHTML = '';
    if (currencyPacksGrid) currencyPacksGrid.innerHTML = '';

    products.forEach(product => {
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

        if (product.id.startsWith('supporter-') && supporterRanksGrid) {
            supporterRanksGrid.appendChild(productTile);
        } else if (product.id.includes('lootboost') && globalBoostsGrid) {
            globalBoostsGrid.appendChild(productTile);
        } else if (product.id.includes('currency-pack') && currencyPacksGrid) {
            currencyPacksGrid.appendChild(productTile);
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

// Handler for "View Details" button click on shop products
function handleViewDetailsClick(event) {
    const productId = event.currentTarget.dataset.productId;
    const product = products.find(p => p.id === productId);
    if (product) {
        openProductModal(product); // Pass the entire product object
    } else {
        console.error("Product not found for details:", productId);
    }
}

// Handler for "Add to Cart" button click (from product tile)
function handleAddToCartClick(event) {
    const productId = event.currentTarget.dataset.productId;
    addToCart(productId);
    showCustomMessageBox("Item added to cart!", "Item Added", "success");
}

// Opens the product details modal and populates it for BOTH shop products and wiki items
function openProductModal(itemOrProduct) {
    // Reset modal content visibility
    modalProductBenefits.innerHTML = '';
    modalProductBenefits.style.display = 'none';
    
    // Check if it's a shop product based on presence in the 'products' array
    const isShopProduct = products.some(p => p.id === itemOrProduct.id);

    if (isShopProduct) {
        // Populate for Shop Product
        modalProductImage.src = itemOrProduct.image;
        modalProductImage.alt = itemOrProduct.name;
        modalProductName.textContent = itemOrProduct.name;
        modalProductDescription.textContent = itemOrProduct.description;
        modalProductPrice.textContent = `$${itemOrProduct.price.toFixed(2)}`;
        modalProductPrice.style.display = 'block'; // Show price for shop items
        modalAddToCartButton.style.display = 'block'; // Show add to cart button for shop items
        modalAddToCartButton.onclick = () => {
            addToCart(itemOrProduct.id);
            closeProductModal();
            showCustomMessageBox(`${itemOrProduct.name} added to cart!`, "Item Added", "success");
        };

        if (itemOrProduct.features && itemOrProduct.features.length > 0) {
            document.querySelector('#product-details-modal .modal-body h4').textContent = "Features:";
            itemOrProduct.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalProductBenefits.appendChild(li);
            });
            modalProductBenefits.style.display = 'block';
        }
    } else {
        // Populate for Wiki Item (no price or add to cart button)
        const itemImageName = itemOrProduct.id.replace(/[^a-zA-Z0-9]/g, '');
        const imagePath = `icons/items/${itemImageName}.png`;
        const fallbackImageUrl = `https://placehold.co/100x100/FF69B4/FFFFFF?text=${itemOrProduct.DisplayId ? itemOrProduct.DisplayId.split(' ')[0] : 'ITEM'}`;

        modalProductImage.src = imagePath;
        modalProductImage.alt = itemOrProduct.DisplayId || itemOrProduct.id;
        modalProductImage.onerror = function() { this.onerror=null; this.src=fallbackImageUrl; };
        modalProductName.textContent = itemOrProduct.DisplayId || itemOrProduct.id;

        let descriptionHTML = '';
        descriptionHTML += `<p><strong>Type:</strong> <span>${slotTypeMap[itemOrProduct.SlotType] || 'N/A'}</span></p>`;
        if (itemOrProduct.UsableBy) {
            descriptionHTML += `<p><strong>Usable By:</strong> <span>${itemOrProduct.UsableBy}</span></p>`;
        }
        if (itemOrProduct.Damage) {
            descriptionHTML += `<p><strong>Damage:</strong> <span>${itemOrProduct.Damage}</span></p>`;
        }
        if (itemOrProduct.Defense) {
            descriptionHTML += `<p><strong>Defense:</strong> <span>${itemOrProduct.Defense}</span></p>`;
        }
        descriptionHTML += `<p><strong>Soulbound:</strong> <span>${itemOrProduct.Soulbound ? 'Yes' : 'No'}</span></p>`;

        if (itemOrProduct.Description) {
            descriptionHTML += `<p class="item-description"><strong>Description:</strong> ${itemOrProduct.Description}</p>`;
        }

        const hasDetailedProperties = itemOrProduct.NumProjectiles || itemOrProduct.Boomerang || itemOrProduct.ShotsMultiHit || itemOrProduct.ShotsPassesCover || itemOrProduct.IgnoresDefense || itemOrProduct.Range || itemOrProduct.ArcGap || itemOrProduct.RateOfFire || itemOrProduct.FameBonus;
        const hasAbilityProperties = itemOrProduct.MPCost || itemOrProduct.HealAmount || itemOrProduct.AbilityRadius || itemOrProduct.Teleports || itemOrProduct.DecoyDuration || itemOrProduct.SummonDetails || (itemOrProduct.AbilityEffects && itemOrProduct.AbilityEffects.length > 0);

        if (hasDetailedProperties || hasAbilityProperties) {
            descriptionHTML += `<hr class="item-properties-separator">`;
        }

        // Display Ability-specific properties if applicable
        if (itemOrProduct.Class === 'Ability') {
            if (itemOrProduct.MPCost) {
                descriptionHTML += `<p><strong>MP Cost:</strong> <span>${itemOrProduct.MPCost}</span></p>`;
            }
            if (itemOrProduct.HealAmount) {
                descriptionHTML += `<p><strong>Heal Amount:</strong> <span>${itemOrProduct.HealAmount} HP</span></p>`;
            }
            if (itemOrProduct.AbilityRadius) {
                descriptionHTML += `<p><strong>Radius:</strong> <span>${itemOrProduct.AbilityRadius}</span></p>`;
            }
            if (itemOrProduct.Teleports) {
                descriptionHTML += `<p><strong>Effect:</strong> <span>Teleports</span></p>`;
            }
            if (itemOrProduct.DecoyDuration) {
                descriptionHTML += `<p><strong>Decoy Duration:</strong> <span>${itemOrProduct.DecoyDuration} seconds</span></p>`;
            }
            if (itemOrProduct.SummonDetails) {
                descriptionHTML += `<p><strong>Summons:</strong> <span>Type ${itemOrProduct.SummonDetails.type} for ${itemOrProduct.SummonDetails.duration} seconds</span></p>`;
            }
            if (itemOrProduct.AbilityEffects && itemOrProduct.AbilityEffects.length > 0) {
                itemOrProduct.AbilityEffects.forEach(effect => {
                    descriptionHTML += `<p><strong>Applies Effect:</strong> <span>${effect.effect} for ${effect.duration} seconds</span></p>`;
                });
            }
        }


        // Display Projectile-specific properties
        if (itemOrProduct.NumProjectiles) {
            descriptionHTML += `<p><strong>Shots:</strong> <span>${itemOrProduct.NumProjectiles}</span></p>`;
        }
        if (itemOrProduct.Range) {
            descriptionHTML += `<p><strong>Range:</strong> <span>${itemOrProduct.Range}</span></p>`;
        }
        if (itemOrProduct.NumProjectiles) { // These apply if it's a projectile-based item
            descriptionHTML += `<p><strong>Shots boomerang:</strong> <span>${itemOrProduct.Boomerang ? 'Yes' : 'No'}</span></p>`;
            descriptionHTML += `<p><strong>Shots hit multiple targets:</strong> <span>${itemOrProduct.ShotsMultiHit ? 'Yes' : 'No'}</span></p>`;
            descriptionHTML += `<p><strong>Ignores defense of target:</strong> <span>${itemOrProduct.IgnoresDefense ? 'Yes' : 'No'}</span></p>`;
            descriptionHTML += `<p><strong>Shots pass through obstacles:</strong> <span>${itemOrProduct.ShotsPassesCover ? 'Yes' : 'No'}</span></p>`;
        }
        if (itemOrProduct.ArcGap) {
            descriptionHTML += `<p><strong>Arc Gap:</strong> <span>${itemOrProduct.ArcGap}°</span></p>`;
        }
        if (itemOrProduct.RateOfFire) {
            descriptionHTML += `<p><strong>Rate of Fire:</strong> <span>${itemOrProduct.RateOfFire}</span></p>`;
        }
        if (itemOrProduct.FameBonus) {
            descriptionHTML += `<p><strong>Fame Bonus:</strong> <span>${itemOrProduct.FameBonus}%</span></p>`;
        }

        if (itemOrProduct.StatBoosts && itemOrProduct.StatBoosts.length > 0) {
            document.querySelector('#product-details-modal .modal-body h4').textContent = "Stat Boosts:";
            itemOrProduct.StatBoosts.forEach(boost => {
                const li = document.createElement('li');
                li.textContent = boost;
                modalProductBenefits.appendChild(li);
            });
            modalProductBenefits.style.display = 'block';
        }

        if (itemOrProduct.Set) {
            document.querySelector('#product-details-modal .modal-body h4').textContent = "Set Bonus:";
            let setBonusHtml = `
                <div class="item-set-bonus">
                    <h4>Set: ${itemOrProduct.Set.Name}</h4>
                    <ul>
            `;
            itemOrProduct.Set.Bonuses.forEach(bonus => {
                setBonusHtml += `<li><strong>${bonus.pieces} Pieces:</strong> <span>${bonus.description}</span></li>`;
            });
            setBonusHtml += `
                        <li><strong>Full Set Bonus:</strong> <span>${itemOrProduct.Set.FullBonus}</span></li>
                    </ul>
                </div>
            `;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = setBonusHtml;
            modalProductBenefits.appendChild(tempDiv.firstChild);
            modalProductBenefits.style.display = 'block';
        }

        modalProductDescription.innerHTML = descriptionHTML;
        modalProductPrice.style.display = 'none'; // Hide price for wiki items
        modalAddToCartButton.style.display = 'none'; // Hide Add to Cart for wiki items
    }

    if (productDetailsModal) {
        productDetailsModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}


// Closes the product details modal
function closeProductModal() {
    if (productDetailsModal) {
        productDetailsModal.classList.remove('open');
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
        cartModal.classList.add('open'); // Use class for smooth transition
        document.body.style.overflow = 'hidden';
    }
}

// Closes the shopping cart modal
function closeCartModal() {
    if (cartModal) {
        cartModal.classList.remove('open'); // Use class for smooth transition
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
        usernamePromptModal.classList.add('open'); // Use class for smooth transition
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
        closeUsernamePromptModal();
        closeCartModal();

        const orderId = crypto.randomUUID();

        const backendResponse = await sendOrderToBackend(inGameUsername, cart, total, orderId);

        if (backendResponse && backendResponse.status === 'success') {
            storeCredit -= total;
            updateStoreCreditDisplay();

            cart = [];
            updateCartCount();

            showCustomMessageBox(
                `Purchase successful! Your order #${orderId} has been placed for delivery to <strong>${inGameUsername}</strong>.` +
                `<br>Your credit has been updated.`,
                "Purchase Complete",
                "success"
            );
        } else {
            showCustomMessageBox(
                `Purchase failed! Reason: ${backendResponse?.message || 'Unknown error contacting backend.'}` +
                `<br>Your credit has NOT been deducted. Please try again or contact support.`,
                "Purchase Failed",
                "error"
            );
        }
    } else {
        closeUsernamePromptModal();
        showCustomMessageBox("Insufficient store credit. Please add more credit to complete your purchase.", "Insufficient Funds", "error");
    }
}

// New: Sends order data to the Flask backend
async function sendOrderToBackend(username, cartItems, total, orderId) {
    const backendHost = '127.0.0.1';
    const backendPort = '40071';
    
    const backendEndpoint = `http://${backendHost}:${backendHost}:${backendPort}/purchase`;

    const purchasePayload = {
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

    console.log('--- Sending Order to Backend ---');
    console.log('Backend Endpoint:', backendEndpoint);
    console.log('Payload to Backend:', purchasePayload);

    try {
        const response = await fetch(backendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchasePayload),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Backend Response:', result);
            return result;
        } else {
            const errorResult = await response.json();
            console.error('Backend Error Response (Status:', response.status, '):', errorResult);
            return { status: "error", message: errorResult.message || `Backend returned status ${response.status}` };
        }
    } catch (error) {
        console.error('Error contacting backend server:', error);
        return { status: "error", message: `Could not connect to backend server: ${error.message}` };
    }
}


// New: Closes the username prompt modal
function closeUsernamePromptModal() {
    if (usernamePromptModal) {
        usernamePromptModal.classList.remove('open');
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
        opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;
    `;

    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.style.cssText = `
        background-color: #282828; padding: 25px; border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); max-width: 400px;
        text-align: center; color: #f0f0f0; font-family: 'Open Sans', sans-serif;
        position: relative;
        transform: translateY(20px); transition: transform 0.3s ease;
    `;

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#DC3545' : type === 'warning' ? '#FFC107' : '#87CEEB'};
        margin-top: 0; margin-bottom: 15px; font-size: 1.4em;
    `;

    const messageElement = document.createElement('p');
    messageElement.innerHTML = message;
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
    closeButton.onclick = () => {
        messageBox.style.transform = 'translateY(20px)';
        messageBoxOverlay.style.opacity = '0';
        messageBoxOverlay.addEventListener('transitionend', () => {
            document.body.removeChild(messageBoxOverlay);
        }, { once: true });
    };

    messageBox.appendChild(titleElement);
    messageBox.appendChild(messageElement);
    messageBox.appendChild(closeButton);
    messageBoxOverlay.appendChild(messageBox);
    document.body.appendChild(messageBoxOverlay);

    // Trigger animations
    setTimeout(() => {
        messageBoxOverlay.style.opacity = '1';
        messageBoxOverlay.style.visibility = 'visible';
        messageBox.style.transform = 'translateY(0)';
    }, 10);
}


// --- WIKI SPECIFIC FUNCTIONS ---

// Function to fetch and parse items.txt
async function fetchItemsData() {
    console.log("Attempting to fetch and parse items.txt...");
    try {
        const response = await fetch('items.txt');
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} for items.txt`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        // Check for XML parsing errors more robustly
        const errorNode = xmlDoc.querySelector('parsererror');
        if (errorNode) {
            console.error("XML Parsing Error in items.txt:", errorNode.textContent);
            // Attempt to get the source text causing the error, if available
            const sourceText = errorNode.querySelector('sourcetext')?.textContent;
            if (sourceText) {
                console.error("Error source text:", sourceText);
            }
            throw new Error("Failed to parse items.txt due to XML errors. Check console for details.");
        }

        const items = [];
        const objectElements = xmlDoc.querySelectorAll('Object[Item="true"]');

        if (objectElements.length === 0) {
            console.warn("No <Object Item='true'> elements found in items.txt.");
            if (itemDisplayArea) {
                itemDisplayArea.innerHTML = '<p style="text-align: center; color: #bbb;">No items defined in items.txt or parsing failed. Please check the file.</p>';
            }
            return; // Exit if no items found
        }

        objectElements.forEach(obj => {
            const item = {};
            item.type = obj.getAttribute('type');
            item.id = obj.getAttribute('id');
            item.DisplayId = obj.querySelector('DisplayId')?.textContent;
            item.Class = obj.querySelector('Class')?.textContent;
            item.SlotType = obj.querySelector('SlotType')?.textContent;
            item.Description = obj.querySelector('Description')?.textContent;
            item.Tag = obj.querySelector('Tag')?.textContent || 'N/A';

            const damageMin = obj.querySelector('MinDamage')?.textContent;
            const damageMax = obj.querySelector('MaxDamage')?.textContent;
            if (damageMin && damageMax) {
                item.Damage = `${damageMin}-${damageMax}`;
            }

            item.RateOfFire = obj.querySelector('RateOfFire')?.textContent;
            item.MPCost = obj.querySelector('MPCost')?.textContent;
            item.Defense = obj.querySelector('Defense')?.textContent;
            item.Range = obj.querySelector('Range')?.textContent;
            item.ArcGap = obj.querySelector('ArcGap')?.textContent;
            item.FameBonus = obj.querySelector('FameBonus')?.textContent;
            item.Soulbound = obj.querySelector('Soulbound') && obj.querySelector('Soulbound').textContent.toLowerCase() === 'true';
            item.UsableBy = obj.querySelector('UsableBy')?.textContent;

            const activateOnEquipElements = obj.querySelectorAll('ActivateOnEquip');
            if (activateOnEquipElements.length > 0) {
                item.StatBoosts = [];
                activateOnEquipElements.forEach(aoe => {
                    const statId = aoe.getAttribute('stat');
                    const statValue = aoe.textContent;
                    const statName = statIdMap[statId] || `Stat ${statId}`;
                    item.StatBoosts.push(`${statName}: +${statValue}`);
                });
            }

            // Parse <Activate> tag for ability specific properties
            const activateElement = obj.querySelector('Activate');
            if (activateElement) {
                const healElement = activateElement.querySelector('Heal');
                if (healElement) item.HealAmount = healElement.textContent;

                const radiusElement = activateElement.querySelector('Radius');
                if (radiusElement) item.AbilityRadius = radiusElement.textContent;

                const teleportElement = activateElement.querySelector('Teleport');
                if (teleportElement) item.Teleports = true;

                const decoyElement = activateElement.querySelector('Decoy');
                if (decoyElement) item.DecoyDuration = decoyElement.getAttribute('duration');

                const summonElement = activateElement.querySelector('Summon');
                if (summonElement) {
                    item.SummonDetails = {
                        type: summonElement.getAttribute('type'),
                        duration: summonElement.getAttribute('duration')
                    };
                }
                
                const conditionEffectElements = activateElement.querySelectorAll('ConditionEffect');
                if (conditionEffectElements.length > 0) {
                    item.AbilityEffects = [];
                    conditionEffectElements.forEach(ce => {
                        item.AbilityEffects.push({
                            effect: ce.getAttribute('effect'),
                            duration: ce.getAttribute('duration')
                        });
                    });
                }
            }

            const projectileElement = obj.querySelector('Projectile');
            if (projectileElement) {
                item.NumProjectiles = projectileElement.querySelector('NumProjectiles')?.textContent || '1';
                item.Boomerang = projectileElement.querySelector('Boomerang') ? true : false;
                item.ShotsMultiHit = projectileElement.querySelector('MultiHit') ? true : false;
                item.ShotsPassesCover = projectileElement.querySelector('PassesCover') ? true : false;
                item.IgnoresDefense = projectileElement.querySelector('PierceDefense') ? true : false;
            } else {
                item.NumProjectiles = obj.querySelector('NumProjectiles')?.textContent;
            }

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
        console.log("Parsed Wiki Items:", wikiItemsData.length, "items loaded.");

    } catch (error) {
        console.error("Critical Error in fetchItemsData:", error);
        if (itemDisplayArea) {
            itemDisplayArea.innerHTML = `<p style="text-align: center; color: #DC3545;">Failed to load wiki items: ${error.message}. Please check items.txt file and browser console for errors.</p>`;
        }
    }
}

// Function to populate the Tier filter dropdown
function populateTierFilter() {
    if (!tierFilterDropdown) {
        console.log("Tier filter dropdown not found.");
        return;
    }

    tierFilterDropdown.innerHTML = '<option value="all">No Filter</option>';

    const customTierOrder = [
        'T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10',
        'T11', 'T12', 'T13', 'T14', 'LG', 'ST', 'UT', 'Event'
    ];

    const uniqueTagsFromData = new Set();
    wikiItemsData.forEach(item => {
        if (item.Tag && item.Tag !== 'N/A') {
            uniqueTagsFromData.add(item.Tag);
        }
    });

    const tiersToAdd = [];
    customTierOrder.forEach(tier => {
        tiersToAdd.push(tier);
    });

    uniqueTagsFromData.forEach(tag => {
        if (!customTierOrder.includes(tag) && tag.toLowerCase() !== 'ev') {
            tiersToAdd.push(tag);
        }
    });

    tiersToAdd.sort((a, b) => {
        const indexA = customTierOrder.indexOf(a);
        const indexB = customTierOrder.indexOf(b);

        if (indexA === -1 && indexB === -1) {
            return a.localeCompare(b);
        }
        if (indexA === -1) {
            return 1;
        }
        if (indexB === -1) {
            return -1;
        }
        return indexA - indexB;
    });

    const finalSortedTiers = Array.from(new Set(tiersToAdd));

    console.log("Populating Tier Filter with:", finalSortedTiers);
    finalSortedTiers.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag.toLowerCase();
        option.textContent = tag;
        tierFilterDropdown.appendChild(option);
    });
}

// Function to populate the Usable By filter dropdown
function populateUsableByFilter() {
    if (!usableByFilterDropdown) {
        console.log("Usable By filter dropdown not found.");
        return;
    }

    usableByFilterDropdown.innerHTML = '<option value="all">No Filter</option>';

    const uniqueClasses = new Set();
    wikiItemsData.forEach(item => {
        if (item.UsableBy) {
            item.UsableBy.split(', ').forEach(cls => {
                const trimmedCls = cls.trim();
                if (trimmedCls && trimmedCls.toLowerCase() !== 'all') {
                    uniqueClasses.add(trimmedCls);
                }
            });
        }
    });

    const sortedClasses = Array.from(uniqueClasses).sort();
    console.log("Populating Usable By Filter with:", sortedClasses);

    sortedClasses.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls;
        option.textContent = cls;
        usableByFilterDropdown.appendChild(option);
    });
}


// Function to display items in the wiki based on current view mode and active filters
function displayItems() {
    if (!itemDisplayArea) return;

    itemDisplayArea.innerHTML = ''; // Clear current display

    let filteredItems = wikiItemsData;

    // Apply Slot Type filter (from sidebar links)
    if (currentSlotTypeFilter && currentSlotTypeFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.SlotType === currentSlotTypeFilter);
    }

    // Apply Search Query filter
    if (currentSearchQuery) {
        const lowerCaseQuery = currentSearchQuery.toLowerCase();
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

    // Apply Tier filter (new dropdown)
    if (currentTierFilter && currentTierFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.Tag && item.Tag.toLowerCase() === currentTierFilter);
    }

    // Apply Usable By filter (new dropdown)
    if (currentUsableByFilter && currentUsableByFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.UsableBy && item.UsableBy.split(', ').map(s => s.trim()).includes(currentUsableByFilter));
    }


    if (filteredItems.length === 0) {
        itemDisplayArea.innerHTML = '<p style="text-align: center; color: #bbb;">No items found matching your criteria.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.dataset.itemId = item.id; // Set data-item-id

        // Determine initial classes based on view mode and expansion state
        itemCard.classList.add('item-card');
        if (currentViewMode === 'compact') {
            if (expandedItemId === item.id) {
                itemCard.classList.add('expanded'); // This item is currently expanded in compact mode
            } else {
                itemCard.classList.add('compact-view'); // Default compact view for other items
            }
        } else {
            itemCard.classList.add('spacious-view'); // Default spacious view
        }
        
        const itemImageName = item.id.replace(/[^a-zA-Z0-9]/g, '');
        const imagePath = `icons/items/${itemImageName}.png`;
        const fallbackImageUrl = `https://placehold.co/100x100/FF69B4/FFFFFF?text=${item.DisplayId ? item.DisplayId.split(' ')[0] : 'ITEM'}`;

        let itemContentHtml = `
            <img src="${imagePath}" alt="${item.DisplayId || item.id} Icon" onerror="this.onerror=null;this.src='${fallbackImageUrl}';">
            <h3>${item.DisplayId || item.id}</h3>
            <div class="item-tag ${item.Tag.toLowerCase()}">${item.Tag}</div>
        `;
        
        // Conditionally add the compact "SB" tag next to the main tag
        if (item.Soulbound) { // Only add if the item is soulbound
            itemContentHtml += `<span class="item-compact-soulbound-indicator">SB</span>`;
        }


        itemContentHtml += `<div class="item-details-content"> <!-- Container for collapsible content -->
                <p><strong>Type:</strong> <span>${slotTypeMap[item.SlotType] || 'N/A'}</span></p>
                ${item.UsableBy ? `<p><strong>Usable By:</strong> <span>${item.UsableBy}</span></p>` : ''}
                ${item.Damage ? `<p><strong>Damage:</strong> <span>${item.Damage}</span></p>` : ''}
                ${item.Defense ? `<p><strong>Defense:</strong> <span>${item.Defense}</span></p>` : ''}
                <p><strong>Soulbound:</strong> <span>${item.Soulbound ? 'Yes' : 'No'}</span></p>
                ${item.Description ? `<p class="item-description"><strong>Description:</strong> ${item.Description}</p>` : ''}
        `;

        const hasDetailedProperties = item.NumProjectiles || item.Boomerang || item.ShotsMultiHit || item.ShotsPassesCover || item.IgnoresDefense || item.Range || item.ArcGap || item.RateOfFire || item.FameBonus;
        const hasAbilityProperties = item.MPCost || item.HealAmount || item.AbilityRadius || item.Teleports || item.DecoyDuration || item.SummonDetails || (item.AbilityEffects && item.AbilityEffects.length > 0);

        if (hasDetailedProperties || hasAbilityProperties || (item.StatBoosts && item.StatBoosts.length > 0) || item.Set) {
             itemContentHtml += `<hr class="item-properties-separator">`;
        }

        // Display Ability-specific properties if applicable
        if (item.Class === 'Ability') {
            itemContentHtml += `<p><strong>Class:</strong> <span>Ability</span></p>`;
            if (item.MPCost) {
                itemContentHtml += `<p><strong>MP Cost:</strong> <span>${item.MPCost}</span></p>`;
            }
            if (item.HealAmount) {
                itemContentHtml += `<p><strong>Heal Amount:</strong> <span>${item.HealAmount} HP</span></p>`;
            }
            if (item.AbilityRadius) {
                itemContentHtml += `<p><strong>Radius:</strong> <span>${item.AbilityRadius}</span></p>`;
            }
            if (item.Teleports) {
                itemContentHtml += `<p><strong>Effect:</strong> <span>Teleports</span></p>`;
            }
            if (item.DecoyDuration) {
                itemContentHtml += `<p><strong>Decoy Duration:</strong> <span>${item.DecoyDuration} seconds</span></p>`;
            }
            if (item.SummonDetails) {
                itemContentHtml += `<p><strong>Summons:</strong> <span>Type ${item.SummonDetails.type} for ${item.SummonDetails.duration} seconds</span></p>`;
            }
            if (item.AbilityEffects && item.AbilityEffects.length > 0) {
                item.AbilityEffects.forEach(effect => {
                    itemContentHtml += `<p><strong>Applies Effect:</strong> <span>${effect.effect} for ${effect.duration} seconds</span></p>`;
                });
            }
        }


        // Display Projectile-specific properties (if applicable, separate from general weapon stats)
        if (item.NumProjectiles) {
            itemContentHtml += `<p><strong>Shots:</strong> <span>${item.NumProjectiles}</span></p>`;
        }
        if (item.Range) {
            itemContentHtml += `<p><strong>Range:</strong> <span>${item.Range}</span></p>`;
        }
        if (item.NumProjectiles) { // These apply if it's a projectile-based item
            itemContentHtml += `<p><strong>Shots boomerang:</strong> <span>${item.Boomerang ? 'Yes' : 'No'}</span></p>`;
            itemContentHtml += `<p><strong>Shots hit multiple targets:</strong> <span>${item.ShotsMultiHit ? 'Yes' : 'No'}</span></p>`;
            itemContentHtml += `<p><strong>Ignores defense of target:</strong> <span>${item.IgnoresDefense ? 'Yes' : 'No'}</span></p>`;
            itemContentHtml += `<p><strong>Shots pass through obstacles:</strong> <span>${item.ShotsPassesCover ? 'Yes' : 'No'}</span></p>`;
        }
        if (item.ArcGap) {
            itemContentHtml += `<p><strong>Arc Gap:</strong> <span>${item.ArcGap}°</span></p>`;
        }
        if (item.RateOfFire) {
            itemContentHtml += `<p><strong>Rate of Fire:</strong> <span>${item.RateOfFire}</span></p>`;
        }
        if (item.FameBonus) {
            itemContentHtml += `<p><strong>Fame Bonus:</strong> <span>${item.FameBonus}%</span></p>`;
        }

        if (item.StatBoosts && item.StatBoosts.length > 0) {
            // Note: This section within the `item-details-content` is for general stats.
            // The modal also has a similar section for benefits, which might be redundant
            // or used for product features instead. Keeping both for now based on original structure.
            itemContentHtml += `<p><strong>Stat Boosts:</strong> <span>${item.StatBoosts.join(', ')}</span></p>`;
        }

        let setBonusHtml = '';
        if (item.Set) {
            setBonusHtml = `
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
        itemContentHtml += setBonusHtml;
        itemContentHtml += `</div>`; // Close item-details-content

        // Always add the soulbound footer tag HTML if the item is soulbound.
        // Its visibility will be controlled by CSS.
        if (item.Soulbound) {
            itemContentHtml += `<div class="item-footer-tags"><span class="item-tag soulbound">Soulbound</span></div>`;
        }

        itemCard.innerHTML = itemContentHtml;

        itemCard.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior, especially for `#` hrefs

            if (currentViewMode === 'compact') {
                const clickedItem = event.currentTarget;
                const itemId = clickedItem.dataset.itemId;

                if (expandedItemId === itemId) {
                    expandedItemId = null; // Collapse this item
                } else {
                    expandedItemId = itemId; // Expand this item
                }
                // Re-render to ensure smooth transitions and correct state
                // This is needed to toggle the classes on *all* items correctly (collapsing others)
                displayItems(); // Call displayItems without parameters to use current global filter states
            } else {
                // In spacious mode, do nothing on click, as items are already "expanded"
                console.log(`Clicked item ${item.id} in spacious view. No action taken.`);
            }
        });

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

// Updates the marketplace status display based on `marketplaceStatus` variable
function updateMarketplaceStatusDisplay() {
    if (marketplaceStatusText && marketplaceStatusCircle) {
        marketplaceStatusText.textContent = marketplaceStatus;
        if (marketplaceStatus === 'Online') {
            marketplaceStatusCircle.classList.remove('offline');
            marketplaceStatusCircle.classList.add('online');
        } else if (marketplaceStatus === 'Down') {
            marketplaceStatusCircle.classList.remove('online');
            marketplaceStatusCircle.classList.add('offline');
        } else {
            marketplaceStatusText.textContent = 'Checking...';
            marketplaceStatusCircle.classList.remove('online', 'offline');
        }
    }
}

// Checks the backend server status for the marketplace (now simulated)
async function checkMarketplaceStatus() {
    await new Promise(resolve => setTimeout(resolve, 500));
    updateMarketplaceStatusDisplay();
}


// --- DOM Content Loaded Event Listener ---
document.addEventListener('DOMContentLoaded', async () => {
    const currentPage = window.location.pathname.split('/').pop();
    const isShopPage = document.body.id === 'shop-page';
    const isWikiPage = document.body.id === 'wiki-page';
    const isHowToPlayPage = document.body.id === 'howtoplay-page';

    // Highlight active navigation button
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

        renderProducts(); // Renders shop products

        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        if (checkoutButton) checkoutButton.addEventListener('click', promptForUsernameAndCheckout);

        await checkMarketplaceStatus();
    } else {
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none';
    }

    if (isWikiPage) {
        // Ensure data is fetched and parsed before populating filters and displaying items
        await fetchItemsData();
        
        // Populate new filters after data is fetched and parsed
        populateTierFilter();
        populateUsableByFilter();

        currentViewMode = localStorage.getItem('wikiViewMode') || 'spacious';
        if (wikiViewToggle) {
            wikiViewToggle.checked = (currentViewMode === 'compact');
            wikiViewToggle.addEventListener('change', (event) => {
                currentViewMode = event.target.checked ? 'compact' : 'spacious';
                localStorage.setItem('wikiViewMode', currentViewMode);
                expandedItemId = null; // Reset expanded item when view mode changes
                displayItems(); // Re-render items with new view mode
            });
        }
        displayItems(); // Initial display of wiki items

        itemTypeLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                currentSlotTypeFilter = event.target.dataset.slottype; // Update global filter
                // Clear other filters for new type selection
                if (wikiSearchInput) wikiSearchInput.value = '';
                currentSearchQuery = '';
                if (tierFilterDropdown) tierFilterDropdown.value = 'all';
                currentTierFilter = 'all';
                if (usableByFilterDropdown) usableByFilterDropdown.value = 'all';
                currentUsableByFilter = 'all';

                expandedItemId = null; // Reset expanded item when filtering
                displayItems(); // Call displayItems to apply all global filters
            });
        });

        if (wikiSearchInput) {
            wikiSearchInput.addEventListener('input', (event) => {
                currentSearchQuery = event.target.value; // Update global filter
                currentSlotTypeFilter = null; // Clear slot type filter on search
                if (tierFilterDropdown) tierFilterDropdown.value = 'all';
                currentTierFilter = 'all';
                if (usableByFilterDropdown) usableByFilterDropdown.value = 'all';
                currentUsableByFilter = 'all';

                expandedItemId = null;
                displayItems(); // Call displayItems to apply all global filters
            });
        }

        // New event listeners for filter dropdowns
        if (tierFilterDropdown) {
            tierFilterDropdown.addEventListener('change', (event) => {
                currentTierFilter = event.target.value; // Update global filter
                currentSlotTypeFilter = null; // Clear other filters
                if (wikiSearchInput) wikiSearchInput.value = '';
                currentSearchQuery = '';
                if (usableByFilterDropdown) usableByFilterDropdown.value = 'all';
                currentUsableByFilter = 'all';
                expandedItemId = null;
                displayItems();
            });
        }

        if (usableByFilterDropdown) {
            usableByFilterDropdown.addEventListener('change', (event) => {
                currentUsableByFilter = event.target.value; // Update global filter
                currentSlotTypeFilter = null; // Clear other filters
                if (wikiSearchInput) wikiSearchInput.value = '';
                currentSearchQuery = '';
                if (tierFilterDropdown) tierFilterDropdown.value = 'all';
                currentTierFilter = 'all';
                expandedItemId = null;
                displayItems();
            });
        }
    }

    if (isHowToPlayPage) {
        updateServerStatus();
    }


    // Common modal close listeners (for product details and cart modals)
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
