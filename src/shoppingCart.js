
// Config for data pricing is stored in JSON file. We can do also in ENV file or database, but I chose since this is for exercise purposes only.
const pricingData = require('./dataPricingConfig.json');

const dataPackagePricing = {
    "ult_small": parseFloat(pricingData.ult_small),
    "ult_medium": parseFloat(pricingData.ult_medium),
    "ult_large": parseFloat(pricingData.ult_large),
    "1gb": parseFloat(pricingData["1gb"]),
};

const promoCode = pricingData.promo_code;

class ShoppingCart {
    constructor() {
        this.dataPackagePricing = dataPackagePricing;
        this.cart = {};
        this.totalPrice = 0;
        this.totalItems = {};
    }

    addToCart(selectedDataPackage, quantity) {
        if (!this.dataPackagePricing[selectedDataPackage]) {
            throw new Error("Package does not exist!");
        }
        this.cart[selectedDataPackage] = (this.cart[selectedDataPackage] || 0) + quantity;
    }

    updateCart(selectedDataPackage, quantity) {
        if (!this.dataPackagePricing[selectedDataPackage]) {
            throw new Error("Package does not exist!");
        }
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0!");
        }
        this.cart[selectedDataPackage] = quantity;
    }

    removeItem(selectedDataPackage) {
        if (!this.cart[selectedDataPackage]) {
            throw new Error("Item not found in cart!");
        }
        delete this.cart[selectedDataPackage];
    }

    total(appliedPromoCode) {
        let freeItems = {};
        this.totalItems = { ...this.cart };
        this.totalPrice = 0;

        for (let productName in this.cart) {
            const itemCount = this.cart[productName];
            const itemPrice = this.dataPackagePricing[productName];

            if (pricingData.is_promo_open) { // apply promos if enabled (true) - added feature
            // logic for the special promo offers
                if (productName === "ult_small" && itemCount >= 3) {
                    // throw 1 if count > 3  then multiply to 2 for the price
                    this.totalPrice += Math.floor(itemCount / 3) * 2 * itemPrice // price 2 for 3 data package formula
                        + (itemCount % 3) * itemPrice; // no price change for 4th data promo package
                } else if (productName === "ult_large" && itemCount > 3) {
                    this.totalPrice += itemCount * 39.90;  //price dropped for ult_large
                } else if (productName === "ult_medium") {
                    this.totalPrice += itemCount * itemPrice;
                    freeItems["1gb"] = (freeItems["1gb"] || 0) + itemCount;
                } else {
                    this.totalPrice += itemCount * itemPrice;
                }
            } else { // don't apply if disabled (false)
                this.totalPrice += itemCount * itemPrice;
            }

        }

        for (let productName in freeItems) {
            this.totalItems[productName] = (this.totalItems[productName] || 0) + freeItems[productName];
        }

        if (appliedPromoCode === promoCode) {
            this.totalPrice *= 0.9; // Apply 10% discount
        }

        return this.totalPrice.toFixed(2);
    }
}

module.exports = { ShoppingCart };
