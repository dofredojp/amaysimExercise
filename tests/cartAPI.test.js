const request = require('supertest');
const server = require('../app');

describe('ShoppingCart API Tests', () => {

    let agent;

    beforeAll(() => {
        agent = request(server);
    });

    afterAll((done) => {
        server.close(done);  // close the server after the testing
    });

    // this API test is done in sequence to properly mock the actual flow
    test('POST /cart/add - Add items to cart', async () => {
        const res = await agent
            .post('/cart/add')
            .send({ product: 'ult_small', quantity: 3 });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('ult_small added to cart.');
        expect(res.body.cart).toHaveProperty('ult_small', 3);
    });

    test('PUT /cart/update - Update item quantity in cart', async () => {
        const res = await agent
            .put('/cart/update')
            .send({ product: 'ult_small', quantity: 5 });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('ult_small updated.');
        expect(res.body.cart).toHaveProperty('ult_small', 5);
    });

    test('GET /cart - View the cart', async () => {
        const res = await agent.get('/cart');

        expect(res.status).toBe(200);
        expect(res.body.cart).toHaveProperty('ult_small', 5);
    });

    test('POST /cart/checkout - Checkout with promo code', async () => {
        const res = await agent
            .post('/cart/checkout')
            .send({ promoCode: 'I<3AMAYSIM' });

        expect(res.status).toBe(200);
        expect(res.body.totalPrice).toBe('89.64');
        expect(res.body.totalItems).toHaveProperty('ult_small', 5);
    });

    test('DELETE /cart/remove - Remove item from cart', async () => {
        const res = await agent
            .delete('/cart/remove')
            .send({ product: 'ult_small' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('ult_small removed from cart.');
        expect(res.body.cart).not.toHaveProperty('ult_small');
    });

});
