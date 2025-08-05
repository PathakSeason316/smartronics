import React, { useState,useEffect,useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';


const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  //function to load all the order data
  const loadOrderData = async()=> {
    try{
      //return null if token isnt presnet
      if(!token){
        return null
      }
      //hit the api for all orders
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if(response.data.success){
        //map order details inside an array
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }

    }catch(error){

    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="border-t pt-16 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
      <div className="mb-10">
        <Title heading="MY" subheading="ORDERS" />
      </div>

      <div className="space-y-6">
        {
        orderData.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex items-start gap-4 md:gap-6">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-lg sm:text-xl text-gray-800">
                    {item.name}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
                    <span>
                      <strong className="text-gray-800">{currency}{item.price}</strong>
                    </span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Status + Track */}
              <div className="flex items-center justify-between w-full md:w-auto gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm font-medium text-green-600">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-100 transition">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
