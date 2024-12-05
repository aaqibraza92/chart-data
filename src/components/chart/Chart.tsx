import Box from "@mui/material/Box/Box";
import BarChart from "../bar-chart/BarChart";
import PieChart from "../pie-chart/PieChart";
import "./chart.css";
import CircularProgress from "@mui/material/CircularProgress";

import { FC, useEffect, useState } from "react";
import { IProduct } from "../../app.utils";
import { IconButton } from "@mui/material";

interface ChartProps {
  selectedProducts: string[];
  allProducts: IProduct[];
  showPie: boolean;
  category: string;
  runReportOnCat: string;
  onClearShowAllCat: Number;
}

export const Chart: FC<ChartProps> = ({
  selectedProducts,
  category,
  showPie,
  allProducts,
  runReportOnCat,
  onClearShowAllCat,
}) => {
  const xAxisText = "";
  const title = `Products in ${category}`;
  const [priceBar, setPriceBar] = useState<string[]>([]);
  const [dataPie, setDataPie] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const selectedCatProducts = allProducts.filter(
    (item) => item.category === category
  );
  useEffect(() => {
    AllCatDataEmbed();
  }, [allProducts, onClearShowAllCat]);

  const AllCatDataEmbed = () => {
    const cMap: any = {};
    if (allProducts.length) {
      allProducts.forEach((product: IProduct) => {
        if (cMap[product.category]) {
          cMap[product.category] += cMap[product.category];
        } else {
          cMap[product.category] = 1;
        }
      });
      const res: any = Object.keys(cMap).map((key, value) => {
        return { name: key, y: value };
      });
      setDataPie(res);
    }
  };

  useEffect(() => {
    if (category) {
      let tempDataCatProd: any = [];
      selectedCatProducts.forEach((product: IProduct, index) => {
        tempDataCatProd.push({
          name: product?.title,
          y: index,
        });
      });
      setDataPie(tempDataCatProd);
    } else {
      AllCatDataEmbed();
    }
  }, [runReportOnCat]);

  useEffect(() => {
    if (selectedProducts) {
      const p: string[] = [];
      allProducts.forEach((product: IProduct) => {
        if (selectedProducts.includes(product.title)) {
          p.push(product.price);
        }
      });
      setPriceBar(p);
    }
    if (!showPie) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [selectedProducts]);

  return (
    <>
      <Box className="chart-container" component="section">
        {loading ? (
          <Box className="loading">
            {" "}
            <IconButton>
              <CircularProgress />
            </IconButton>
          </Box>
        ) : showPie ? (
          dataPie &&
          dataPie?.length && (
            <PieChart
              title={
                category
                  ? `Products in ${category.toUpperCase()}`
                  : "All Categories"
              }
              data={dataPie}
            />
          )
        ) : (
          <BarChart
            title={title}
            products={selectedProducts}
            data={priceBar}
            xAxisText={xAxisText}
            yAxisText={category}
          />
        )}
      </Box>
    </>
  );
};
