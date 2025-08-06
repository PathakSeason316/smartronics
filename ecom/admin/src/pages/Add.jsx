import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Smartphones");
  const [subCategory, setSubCategory] = useState("Apple");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    
    try{
        const formData = new FormData()

        //create a form data object and append the values inside it
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("bestSeller",bestSeller)
        formData.append("sizes",JSON.stringify(sizes))
        
        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)

        //send the request 
        const response = await axios.post(backendUrl + "/api/product/add",formData, {headers:{token}})
        
        //display toast  and clear field states
        if(response.data.success){
            toast.success(response.data.message);
            setName('')
            setDescription('')
            setPrice('')
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
        }else{
            toast.error(response.data.message)
        }
    }catch(error){
        console.log(error);
        toast.error(error.message)

    }
    
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => {
            const setImage = [setImage1, setImage2, setImage3, setImage4][
              index
            ];
            const inputId = `image${index + 1}`;
            return (
              <label key={inputId} htmlFor={inputId}>
                <img
                  className="w-20 h-20 object-cover"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id={inputId}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input 
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
            <option value="Tablets">Tablets</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Microsoft">Microsoft</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="20"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={()=>setSizes(prev=> prev.includes("Standard") ? prev.filter(item => item !== "Standard"): [...prev,"Standard"])}>
            <p className={`${sizes.includes("Standard") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Standard</p>
          </div>

          <div onClick={()=>setSizes(prev=> prev.includes("Mini") ? prev.filter(item => item !== "Mini"): [...prev,"Mini"])}>
            <p className={`${sizes.includes("Mini") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Mini</p>
          </div>

          <div onClick={()=>setSizes(prev=> prev.includes("Pro") ? prev.filter(item => item !== "Pro"): [...prev,"Pro"])}>
            <p className={`${sizes.includes("Pro") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Pro</p>
          </div>

          <div onClick={()=>setSizes(prev=> prev.includes("Max") ? prev.filter(item => item !== "Max"): [...prev,"Max"])}>
            <p className={`${sizes.includes("Max") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Max</p>
          </div>

        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller(prev=> !prev)}
        />
        <label htmlFor="bestSeller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Add;
