const { ShoppingCart } = require('../src/shoppingCart');

describe('ShoppingCart Tests', () => {

    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    test('Scenario 1: 3 ult_small, 1 ult_large', () => {
        cart.addToCart("ult_small", 3);
        cart.addToCart("ult_large", 1);
        const total = cart.total();
        const expectedTotal = 94.70;
        const expectedItems = { ult_small: 3, ult_large: 1 };

        expect(parseFloat(total)).toBeCloseTo(expectedTotal, 2);
        expect(cart.totalItems).toEqual(expectedItems);
    });

    test('Scenario 2: 2 ult_small, 4 ult_large', () => {
        cart.addToCart("ult_small", 2);
        cart.addToCart("ult_large", 4);
        const total = cart.total();
        const expectedTotal = 209.40;
        const expectedItems = { ult_small: 2, ult_large: 4 };

        expect(parseFloat(total)).toBeCloseTo(expectedTotal, 2);
        expect(cart.totalItems).toEqual(expectedItems);
    });

    test('Scenario 3: 1 ult_small, 2 ult_medium', () => {
        cart.addToCart("ult_small", 1);
        cart.addToCart("ult_medium", 2);
        const total = cart.total();
        const expectedTotal = 84.70;
        const expectedItems = { ult_small: 1, ult_medium: 2, '1gb': 2 };

        expect(parseFloat(total)).toBeCloseTo(expectedTotal, 2);
        expect(cart.totalItems).toEqual(expectedItems);
    });

    test('Scenario 4: 1 ult_small, 1 1gb with Promo Code', () => {
        cart.addToCart("ult_small", 1);
        cart.addToCart("1gb", 1);
        const total = cart.total("I<3AMAYSIM");
        const expectedTotal = 31.32;
        const expectedItems = { ult_small: 1, '1gb': 1 };

        expect(parseFloat(total)).toBeCloseTo(expectedTotal, 2);
        expect(cart.totalItems).toEqual(expectedItems);
    });

});

