
const express = require('express');
const { ShoppingCart } = require('./shoppingCart');
const router = express.Router();

const shoppingCart = new ShoppingCart();

router.post('/add', (req, res) => {
    const { product, quantity } = req.body;
    try {
        shoppingCart.addToCart(product, quantity);
        res.status(200).json({ message: `${product} added to cart.`, cart: shoppingCart.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/update', (req, res) => {
    const { product, quantity } = req.body;
    try {
        shoppingCart.updateCart(product, quantity);
        res.status(200).json({ message: `${product} updated.`, cart: shoppingCart.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', (req, res) => {
    res.status(200).json({ cart: shoppingCart.cart });
});

router.post('/checkout', (req, res) => {
    const { promoCode } = req.body;
    try {
        const totalPrice = shoppingCart.total(promoCode);
        res.status(200).json({
            message: "Checkout successful.",
            totalPrice,
            totalItems: shoppingCart.totalItems,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/remove', (req, res) => {
    const { product } = req.body;
    try {
        shoppingCart.removeItem(product);
        res.status(200).json({ message: `${product} removed from cart.`, cart: shoppingCart.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
