const readline = require('readline');
const { ShoppingCart, dataPackagePricing, promoCode } = require('./shoppingCart'); 

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = () => {
    const cart = new ShoppingCart();

    const displayMenu = () => {
        console.log('\nSelect data package by number:');
        console.log('1. ult_small');
        console.log('2. ult_medium');
        console.log('3. ult_large');
        console.log('4. 1gb');
        console.log('Enter 0 to proceed to checkout.');
    }

    const addItemToCart = () => {
        displayMenu();

        rl.question('Enter your choice: ', (choice) => {
            choice = parseInt(choice);

            if (choice === 0) {
                rl.question('Apply promo code (Press Enter to skip): ', (promoCodeInput) => {
                    console.log("\nTotal Price: ", cart.total(promoCodeInput));
                    console.log("Total Items: ", cart.totalItems);
                    rl.close();
                });
            } else if (choice >= 1 && choice <= 4) {
                const dataPackage = ['ult_small', 'ult_medium', 'ult_large', '1gb'][choice - 1];

                rl.question(`Enter the quantity for ${dataPackage}: `, (quantity) => {
                    quantity = parseInt(quantity);

                    if (isNaN(quantity) || quantity <= 0) {
                        console.log("Please enter a valid quantity.");
                        addItemToCart(); // ask again if quantity is invalid
                    } else {
                        cart.addToCart(dataPackage, quantity);
                        addItemToCart(); // prompt again to add more items
                    }
                });
            } else {
                console.log("Invalid choice. Please select a valid number.");
                addItemToCart(); // ask again if the choice is invalid
            }
        });
    }

    addItemToCart();
}

promptUser();
