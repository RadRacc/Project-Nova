// Smooth scrolling for internal navigation links (e.g., #section)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default and scroll if it's an internal hash link
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Shop Page - Store Credit & Purchase Functionality
    const storeCreditElement = document.getElementById('store-credit-amount');
    const addCreditButton = document.getElementById('add-credit-button');
    const buyButtons = document.querySelectorAll('.buy-button'); // Select all purchase buttons

    let storeCredit = localStorage.getItem('projectNovaCredit') ? parseFloat(localStorage.getItem('projectNovaCredit')) : 0.00;

    // Function to update the displayed credit
    function updateStoreCreditDisplay() {
        if (storeCreditElement) {
            storeCreditElement.textContent = storeCredit.toFixed(2);
        }
    }

    // Initialize display on load
    updateStoreCreditDisplay();

    // Add Credit Button Listener
    if (addCreditButton) {
        addCreditButton.addEventListener('click', function() {
            const amountToAdd = 10.00; // Amount to add per click
            storeCredit += amountToAdd;
            updateStoreCreditDisplay();
            localStorage.setItem('projectNovaCredit', storeCredit.toFixed(2)); // Save to local storage
            alert(`$${amountToAdd.toFixed(2)} added! Your new balance is $${storeCredit.toFixed(2)}.`);
        });
    }

    // Purchase Button Listener
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemPrice = parseFloat(this.dataset.price); // Get price from data-price attribute
            const itemName = this.closest('.product-tile').querySelector('h3').textContent; // Get item name

            if (isNaN(itemPrice)) {
                alert("Error: Item price not found.");
                return;
            }

            if (storeCredit >= itemPrice) {
                storeCredit -= itemPrice;
                updateStoreCreditDisplay();
                localStorage.setItem('projectNovaCredit', storeCredit.toFixed(2));
                alert(`You have successfully purchased "${itemName}" for $${itemPrice.toFixed(2)}! Your remaining balance is $${storeCredit.toFixed(2)}.`);
            } else {
                alert(`Not enough store credit to purchase "${itemName}"! You need $${(itemPrice - storeCredit).toFixed(2)} more.`);
            }
        });
    });
});
