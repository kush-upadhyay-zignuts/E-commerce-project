import React from "react";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Navbar1 from "../../components/Navbar1";
import "./Home.css";


const Home = () => {
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 8;

  useEffect(() => {
    const preFetch = async () => {
      const skip = (page - 1) * limit;
      const responses = await axios.get(
        `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
      );
      setproducts(responses.data.products);
      setTotalProducts(responses.data.total);
      console.log(responses.data.products);
    };
    preFetch();
  }, [page]);

  return (
    <>
      <Navbar1 />
      <div className="home-main">
        {products?.map((item) => (
          // <Link  to={`/product/${item.id}`} key={item.id}  >
          <Card
            key={item.id}
            sx={{ width: "23%", mt: "1rem", ml: "0.9rem", borderRadius: "8px" }}
          >
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardMedia
                component="img"
                alt={item.title}
                height="400"
                image={item.thumbnail}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ height: "4rem" }}
                >
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Category : {item.category}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Brand : {item.brand}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Price :${item.price}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <Rating
                    name="simple-controlled"
                    value={item.rating}
                    sx={{ ml: "-0.2rem" }}
                  />
                </Typography>
              </CardContent>
            </Link>
          </Card>
          // </Link>
        ))}

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalProducts / limit)}
            page={page}
            onChange={(event, value) => setpage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
