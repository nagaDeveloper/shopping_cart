const path = require("path");

const express = require("express");

// to handle all the controls(callback functions for the routes)
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// to get all the products in the initial page
router.get("/", shopController.getIndex);

//to get all the products in the products route(can view product details on click of details button)
router.get("/products", shopController.getProducts);

//to get the selected product in the products (can view product details)
router.get("/products/:productId", shopController.getProduct);

// to get the count of all products in the cart
router.get("/cart", isAuth, shopController.getCart);

//to add a product to the cart
router.post("/cart", isAuth, shopController.postCart);

// to delete a particular cart item
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

// get the orders
router.get("/orders", isAuth, shopController.getOrders);

module.exports = router;
