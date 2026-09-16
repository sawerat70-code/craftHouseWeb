const express=require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
}=require('../controllers/productController');
const {protect,authorize}=require('../middleware/authMiddleware');
const upload=require('../middleware/uploadMiddleware');

const router=express.Router();
router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',protect,
    authorize('employee','admin'),
    upload.array('images',5),
    createProduct
);
router.delete('/:id',protect,authorize('employee','admin'),deleteProduct);

module.exports=router;