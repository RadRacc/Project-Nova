// Smooth scrolling for internal navigation links (e.g., #section)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default and scroll if it's an internal hash link AND not the current page's link
            // We want real page navigation for shop.html, about.html, etc.
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

    // Shop Page - Store Credit Functionality
    const storeCreditElement = document.getElementById('store-credit-amount');
    const addCreditButton = document.getElementById('add-credit-button');

    if (storeCreditElement && addCreditButton) {
        let storeCredit = localStorage.getItem('projectNovaCredit') ? parseFloat(localStorage.getItem('projectNovaCredit')) : 0.00;
        storeCreditElement.textContent = storeCredit.toFixed(2);

        addCreditButton.addEventListener('click', function() {
            const amountToAdd = 10.00; // Amount to add per click
            storeCredit += amountToAdd;
            storeCreditElement.textContent = storeCredit.toFixed(2);
            localStorage.setItem('projectNovaCredit', storeCredit.toFixed(2)); // Save to local storage
            alert(`$${amountToAdd.toFixed(2)} added! Your new balance is $${storeCredit.toFixed(2)}.`);
        });
    }

    // You could add a simple "buy" button functionality here later, e.g.:
    // document.querySelectorAll('.buy-button').forEach(button => {
    //     button.addEventListener('click', function() {
    //         const price = parseFloat(this.dataset.price); // Assumes you add data-price to buttons
    //         if (storeCredit >= price) {
    //             storeCredit -= price;
    //             storeCreditElement.textContent = storeCredit.toFixed(2);
    //             localStorage.setItem('projectNovaCredit', storeCredit.toFixed(2));
    //             alert(`Purchased for $${price.toFixed(2)}! Remaining balance: $${storeCredit.toFixed(2)}.`);
    //         } else {
    //             alert("Not enough store credit!");
    //         }
    //     });
    // });
});
