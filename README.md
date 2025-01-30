# Shopping Cart 

This is a simple command-line interface (CLI) application that simulates a shopping cart. The user can select data packages, add them to the cart, and proceed to checkout. The application allows for applying a promo code for discounts.

## Features

- Select data packages by number.
- Add items (data packages) to the cart with specified quantities.
- Apply a promo code for a 10% discount (optional).
- View the total price and total items in the cart.

## Packages Available

The available data packages are:
- **ult_small** = Unlimited 1GB - $24.90
- **ult_medium** = Unlimited 2GB - $29.90
- **ult_large** = Unlimited 5GB - $44.90
- **1gb** = 1GBData-pack - $9.90

## Promo Code

The application accepts a promo code for a 10% discount:
- **Promo Code**: `I<3AMAYSIM`

## Main Logic 
- See shoppingCart.js
- Every logic stated and special rules are stored here


## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js** (v12 or higher) should be installed on your system. You can check if Node.js is installed by running:

    ```bash
    node -v
    ```

- If Node.js is not installed, [download and install it from the official website](https://nodejs.org/).

### Installing

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/dofredojp/amaysimExercise.git
    ```

2. Navigate to the project folder:

    ```bash
    cd amaysimExercise
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

### Running the Application in a Terminal only

To start the application using Terminal only, run the following command:

```bash
npm run startcli
```

### Running the Application with API functionality

To start the application with using API, run the following command:

```bash
npm run start
```

Using cURL

```bash
curl -X POST http://localhost:3000/cart/add \n -H "Content-Type: application/json" \n -d '{"product":"ult_small", "quantity":3}'
```

Using Postman
1. Open Postman.
2. Select POST method and enter http://localhost:3000/cart/add.
3. Go to Body -> raw -> Select JSON format.
4. Enter the JSON payload and send the request.


### Testing the Application and Scenarios Stated

To test the application, run the following command:

```bash
npm run test
```
