const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product => PUT
// router.put("/edit-product", adminController.putEditProduct);

// /admin/edit-product => DELETE
// router.delete("/edit-product", adminController.deleteEditProduct);

module.exports = router;
