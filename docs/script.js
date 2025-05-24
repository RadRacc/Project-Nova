document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav .button');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath) {
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
                "In-game 'Supporter' Title",
                "Access to Supporter-only Discord channels"
            ]
        },
        "supporter-plus-role": {
            name: "Supporter+ Role",
            price: 10.00,
            image: "icons/supporter+package.png",
            description: "All benefits of Supporter, plus a unique in-game pet, access to beta content, and more!",
            benefits: [
                "All Supporter benefits",
                "Exclusive In-game Pet (Cosmetic)",
                "Access to Beta Content (Alpha/Beta testing)",
                "Monthly exclusive items"
            ]
        },
        "supporter-plusplus-role": {
            name: "Supporter++ Role",
            price: 20.00,
            image: "icons/supporter++package.png",
            description: "The ultimate supporter package! All previous benefits plus an exclusive legendary pet, custom sprite access, and more server perks.",
            benefits: [
                "All Supporter+ benefits",
                "Exclusive Legendary In-game Pet",
                "Custom Sprite Access (Personalized Item Sprite)",
                "Early access to all new content",
                "Direct contact with Developers"
            ]
        },
        "lootboost-20": {
            name: "Global Lootboost +20%",
            price: 5.00,
            image: "icons/globallootboost20.png",
            description: "Activate a server-wide 20% increase in loot drop rates for 24 hours!",
            benefits: [
                "Global Lootboost (24 hours)",
                "20% increased drop rates for all players",
                "Notifications for all players"
            ]
        },
        "lootboost-80": {
            name: "Global Lootboost +80%",
            price: 10.00,
            image: "icons/globallootboost80.png",
            description: "A significant 80% boost to loot drop rates for 24 hours, affecting all players on the server!",
            benefits: [
                "Global Lootboost (24 hours)",
                "80% increased drop rates for all players",
                "Major boost for farming sessions"
            ]
        },
        "lootboost-150": {
            name: "Global Lootboost +150%",
            price: 20.00,
            image: "icons/globallootboost150.png",
            description: "Unleash the ultimate loot frenzy with a massive 150% global loot boost for 24 hours!",
            benefits: [
                "Global Lootboost (24 hours)",
                "150% increased drop rates for all players",
                "Unrivaled farming potential"
            ]
        },
        "small-currency-pack": {
            name: "Small Currency Pack",
            price: 5.00,
            image: "icons/smallcurrencypack.png",
            description: "A small boost to your in-game currency, perfect for minor purchases or getting started.",
            benefits: [
                "500 Gold (in-game currency)",
                "Instant delivery to your account"
            ]
        },
        "medium-currency-pack": {
            name: "Medium Currency Pack",
            price: 12.00,
            image: "icons/mediumcurrencypack.png",
            description: "A medium currency pack for more substantial in-game needs. Get more for your money!",
            benefits: [
                "1200 Gold (in-game currency)",
                "Bonus 200 Gold compared to small packs",
                "Instant delivery"
            ]
        },
        "large-currency-pack": {
            name: "Large Currency Pack",
            price: 25.00,
            image: "icons/largecurrencypack.png",
            description: "A generous currency pack for serious players, enabling significant upgrades and purchases.",
            benefits: [
                "3000 Gold (in-game currency)",
                "Bonus 500 Gold compared to smaller packs",
                "Instant delivery"
            ]
        },
        "massive-currency-pack": {
            name: "Massive Currency Pack",
            price: 40.00,
            image: "icons/massivecurrencypack.png",
            description: "The ultimate currency pack! Maximize your in-game wealth with a huge injection of gold.",
            benefits: [
                "5000 Gold (in-game currency)",
                "Best value for large purchases",
                "Instant delivery"
            ]
        }
    };

    // --- Modal Elements ---
    const productDetailsModal = document.getElementById('product-details-modal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductBenefits = document.getElementById('modal-product-benefits');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalPurchaseButton = document.getElementById('modal-purchase-button');

    // --- DEBUGGING: Check if modal elements are found ---
    console.log('Modal Element:', productDetailsModal);
    console.log('Close Button:', closeButton);

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
            const product = products[productId];

            if (product) {
                // Populate modal with product details
                if (modalProductImage) modalProductImage.src = product.image;
                if (modalProductImage) modalProductImage.alt = product.name;
                if (modalProductName) modalProductName.textContent = product.name;
                if (modalProductDescription) modalProductDescription.textContent = product.description;
                if (modalProductPrice) modalProductPrice.textContent = product.price.toFixed(2);

                // Clear previous benefits and add new ones
                if (modalProductBenefits) {
                    modalProductBenefits.innerHTML = '';
                    product.benefits.forEach(benefit => {
                        const listItem = document.createElement('li');
                        listItem.textContent = benefit;
                        modalProductBenefits.appendChild(listItem);
                    });
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
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked!');
            if (productDetailsModal) {
                productDetailsModal.classList.remove('active');
                console.log('Modal active class removed.');
            }
        });
    }

    // Close modal if user clicks outside of modal content
    if (productDetailsModal) {
        productDetailsModal.addEventListener('click', (event) => {
            if (event.target === productDetailsModal) {
                console.log('Clicked outside modal content.');
                productDetailsModal.classList.remove('active');
            }
        });
    }

    // Initial display of store credit
    updateStoreCreditDisplay();
});
