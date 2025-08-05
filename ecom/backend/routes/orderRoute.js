import express from 'express';
import adminAuth from '../middleware/adminAuth.js'

import {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStripe} from '../controllers/ordersController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Feature Routes
orderRouter.post('/list', adminAuth,allOrders)
orderRouter.post('/status', adminAuth,updateStatus)

// Payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

//User Feature
orderRouter.post('/userorders', authUser,userOrders)


// payment verify stripe
orderRouter.post('/verifyStripe', authUser, verifyStripe)
export default orderRouter;
