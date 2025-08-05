import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay'

//stripe gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
}) 
//global variables 
const currency = 'usd'; 
const deliveryCharge = 9.99;

//place an order by cash on delivery
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//place an order via stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        // Add delivery charge
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: Math.round(deliveryCharge * 100)
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const verifyStripe = async(req,res)=> {
  const {orderId, success} = req.body;   // Removed userId from destructuring

  try {
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      
      // Get order to find userId inside it
      const order = await orderModel.findById(orderId);
      if(order){
        await userModel.findByIdAndUpdate(order.userId, {cartData:{}});
      }

      res.json({success:true});
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false});
    }
  } catch(error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


//placeholder for Razorpay
const placeOrderRazorPay = async (req, res) => {

    try{
        // Not implemented yet
    const {userId, items, amount, address} = req.body;

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"Razorpay",
        payment:false,
        date:Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const option = {
        amount: amount * 100,
        currency: currency.toUpperCase(),
        receipt: newOrder._id.toString()
    }

    await razorpayInstance.orders.create(option, (error, order)=>{
        if(error){
            console.log(error);
            return res.json({success:false, message: error})
            
        }
        res.json({success:true, order})
    })
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}

//Access all orders from Admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//order data for individual user
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {
    placeOrder,
    placeOrderStripe,
    verifyStripe,
    placeOrderRazorPay,
    allOrders,
    userOrders,
    updateStatus
};
