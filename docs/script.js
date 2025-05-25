document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav .button');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        // Adjusted for potential leading/trailing slashes for more robust comparison
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

    // --- Store Credit Logic ---
    const storeCreditAmountSpan = document.getElementById('store-credit-amount');
    const addCreditButton = document.getElementById('add-credit-button');
    let storeCredit = parseFloat(localStorage.getItem('storeCredit')) || 0;

    function updateStoreCreditDisplay() {
        if (storeCreditAmountSpan) {
            storeCreditAmountSpan.textContent = storeCredit.toFixed(2);
        }
    }

    if (addCreditButton) {
        addCreditButton.addEventListener('click', () => {
            storeCredit += 10;
            localStorage.setItem('storeCredit', storeCredit.toFixed(2));
            updateStoreCreditDisplay();
            alert('Successfully added $10 to your store credit!');
        });
    }

    // Initial display of store credit (should be called once DOM is ready)
    updateStoreCreditDisplay();

    // --- Product Data (Crucial for View Details Modal) ---
    const products = {
        "supporter-role": {
            name: "Supporter Role",
            price: 5.00,
            image: "icons/supporterpackage.png",
            description: "Gain access to exclusive Discord channels, custom chat color, and a special in-game title to show your support!",
            benefits: [
                "Exclusive Discord Role",
                "Custom Chat Color (Pink)",
                "In-game 'Supporter' Badge",
                "Access to Supporter-only Discord channels",
                "Access to /size /glow /glowcolor commands",
                "Personal 25% Loot Boost"
            ]
        },
        "supporter-plus-role": {
            name: "Supporter+ Role",
            price: 10.00,
            image: "icons/supporter+package.png",
            description: "All benefits of Supporter, plus a unique in-game pet, access to pre-release content, and more!",
            benefits: [
                "All Supporter benefits",
                "Custom Chat Color (Pink, Purple)",
                "Exclusive In-game Pet (Cosmetic)",
                "Access to Pre-Release Content (3 Days before release)",
                "Monthly exclusive items",
                "Personal 80% Loot Boost"
            ]
        },
        "supporter-plusplus-role": {
            name: "Supporter++ Role",
            price: 20.00,
            image: "icons/supporter++package.png",
            description: "The ultimate supporter package! All previous benefits plus custom sprite, and more server perks.",
            benefits: [
                "All Supporter and Supporter+ benefits",
                "Custom Chat Color (Pink, Purple, Orange)", // <--- THIS WAS THE MISSING COMMA!
                "Personal Sprite (Add your own asset! [within reason])",
                "Access to Pre-Release Content (7 Days before release)",
                "Direct contact with Developers",
                "Custom Vault Skin",
                "Custom Character Skins (All Classes + future ones)",
                "Personal 150% Loot Boost"
            ]
        },
        "lootboost-20": {
            name: "Global Loot Boost +20% (1 Day)",
            price: 5.00,
            image: "icons/globallootboost20.png",
            description: "Activate a server-wide +20% increase in loot drop rates for 1 Day!",
            benefits: [
                "Global 20% Loot Boost (1 Day)",
                "Stacks with other Loot Boost purchases"
            ]
        },
        "lootboost-80": {
            name: "Global Loot Boost +80% (3 Days)",
            price: 10.00,
            image: "icons/globallootboost80.png",
            description: "Activate a significant server-wide +80% increase in loot drop rates for 3 Days!",
            benefits: [
                "Global 80% Loot Boost (3 Days)",
                "Stacks with other Loot Boost purchases"
            ]
        },
        "lootboost-150": {
            name: "Global Loot Boost +150%",
            price: 20.00,
            image: "icons/globallootboost150.png",
            description: "Unleash the ultimate loot frenzy with a massive +150% Global Loot Boost for 5 Days!",
            benefits: [
                "Global 150% Loot Boost (5 Days)",
                "Stacks with other Loot Boost purchases"
            ]
        },
        "small-currency-pack": {
            name: "Small Currency Pack",
            price: 5.00,
            image: "icons/smallcurrencypack.png",
            description: "A small boost to your in-game currency, perfect for minor purchases or getting started.",
            benefits: [
                "500 Gold",
                "1,000 Fame",
                "20 Shadow Shards"
            ]
        },
        "medium-currency-pack": {
            name: "Medium Currency Pack",
            price: 10.00,
            image: "icons/mediumcurrencypack.png",
            description: "A medium currency pack for more substantial in-game needs. Get more for your money!",
            benefits: [
                "1,000 Gold + 250 Bonus",
                "2,500 Fame + 500 Bonus",
                "50 Shadow Shards + 20 Bonus"
            ]
        },
        "large-currency-pack": {
            name: "Large Currency Pack",
            price: 25.00,
            image: "icons/largecurrencypack.png",
            description: "A generous currency pack for serious players, enabling significant upgrades and purchases.",
            benefits: [
                "2,500 Gold + 1,000 Bonus",
                "5,000 Fame + 1,000 Bonus",
                "100 Shadow Shards + 50 Bonus"
            ]
        },
        "massive-currency-pack": {
            name: "Massive Currency Pack",
            price: 40.00,
            image: "icons/massivecurrencypack.png",
            description: "The ultimate currency pack! Maximize your in-game wealth with a huge injection of gold.",
            benefits: [
                "6,000 Gold + 1,500 Bonus",
                "10,000 Fame + 2,500 Bonus",
                "150 Shadow Shards + 50 Bonus"
            ]
        }
    };

    // --- Modal Elements ---
    const productDetailsModal = document.getElementById('product-details-modal');
    const closeButton = document.querySelector('.modal .close-button'); // This selects the first close button in a modal
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductBenefits = document.getElementById('modal-product-benefits');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalPurchaseButton = document.getElementById('modal-purchase-button');

    // --- DEBUGGING: Check if modal elements are found ---
    console.log('Modal Element:', productDetailsModal);
    console.log('Close Button:', closeButton);
    if (!productDetailsModal) console.error("Error: #product-details-modal not found. HTML ID might be incorrect.");
    if (!closeButton) console.error("Error: .modal .close-button not found. CSS selector might be incorrect or element missing.");


    // Function to handle purchase (called from both quick buy and modal buy)
    function handlePurchase(productId, itemPrice) {
        if (storeCredit >= itemPrice) {
            storeCredit -= itemPrice;
            localStorage.setItem('storeCredit', storeCredit.toFixed(2));
            updateStoreCreditDisplay();
            alert(`You successfully purchased ${products[productId].name} for $${itemPrice.toFixed(2)}! Your new credit is $${storeCredit.toFixed(2)}.`);
        } else {
            alert(`Not enough store credit! You need $${itemPrice.toFixed(2)} but only have $${storeCredit.toFixed(2)}.`);
        }
    }

    // --- Add to Cart (Quick Buy) Button Click Handler ---
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = button.dataset.productId;
            const itemPrice = parseFloat(button.dataset.price);
            if (productId && !isNaN(itemPrice)) {
                handlePurchase(productId, itemPrice);
            } else {
                console.error("Missing product ID or price for Add to Cart button.");
            }
        });
    });

    // --- View Details Button Click Handler ---
    document.querySelectorAll('.view-details-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = button.dataset.productId;
            const product = products[productId]; // Accessing product correctly from the object

            if (product) {
                // Populate modal with product details
                if (modalProductImage) {
                    modalProductImage.src = product.image;
                    modalProductImage.alt = product.name;
                }
                if (modalProductName) modalProductName.textContent = product.name;
                if (modalProductDescription) modalProductDescription.textContent = product.description;
                if (modalProductPrice) modalProductPrice.textContent = product.price.toFixed(2);

                // Clear previous benefits and add new ones
                if (modalProductBenefits) {
                    modalProductBenefits.innerHTML = '';
                    // Ensure 'benefits' property exists before iterating
                    if (product.benefits && Array.isArray(product.benefits)) {
                        product.benefits.forEach(benefit => {
                            const listItem = document.createElement('li');
                            listItem.textContent = benefit;
                            modalProductBenefits.appendChild(listItem);
                        });
                    }
                }

                // Set data-product-id and data-price for the purchase button in modal
                if (modalPurchaseButton) {
                    modalPurchaseButton.dataset.productId = productId;
                    modalPurchaseButton.dataset.price = product.price.toFixed(2);
                }

                // Show the modal
                if (productDetailsModal) {
                    productDetailsModal.classList.add('active');
                    console.log(`Modal for ${productId} opened.`);
                }
            } else {
                console.error(`Product with ID "${productId}" not found in products data.`);
            }
        });
    });

    // --- Modal Purchase Button Click Handler ---
    if (modalPurchaseButton) {
        modalPurchaseButton.addEventListener('click', () => {
            const productId = modalPurchaseButton.dataset.productId;
            const itemPrice = parseFloat(modalPurchaseButton.dataset.price);
            if (productId && !isNaN(itemPrice)) {
                handlePurchase(productId, itemPrice);
                if (productDetailsModal) {
                    productDetailsModal.classList.remove('active'); // Hide modal after purchase attempt
                    console.log('Modal closed after purchase attempt.');
                }
            } else {
                console.error("Missing product ID or price for modal purchase button.");
            }
        });
    }

    // --- Close Modal Button Handler ---
    if (closeButton) { // Only add listener if button exists
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked!');
            if (productDetailsModal) {
                productDetailsModal.classList.remove('active');
                console.log('Modal active class removed.');
            }
        });
    }

    // Close modal if user clicks outside of modal content
    if (productDetailsModal) { // Only add listener if modal exists
        productDetailsModal.addEventListener('click', (event) => {
            if (event.target === productDetailsModal) { // Ensure click is on the overlay itself, not content
                console.log('Clicked outside modal content.');
                productDetailsModal.classList.remove('active');
            }
        });
    }
});
