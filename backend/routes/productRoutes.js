const express = require("express");
const router = express.Router();
const getProducts = require("../controllers/productControllers")
const getProduct = require("../controllers/productControllers")
const createProduct = require("../controllers/productControllers")
const updateProduct = require("../controllers/productControllers")
const deleteProduct = require("../controllers/productControllers")


router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
