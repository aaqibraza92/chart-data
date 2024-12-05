import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { IProducts, IProduct } from "./app.utils";
import { Chart } from "./components/chart/Chart";
import { SideBar } from "./components/side-bar/SideBar";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

import './App.css';
import { Container, Grid, LinearProgress, Skeleton } from '@mui/material';

function App() {
  const [showPie, setShowPie] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [products, setProduct] = useState<string[]>([]);

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      console.log(allProducts, res.data);

      let cat = res.data.products.map((data: IProduct) => data.category);
      const prod = res.data.products.map((data: IProduct) => data.title);
      console.log(cat, prod);
      cat = new Set(cat);
      setAllCategories([...cat]);
      setAllProducts(res.data.products);
      console.log(allCategories);
    });
  }, []);

  const handleRunReport = (e: any) => {
    e.preventDefault();
    if (products.length) {
      setSelectedProducts(products);
      setShowPie(false);
    }
  };
  return (

    <>
      <section>
        <Container
          maxWidth="xl"
          sx={{
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} lg={3}>
              {allCategories && allCategories?.length ? (
                <SideBar
                  allCategories={allCategories}
                  category={category}
                  allProducts={allProducts}
                  products={products}
                  setProduct={setProduct}
                  setShowPie={setShowPie}
                  setCategory={setCategory}
                  handleRunReport={handleRunReport}
                />
              ) : (
                <>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton animation="wave" key={index} />
                  ))}
                </>

              )}
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} lg={9}>
              <Chart
                showPie={showPie}
                selectedProducts={selectedProducts}
                allProducts={allProducts}
                category={category}
              />
            </Grid>
          </Grid>








        </Container>
      </section>


    </>

  );
}

export default App;
