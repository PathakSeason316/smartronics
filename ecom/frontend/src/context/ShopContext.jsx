import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";

    const delivery_fee = 5.99;

    //state variables for searching products from the collection page
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

    //hook for navigating to place order page on cart checkout
    const navigate = useNavigate();

    const addToCart = async(itemId, size)=> {

        if (!size){
            toast.error('Select Product Color!')
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    useEffect(()=>{
        console.log(cartItems);
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

    //all the stated needed on global scope
    const value = {
        products,navigate,getCartAmount,updateQuantity,currency, delivery_fee,search,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );

}

export default ShopContextProvider;