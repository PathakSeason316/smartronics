import express from 'express'
import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

//configure multi-parse form data using multer in routes
//adminAuth middleware added for add and remove to allow admin auth
productRouter.post('/add', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), addProduct);

productRouter.get('/list',listProducts)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)

export default productRouter;