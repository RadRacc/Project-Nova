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

// Mapping SlotType numbers to readable names for display
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

// How to Play specific elements (for server status)
const serverStatusText = document.getElementById('server-status-text');
const serverStatusCircle = document.getElementById('server-status-circle');
const serverStatusDropdown = document.getElementById('server-status-select');
const setServerStatusButton = document.getElementById('set-server-status-button');


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
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            const productGrid = sectionElement.querySelector('.product-grid');
            if (productGrid) {
                productGrid.innerHTML = ''; // Clear existing products

                const sectionProducts = products.filter(p => {
                    if (sectionId === 'supporter-ranks') {
                        // FIX: Use startsWith to correctly filter all supporter roles
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
    showCustomMessageBox("Item added to cart!", "Item Added", "success");
}

// Opens the product details modal and populates it
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product && productDetailsModal && modalProductImage && modalProductName && modalProductDescription && modalProductBenefits && modalProductPrice && modalAddToCartButton) {
        // Update the "Add to Cart" button in the modal to add the current product
        modalAddToCartButton.onclick = () => {
            addToCart(product.id);
            closeProductModal(); // Close modal after adding to cart
            showCustomMessageBox(`${product.name} added to cart!`, "Item Added", "success");
        };

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
        showCustomMessageBox("Your cart is empty. Please add items before checking out.", "Empty Cart", "warning");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (storeCredit >= total) {
        storeCredit -= total;
        cart = []; // Clear cart
        updateStoreCreditDisplay(); // Save updated credit
        updateCartCount(); // Update header count and save cart
        closeCartModal();
        showCustomMessageBox("Checkout successful! Your items have been processed.", "Purchase Complete", "success");
    } else {
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


// --- WIKI SPECIFIC FUNCTIONS ---

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

            // Collect other properties
            const damageMin = obj.querySelector('MinDamage')?.textContent;
            const damageMax = obj.querySelector('MaxDamage')?.textContent;
            if (damageMin && damageMax) {
                item.Damage = `${damageMin}-${damageMax}`;
            }

            item.RateOfFire = obj.querySelector('RateOfFire')?.textContent;
            item.NumProjectiles = obj.querySelector('NumProjectiles')?.textContent;
            item.MPCost = obj.querySelector('MPCost')?.textContent;
            item.Defense = obj.querySelector('Defense')?.textContent;

            // Handle ActivateOnEquip for rings
            const activateOnEquip = obj.querySelector('ActivateOnEquip');
            if (activateOnEquip) {
                const statId = activateOnEquip.getAttribute('stat');
                const statValue = activateOnEquip.textContent;
                // You might need a more comprehensive stat mapping
                const statName = {
                    "21": "Max HP",
                    "22": "Max MP",
                    "20": "Attack",
                    "26": "Defense",
                    "27": "Speed",
                    "28": "Dexterity",
                    "29": "Vitality",
                    "30": "Wisdom"
                }[statId] || `Stat ${statId}`;
                item.StatBoost = `${statName}: +${statValue}`;
            }

            items.push(item);
        });
        wikiItemsData = items; // Store the parsed data globally
        console.log("Parsed Wiki Items:", wikiItemsData);

    } catch (error) {
        console.error("Error fetching or parsing items.txt:", error);
        if (itemDisplayArea) {
            itemDisplayArea.innerHTML = '<p style="text-align: center; color: #DC3545;">Failed to load wiki items. Please ensure items.txt is correctly formatted.</p>';
        }
    }
}

// Function to display items in the wiki
function displayItems(filterSlotType = null, searchQuery = '') {
    if (!itemDisplayArea) return;

    itemDisplayArea.innerHTML = ''; // Clear previous items

    let filteredItems = wikiItemsData;

    // Filter by SlotType if provided
    if (filterSlotType) {
        filteredItems = filteredItems.filter(item => item.SlotType === filterSlotType);
    }

    // Filter by search query (includes tags now)
    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.DisplayId?.toLowerCase().includes(lowerCaseQuery) ||
            item.Description?.toLowerCase().includes(lowerCaseQuery) ||
            item.id?.toLowerCase().includes(lowerCaseQuery) ||
            (item.Class && item.Class.toLowerCase().includes(lowerCaseQuery)) ||
            (slotTypeMap[item.SlotType] && slotTypeMap[item.SlotType].toLowerCase().includes(lowerCaseQuery)) ||
            (item.Tag && item.Tag.toLowerCase().includes(lowerCaseQuery)) // Search by tag
        );
    }

    if (filteredItems.length === 0) {
        itemDisplayArea.innerHTML = '<p style="text-align: center; color: #bbb;">No items found matching your criteria.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';

        // Construct image URL from the new icons/items folder
        // Use item.id to create the file name, assuming PNG format
        const itemImageName = item.id.replace(/[^a-zA-Z0-9]/g, ''); // Sanitize ID for filename
        const imagePath = `icons/items/${itemImageName}.png`;

        // Fallback image using placehold.co in case the specific image is not found
        const fallbackImageUrl = `https://placehold.co/100x100/FF69B4/FFFFFF?text=${item.DisplayId ? item.DisplayId.split(' ')[0] : 'ITEM'}`;

        itemCard.innerHTML = `
            <img src="${imagePath}" alt="${item.DisplayId || item.id} Icon" onerror="this.onerror=null;this.src='${fallbackImageUrl}';">
            <h3>${item.DisplayId || item.id}</h3>
            <div class="item-tag ${item.Tag.toLowerCase()}">${item.Tag}</div> <!-- Display the tag with dynamic class for styling -->
            <p><strong>Type:</strong> <span>${slotTypeMap[item.SlotType] || 'N/A'}</span></p>
            <p><strong>Description:</strong> ${item.Description || 'No description provided.'}</p>
            ${item.Damage ? `<p><strong>Damage:</strong> <span>${item.Damage}</span></p>` : ''}
            ${item.RateOfFire ? `<p><strong>Rate of Fire:</strong> <span>${item.RateOfFire}</span></p>` : ''}
            ${item.MPCost ? `<p><strong>MP Cost:</strong> <span>${item.MPCost}</span></p>` : ''}
            ${item.Defense ? `<p><strong>Defense:</strong> <span>${item.Defense}</span></p>` : ''}
            ${item.StatBoost ? `<p><strong>Stat Boost:</strong> <span>${item.StatBoost}</span></p>` : ''}
            <!-- Add more item properties as needed based on your XML structure -->
        `;
        itemDisplayArea.appendChild(itemCard);
    });
}


// --- How to Play Page Specific Functions (Server Status) ---
function updateServerStatus(status) {
    if (serverStatusText && serverStatusCircle) {
        if (status === 'Online') {
            serverStatusText.textContent = 'Online';
            serverStatusCircle.classList.remove('offline');
            serverStatusCircle.classList.add('online');
        } else if (status === 'Down') {
            serverStatusText.textContent = 'Down';
            serverStatusCircle.classList.remove('online');
            serverStatusCircle.classList.add('offline');
        } else {
            // Default or 'Checking...' state
            serverStatusText.textContent = 'Checking...';
            serverStatusCircle.classList.remove('online', 'offline');
        }
    }
}


// --- DOM Content Loaded Event Listener ---
document.addEventListener('DOMContentLoaded', async () => {
    // Determine the current page
    const currentPage = window.location.pathname.split('/').pop();
    const isShopPage = document.body.id === 'shop-page';
    const isWikiPage = document.body.id === 'wiki-page';
    const isHowToPlayPage = document.body.id === 'howtoplay-page';

    // Set active button in nav for all pages
    const navButtons = document.querySelectorAll('nav .button');
    navButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').endsWith(currentPage)) {
            button.classList.add('active-button');
        } else {
            button.classList.remove('active-button');
        }
    });

    // Load cart and credit on page load (common to all pages with header elements)
    updateStoreCreditDisplay();
    updateCartCount();

    // Shop page specific logic
    if (isShopPage) {
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'flex';
        if (cartButton) cartButton.style.display = 'flex'; // Ensure cart button is visible
        renderProducts(); // Renders products for all sections on shop page
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        if (checkoutButton) checkoutButton.addEventListener('click', checkout);
    } else {
        // Hide shop-specific elements on other pages if they exist
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none';
    }

    // Wiki page specific logic
    if (isWikiPage) {
        await fetchItemsData(); // Fetch and parse items.txt
        displayItems(); // Display all items initially

        // Attach event listeners to item type links
        itemTypeLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                const slotType = event.target.dataset.slottype;
                if (wikiSearchInput) wikiSearchInput.value = ''; // Clear search bar when category is clicked
                displayItems(slotType); // Filter and display items by SlotType
            });
        });

        // Attach event listener for the search bar
        if (wikiSearchInput) {
            wikiSearchInput.addEventListener('input', (event) => {
                const query = event.target.value;
                displayItems(null, query); // Display items filtered by search query
            });
        }
    }

    // How to Play page specific logic (for server status)
    if (isHowToPlayPage) {
        // Initial status set to 'Checking...' or from a default
        updateServerStatus('Checking...');

        if (setServerStatusButton && serverStatusDropdown) {
            setServerStatusButton.addEventListener('click', () => {
                const selectedStatus = serverStatusDropdown.value;
                updateServerStatus(selectedStatus);
            });
        }
    }


    // Common modal close listeners (for shop modals, if they exist on the page)
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
});
