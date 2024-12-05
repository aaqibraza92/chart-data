import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "./app.utils";
import { Chart } from "./components/chart/Chart";
import { SideBar } from "./components/side-bar/SideBar";
import "./App.css";
import { Container, Grid, Skeleton } from "@mui/material";
import { allProductsUrl } from "./components/endpoints";

function App() {
  const [showPie, setShowPie] = useState<boolean>(true);
  const [onClearShowAllCat, setOnClearShowAllCat] = useState<Number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [category, setCategory] = useState<string>("");
  const [categorySubmit, setCategorySubmit] = useState<string>("");
  const [products, setProduct] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    await axios.get(allProductsUrl).then((res) => {
      let cat = res.data.products.map((data: IProduct) => data.category);
      const prod = res.data.products.map((data: IProduct) => data.title);
      cat = new Set(cat);
      setAllCategories([...cat]);
      setAllProducts(res.data.products);
    });
  };

  const handleReport = (e: any) => {
    e.preventDefault();
    if (products.length > 0) {
      setSelectedProducts(products);
      setShowPie(false);
    } else {
      setCategorySubmit(category);
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
            <Grid item xs={12} lg={3}>
              {allCategories && allCategories?.length ? (
                <SideBar
                  allCategories={allCategories}
                  category={category}
                  allProducts={allProducts}
                  products={products}
                  setProduct={setProduct}
                  setShowPie={setShowPie}
                  setOnClearShowAllCat={setOnClearShowAllCat}
                  setCategory={setCategory}
                  handleRunReport={handleReport}
                />
              ) : (
                <>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <Skeleton animation="wave" key={index} />
                  ))}
                </>
              )}
            </Grid>

            <Grid item xs={12} lg={9}>
              <Chart
                showPie={showPie}
                runReportOnCat={categorySubmit}
                selectedProducts={selectedProducts}
                allProducts={allProducts}
                category={category}
                onClearShowAllCat={onClearShowAllCat}
              />
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default App;
