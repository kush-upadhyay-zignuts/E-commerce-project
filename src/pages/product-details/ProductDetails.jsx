import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/views/ProductDetails.css";
import Navbar from "../../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "";
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedInUser")) ? true : false;
  });
  //get the product details from api
  //check if the user is logged in or not
  useEffect(() => {
    const preFetch = async () => {
      const responses = await axios.get(`${API_URL}/${id}`);
      setProductDetails(responses.data);
    };
    preFetch();
    const checkUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setCurrentUser(checkUser ? true : false);
  }, []);

  //add the product to the cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`${product.title} added to cart!`);
  };

  return (
    <>
      <Navbar />
      <div className="product-details">
        <div className="product-details-img">
          <img src={productDetails.thumbnail} alt="" />
          <IconButton
            size="larger"
            color="inherit"
            onClick={() => {
              navigate("/home");
            }}
            sx={{ position: "absolute", left: "0" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="product-details-description">
          <h1>{productDetails.description}</h1>

          <Rating
            id="rating-icon"
            name="simple-controlled"
            readOnly
            value={productDetails?.rating || 4}
            sx={{ ml: "-0.2rem", mt: "1rem" }}
          />
          <h2>
            ${productDetails.price} (-{productDetails.discountPercentage}%)
          </h2>
          <br />
          <Divider />
          <h2>About</h2>
          <div className="about">
            <ul>
              <li>height</li>
              <li>width</li>
              <li>depth</li>
              <li>Weight</li>
            </ul>
            <ul>
              <li>{productDetails?.dimensions?.height || "N/A"} cm </li>
              <li>{productDetails?.dimensions?.width || "N/A"} cm</li>
              <li>{productDetails?.dimensions?.depth || "N/A"} cm</li>
              <li>{productDetails?.weight || "N/A"} kg</li>
            </ul>
          </div>
          <br />
          <Divider />
          <h2>More</h2>
          <br />
          <div className="more">
            <ul>
              <li>{productDetails.warrantyInformation}</li>
              <li>{productDetails.shippingInformation}</li>
              <li>
                minimumOrderQuantity :{productDetails.minimumOrderQuantity}
              </li>
              <li>{productDetails.availabilityStatus}</li>
              <li>{productDetails.returnPolicy}</li>
            </ul>
          </div>
          <br />
          <Divider />
          <br />
          <div className="productdetails-buttons">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                if (currentUser) {
                  addToCart(productDetails);
                } else {
                  navigate("/login");
                }
              }}
              color="secondary"
            >
              Add Cart
            </Button>
            <Button variant="contained" size="large" color="success">
              Buy Now
            </Button>
            <br />
          </div>
          <br />
          <Divider />
          <div className="comments">
            <h2>Reviews</h2>
            <br />
            {productDetails?.reviews?.map((review, idx) => (
              <div key={idx}>
                <div className="reviwer-detail">
                  <Avatar>{review.reviewerName.charAt(0)}</Avatar>
                  <h4>{review.reviewerName}</h4>
                </div>
                <div className="reviewer-comment">
                  <Rating
                    id="rating-icon"
                    name="simple-controlled"
                    readOnly
                    value={review.rating || 4}
                    sx={{ ml: "-0.2rem" }}
                  />
                  <p>{review.comment}</p>
                  <br />
                </div>
                <p id="review-date"> Date : {review.date.split("T")[0]}</p>
                <br />
                <Divider />
                <br />
              </div>
            ))}
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </>
  );
};

export default ProductDetails;
