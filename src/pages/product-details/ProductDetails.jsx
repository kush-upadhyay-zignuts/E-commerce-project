import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


import "./ProductDetails.css"
import Navbar2 from '../../components/Navbar2';
import { Divider } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams()
    const [productDetails,setProductDetails] = useState("")

    useEffect(()=>{
        const preFetch = async ()=>{
          
         
          const responses = await axios.get(`https://dummyjson.com/products/${id}`)
          setProductDetails(responses.data)
         
          console.log(responses.data)
          
        }
        preFetch()
    },[])
    const addToCart = (product) => {
      
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
      
      const existingProduct = cart.find((item) => item.id === product.id);
    
      if (existingProduct) {
      
        existingProduct.quantity += 1;
      } else {
      
        cart.push({ ...product, quantity: 1 });
      }
    
      localStorage.setItem("cart", JSON.stringify(cart));
    
      alert(`${product.title} added to cart!`);
    };

  return (

    <>
       <Navbar2/>
       <div className="product-details">
            <div className="product-details-img">
                <img src={productDetails.thumbnail} alt="" />
            </div>
            <div className="product-details-description">
                
                <h1>{productDetails.description}</h1>
               
                  <Rating
                  id="rating-icon"
                    name="simple-controlled"
                    value={productDetails?.rating || 4}
                    sx={{ml: "-0.2rem" , mt:"1rem"}}
                  />
                <h2>${productDetails.price} (-{productDetails.discountPercentage}%)</h2>
                <br />
                <Divider/>
                <h2>About</h2>
                <div className="about">
                <ul>
                    <li>height</li>
                    <li>width</li>
                    <li>depth</li>
                    <li>Weight</li>
                </ul>
                <ul>
                    <li>{productDetails?.dimensions?.height  || "N/A"} cm </li>
                    <li>{productDetails?.dimensions?.width || "N/A"} cm</li>
                    <li>{productDetails?.dimensions?.depth || "N/A"} cm</li>
                    <li>{productDetails?.weight || "N/A"} kg</li>
                </ul>

                </div>
                <br />
                <Divider/>
                <h2>More</h2>
                <br />
                <div className="more">
                <ul>
                    <li>{productDetails.warrantyInformation}</li>
                    <li>{productDetails.shippingInformation }</li>
                    <li>minimumOrderQuantity :{productDetails.minimumOrderQuantity}</li>
                    <li>{productDetails.availabilityStatus}</li>
                    <li>{productDetails.returnPolicy}</li>
                </ul>
                </div>
                <br />
                <Divider/>
                <br />
                <div className='productdetails-buttons'>
                <Button variant="contained" size='large' onClick={()=>addToCart(productDetails)} color='secondary'>Add Cart</Button>
                <Button variant="contained" size='large' color='success'>Buy Now</Button>
                <br />
                </div>
                <br />
                <Divider/>
                <div className="comments">
                    <h2>Reviews</h2>
                    <br />
                    {productDetails?.reviews?.map((review,idx)=>(
                      <div key={idx} >
                        <div className="reviwer-detail">
                        <Avatar>{review.reviewerName.charAt(0)}</Avatar>
                      <h4>{review.reviewerName}</h4>

                        </div>
                        <div className='reviewer-comment'>  
                        <Rating
                          id="rating-icon"
                          name="simple-controlled"
                          value={review.rating || 4}
                          sx={{ml: "-0.2rem"   }}
                        />
                         <p >{review.comment}</p>
                        <br />
                         </div>
                         <p id='review-date'> Date : {review.date.split("T")[0]}</p>
                         <br />
                         <Divider/>
                         <br />
                      </div>
                      
                    ))}

                    
                </div>
            </div>
       </div>
    </>
  )
}

export default ProductDetails
