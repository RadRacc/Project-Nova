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

// --- FUNCTIONS (SHOP) ---

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

// --- WIKI LOGIC ---
let allWikiItems = []; // Store all parsed items
let currentCategory = 'all';
let currentSubcategory = null;
let currentSearchTerm = '';

const itemSearchBar = document.getElementById('item-search-bar');
const categoryButtonsContainer = document.querySelector('#wiki-content .category-buttons');
const subcategoryContainer = document.getElementById('subcategory-container');
const subcategoryButtonsContainer = document.querySelector('#subcategory-container .subcategory-buttons');
const itemDisplayArea = document.getElementById('item-display-area');

// Mapping SlotType to display categories/subcategories
// These correspond to the <SlotType> XML tag
const slotTypeToCategory = {
    // Weapons
    '1': { main: 'equipment', sub: 'Swords' },
    '2': { main: 'equipment', sub: 'Daggers' },
    '3': { main: 'equipment', sub: 'Bows' },
    '8': { main: 'equipment', sub: 'Staffs' },
    '9': { main: 'equipment', sub: 'Wands' },
    '33': { main: 'equipment', sub: 'Katanas' },
    '44': { main: 'equipment', sub: 'Wands' }, // Crystal Wand
    '45': { main: 'equipment', sub: 'Daggers' }, // Kunai (Dagger-like)
    '46': { main: 'equipment', sub: 'Heavy Weapons' }, // Scythe (assuming it's a heavy weapon)

    // Armors
    '17': { main: 'equipment', sub: 'Heavy Armor' }, // Plate Armor
    '18': { main: 'equipment', sub: 'Light Armor' }, // Leather Armor
    '19': { main: 'equipment', sub: 'Robes' }, // Robe
    '24': { main: 'equipment', sub: 'Heavy Armor' }, // Helm (Heavy)
    '27': { main: 'equipment', sub: 'Heavy Armor' }, // Shield (Heavy)
    '47': { main: 'equipment', sub: 'Heavy Armor' }, // Chainmail
    '48': { main: 'equipment', sub: 'Heavy Armor' }, // Heavy Helm
    '49': { main: 'equipment', sub: 'Heavy Armor' }, // Heavy Shield
    '50': { main: 'equipment', sub: 'Heavy Armor' }, // Heavy Armor
    '51': { main: 'equipment', sub: 'Light Armor' }, // Light Armor
    '52': { main: 'equipment', sub: 'Light Armor' }, // Light Helm
    '53': { main: 'equipment', sub: 'Light Armor' }, // Light Shield
    '54': { main: 'equipment', sub: 'Light Armor' }, // Light Armor
    '55': { main: 'equipment', sub: 'Robes' }, // Robe
    '56': { main: 'equipment', sub: 'Robes' }, // Robe Helm
    '57': 'equipment', // Robe Shield (No subcategory for this yet, keep as equipment)
    '58': { main: 'equipment', sub: 'Robes' }, // Robe

    // Abilities / Consumables / Rings (categorized as 'abilities' for simplicity, could be 'utility' or 'accessories')
    '20': { main: 'accessories', sub: 'Rings' }, // Ring
    '21': { main: 'consumables', sub: 'Potions' }, // Potion (Health, Mana, Stat Potions)
    '25': { main: 'abilities', sub: 'Quivers' }, // Quiver (Ranger ability)
    '26': { main: 'abilities', sub: 'Tomes' }, // Tome (Priest ability)
    '28': { main: 'abilities', sub: 'Cloaks' }, // Cloak (Rogue ability)
    '29': { main: 'abilities', sub: 'Sheaths' }, // Sheath (Samurai ability)
    '30': { main: 'abilities', sub: 'Orbs' }, // Orb (Mystic ability)
    '31': { main: 'abilities', sub: 'Poisons' }, // Poison (Assassin ability)
    '32': { main: 'abilities', sub: 'Scepters' }, // Scepter (Sorcerer ability)
    '34': { main: 'abilities', sub: 'Skulls' }, // Skull (Necromancer ability)
    '35': { main: 'abilities', sub: 'Seals' }, // Seal (Paladin ability)
    '36': { main: 'abilities', sub: 'Spells' }, // Spell (Wizard ability)
    '37': { main: 'abilities', sub: 'Stars' }, // Star (Ninja ability)
    '38': { main: 'abilities', sub: 'Lutes' }, // Lute (Bard ability)
    '39': { main: 'abilities', sub: 'Traps' }, // Trap (Huntress ability)
    '40': { main: 'abilities', sub: 'Prisms' }, // Prism (Trickster ability)
    '41': { main: 'abilities', sub: 'Effusions' }, // Effusion
    '42': { main: 'abilities', sub: 'Scabbards' }, // Scabbard
    '43': { main: 'abilities', sub: 'Orbs' }, // Orb of Aether
};


// Function to fetch and parse items.txt
async function loadWikiItems() {
    try {
        const response = await fetch('items.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const objectElements = xmlDoc.querySelectorAll('Object[Item]'); // Only get elements that are items
        allWikiItems = Array.from(objectElements).map(objElement => {
            const id = objElement.getAttribute('id');
            const typeHex = objElement.getAttribute('type'); // Hex ID for texture lookup
            const description = objElement.querySelector('Description')?.textContent || 'No description.';
            const slotType = objElement.querySelector('SlotType')?.textContent; // Numeric SlotType

            let category = 'misc';
            let subcategoryName = 'Other';

            if (slotType && slotTypeToCategory[slotType]) {
                const mapping = slotTypeToCategory[slotType];
                category = mapping.main || 'misc';
                subcategoryName = mapping.sub || 'Other';
            } else {
                 // Fallback for items without a clear SlotType mapping or if SlotType is missing
                 const itemClass = objElement.querySelector('Class')?.textContent;
                 if (itemClass === 'Equipment') {
                     category = 'equipment';
                     subcategoryName = 'Miscellaneous Equipment';
                 } else if (itemClass === 'Ability') { // Assuming abilities have <Class>Ability</Class>
                     category = 'abilities';
                     subcategoryName = 'Miscellaneous Abilities';
                 } else if (objElement.querySelector('Usable')) { // Generic usable items
                     category = 'consumables';
                     subcategoryName = 'Consumables';
                 }
            }


            // Extract Texture File and Index for image display
            const textureFile = objElement.querySelector('Texture File')?.textContent || 'lofiObj5'; // Default to a common texture file
            const textureIndex = objElement.querySelector('Texture Index')?.textContent || '0x00'; // Default to 0x00


            // Calculate image position within a 16-column sheet to generate a placeholder sprite
            // This is a conceptual placeholder as actual sprite sheet parsing and rendering is complex.
            // For now, we'll use a dynamic placeholder image service.
            const indexDecimal = parseInt(textureIndex, 16);
            const spriteRow = Math.floor(indexDecimal / 16) + 1;
            const spriteCol = (indexDecimal % 16) + 1;
            const spriteSize = 16; // Standard RotMG sprite size

            // Placeholder image URL
            const itemImageSrc = `https://placehold.co/${spriteSize}x${spriteSize}/333333/FFFFFF?text=${id.substring(0, 3)}`; // Placeholder with first 3 chars of ID

            // If you had actual individual item icons, you would use a path like:
            // `icons/items/${id}.png` or `icons/item_type_${typeHex}.png`

            // Projectile info (if exists)
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
                id: id,
                typeHex: typeHex, // Original Hex ID
                description: description.replace(/\\n/g, '<br>'), // Replace \n with <br> for HTML rendering
                slotType: slotType, // Numeric SlotType
                category: category, // 'equipment', 'abilities', 'consumables', 'misc'
                subcategory: subcategoryName, // 'Swords', 'Robes', 'Spells', 'Potions' etc.
                textureFile: textureFile,
                textureIndex: textureIndex,
                itemImageSrc: itemImageSrc, // The generated placeholder image
                projectileInfo: projectileInfo, // Add projectile details
            };
        });

        console.log("Loaded Items:", allWikiItems); // Debugging
        // Initial render of all items
        renderWikiItems(currentCategory, currentSubcategory, currentSearchTerm);
        if (itemDisplayArea) {
            itemDisplayArea.innerHTML = ''; // Clear loading message if successful
        }


    } catch (e) {
        console.error("Failed to load or parse items.txt:", e);
        if (itemDisplayArea) {
            itemDisplayArea.innerHTML = '<p>Error loading items. Please ensure "items.txt" is in the correct directory and valid XML format, then try again.</p>';
        }
    }
}

// Function to render items on the wiki page based on filters and search
function renderWikiItems(filterCategory, filterSubcategory, searchTerm) {
    if (!itemDisplayArea) return;

    itemDisplayArea.innerHTML = ''; // Clear previous items

    let itemsToRender = allWikiItems;

    // Apply main category filter
    if (filterCategory !== 'all') {
        itemsToRender = itemsToRender.filter(item => item.category === filterCategory);
    }

    // Apply subcategory filter
    if (filterSubcategory && filterSubcategory !== currentCategory) { // Only filter by subcategory if one is selected and not the main 'all'
         itemsToRender = itemsToRender.filter(item => item.subcategory === filterSubcategory);
    }

    // Apply search term filter
    if (searchTerm !== '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        itemsToRender = itemsToRender.filter(item =>
            item.id.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    // Sort items alphabetically by ID for consistent display
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
                <p><strong>Projectile:</strong> ${item.projectileInfo.objectId || 'N/A'}</p>
                <ul>
                    <li>Min Damage: ${item.projectileInfo.minDamage || 'N/A'}</li>
                    <li>Max Damage: ${item.projectileInfo.maxDamage || 'N/A'}</li>
                    <li>Speed: ${item.projectileInfo.speed || 'N/A'}</li>
                    <li>Lifetime: ${item.projectileInfo.lifetimeMS || 'N/A'}ms</li>
                    ${item.projectileInfo.conditionEffect ? `<li>Effect: ${item.projectileInfo.conditionEffect}</li>` : ''}
                </ul>
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

// Function to update subcategory buttons based on the main category selected
function updateSubcategories(selectedCategory) {
    subcategoryButtonsContainer.innerHTML = '';
    let subcategoriesToShow = [];

    // Define subcategories based on main categories
    if (selectedCategory === 'equipment') {
        subcategoriesToShow = [
            { name: 'All Equipment', filter: 'equipment-all' }, // Special filter for "all equipment"
            { name: 'Swords', filter: 'Swords' },
            { name: 'Daggers', filter: 'Daggers' },
            { name: 'Bows', filter: 'Bows' },
            { name: 'Staffs', filter: 'Staffs' },
            { name: 'Wands', filter: 'Wands' },
            { name: 'Katanas', filter: 'Katanas' },
            { name: 'Heavy Weapons', filter: 'Heavy Weapons' }, // For Scythes etc.
            { name: 'Heavy Armor', filter: 'Heavy Armor' },
            { name: 'Light Armor', filter: 'Light Armor' },
            { name: 'Robes', filter: 'Robes' },
            { name: 'Rings', filter: 'Rings' },
        ];
    } else if (selectedCategory === 'abilities') {
        subcategoriesToShow = [
            { name: 'All Abilities', filter: 'abilities-all' }, // Special filter for "all abilities"
            { name: 'Spells', filter: 'Spells' },
            { name: 'Tomes', filter: 'Tomes' },
            { name: 'Seals', filter: 'Seals' },
            { name: 'Shields', filter: 'Shields' }, // RotMG shields are abilities for Knight/Paladin
            { name: 'Poisons', filter: 'Poisons' },
            { name: 'Cloaks', filter: 'Cloaks' },
            { name: 'Quivers', filter: 'Quivers' },
            { name: 'Skulls', filter: 'Skulls' },
            { name: 'Scepters', filter: 'Scepters' },
            { name: 'Stars', filter: 'Stars' },
            { name: 'Lutes', filter: 'Lutes' },
            { name: 'Traps', filter: 'Traps' },
            { name: 'Prisms', filter: 'Prisms' },
            { name: 'Effusions', filter: 'Effusions'},
            { name: 'Scabbards', filter: 'Scabbards'},
            { name: 'Orbs', filter: 'Orbs'},
        ];
    } else if (selectedCategory === 'consumables') {
        subcategoriesToShow = [
            { name: 'All Consumables', filter: 'consumables-all' },
            { name: 'Potions', filter: 'Potions' } // If there are other types of consumables besides Potions, add them
        ];
    }


    if (subcategoriesToShow.length > 0) {
        subcategoryContainer.style.display = 'block';
        subcategoriesToShow.forEach(sub => {
            const button = document.createElement('button');
            button.className = 'subcategory-button';
            button.textContent = sub.name;
            button.dataset.subcategory = sub.filter;
            // Set initial active state for subcategories (e.g., if 'All Equipment' is default)
            if (currentSubcategory === null && sub.filter.includes('-all')) {
                 button.classList.add('active'); // Activate 'All X' button by default for its category
                 currentSubcategory = sub.filter; // Set currentSubcategory to 'all' for the specific category
            } else if (currentSubcategory === sub.filter) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                currentSubcategory = sub.filter;
                // Deactivate all subcategory buttons
                document.querySelectorAll('.subcategory-button').forEach(btn => btn.classList.remove('active'));
                // Activate clicked button
                button.classList.add('active');
                renderWikiItems(currentCategory, currentSubcategory, currentSearchTerm);
            });
            subcategoryButtonsContainer.appendChild(button);
        });
    } else {
        subcategoryContainer.style.display = 'none';
        currentSubcategory = null; // Ensure subcategory is null if no subcategories exist
    }
    // Handle the case where a main category without subcategories is selected
    // or if 'all' is selected, ensure subcategory filter is cleared/managed
    if (selectedCategory === 'all') {
        subcategoryContainer.style.display = 'none';
        currentSubcategory = null;
    }
}


// --- DOM Content Loaded Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Load cart and credit on page load
    updateStoreCreditDisplay(); // This also loads from localStorage
    updateCartCount(); // This also loads from localStorage

    const isShopPage = document.body.id === 'shop-page';
    const isWikiPage = document.body.id === 'wiki-page';


    if (isShopPage) {
        // Ensure store credit display is visible on shop page
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'inline-flex';
        // Ensure cart button is visible on shop page
        if (cartButton) cartButton.style.display = 'inline-flex';

        renderProducts(); // Render products only on shop page
        if (addCreditButton) addCreditButton.addEventListener('click', addCredit);
        if (cartButton) cartButton.addEventListener('click', openCartModal);
        if (checkoutButton) checkoutButton.addEventListener('click', checkout);
    } else if (isWikiPage) {
        loadWikiItems(); // Load and render wiki items on wiki page

        if (itemSearchBar) {
            itemSearchBar.addEventListener('input', (event) => {
                currentSearchTerm = event.target.value;
                renderWikiItems(currentCategory, currentSubcategory, currentSearchTerm);
            });
        }

        if (categoryButtonsContainer) {
            categoryButtonsContainer.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('category-button')) {
                    // Deactivate all category buttons
                    document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
                    // Activate clicked button
                    target.classList.add('active');

                    currentCategory = target.dataset.category;
                    currentSubcategory = null; // Reset subcategory when main category changes
                    updateSubcategories(currentCategory); // Update subcategory buttons based on new main category
                    renderWikiItems(currentCategory, currentSubcategory, currentSearchTerm);
                }
            });
        }
        // Initial setup for subcategories based on default 'all' or actual category
        updateSubcategories(currentCategory);
        // Ensure 'All Items' category button is active on load
        document.querySelector('.category-button[data-category="all"]').classList.add('active');
    } else {
        // Hide shop-specific elements on other pages
        if (storeCreditDisplay) storeCreditDisplay.style.display = 'none';
        if (cartButton) cartButton.style.display = 'none';
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
    // Close button for cart modal is inside its content, so target it specifically
    const closeCartModalButtonElement = cartModal ? cartModal.querySelector('.close-button') : null;
    if (closeCartModalButtonElement) {
        closeCartModalButtonElement.addEventListener('click', closeCartModal);
    }
    if (cartModal) {
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    }
});
