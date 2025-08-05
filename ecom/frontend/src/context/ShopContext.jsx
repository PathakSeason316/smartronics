import React, { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios' 

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";

    const delivery_fee = 5.99;

    //backend url for connection to backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    //state variables for searching products from the collection page
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

    //products state variable
    const [products,setProducts] = useState([]);

    //state variable for token for auth
    const [token, setToken] = useState('');

    //hook for navigating to place order page on cart checkout
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
    if (!size) {
        toast.error('Select Product Color!');
        return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    
    if (token) {
        try {
            await axios.post(
                `${backendUrl}/api/cart/add`,
                { itemId, size },
                { headers: {token} } 
            );
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }
};


    useEffect(()=>{
    },[cartItems])

    //function to update cart count on click
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                }catch (error){

                }
            }
        }
        return totalCount;
    }

    //update cart quantity
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);    
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){
            try{
                
                await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity},{headers:{token}})
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    //display total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                }catch(error){

                }
            }
        }
        return totalAmount;
    }

    //use axios and call producsts api inside this function
    const getProductsData = async () => {
        try{
            const response = await axios.get(backendUrl + '/api/product/list')
            console.log(response)
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message);
            
        }
    }

    const getUserCart = async (token) => {
        try{
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        }catch(error){
            console.log(error)
            toast.error(error.message);
        }
    }

    useEffect(()=>{
    getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    //all the stated needed on global scope
    const value = {
        products,navigate, token,setToken,backendUrl,getCartAmount,updateQuantity,currency, delivery_fee,search,setSearch,showSearch,setShowSearch,cartItems, setCartItems,addToCart,getCartCount
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );

}

export default ShopContextProvider;