import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { FormEvent, MouseEvent, useEffect, ChangeEvent } from "react";
import "./side-bar.css";
import { useState } from "react";
import { IProduct } from "../../app.utils";
// Import SelectChangeEvent type from MUI
import { SelectChangeEvent } from "@mui/material/Select";

// Define types for props
interface SideBarProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  allCategories: string[];
  products: string[];
  setProduct: React.Dispatch<React.SetStateAction<string[]>>;
  setShowPie: React.Dispatch<React.SetStateAction<boolean>>;
  handleRunReport: (e: MouseEvent<HTMLButtonElement>) => void;
  allProducts: IProduct[];
}

export const SideBar: React.FC<SideBarProps> = ({
  category,
  setCategory,
  allCategories,
  products,
  setProduct,
  setShowPie,
  handleRunReport,
  allProducts,
}) => {
  const [productList, setProductList] = useState<string[]>([]);

  // Handle category change
  const handleCategoryChange = (e: SelectChangeEvent<string>): void => {
    const newCategory = e.target.value;
    if (category !== newCategory) {
      setCategory(newCategory);
    }
    setProductList([]);
    setProduct([]);
  };

  // Handle product selection change
  const handleProductChange = (e: SelectChangeEvent<string[]>): void => {
    setProduct(e.target.value as string[]);
  };

  useEffect(() => {
    if (category) {
      const tempArr: string[] = [];
      allProducts.forEach((product: IProduct) => {
        if (product.category === category) {
          tempArr.push(product.title);
        }
      });
      setProductList(tempArr);
    }
  }, [category, allProducts]);

  // Handle the clear button
  const handleClear = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setCategory("");
    setProduct([]);
    setShowPie(true);
  };

  return (
    <>
      <Box
        className="side-bar-container"
        component="section"
        sx={{ p: 2, border: "1px solid #cecece" }}
      >
        <Box sx={{ mb: 2 }} className="title-bar">
          <Typography variant="h5" gutterBottom>
            Filters
          </Typography>
          <Button variant="text" sx={{ textTransform: "capitalize" }} onClick={handleClear}>
            Clear &times;
          </Button>
        </Box>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="category-lists">Category</InputLabel>
          <Select
            labelId="category-lists"
            id="category-select"
            label="Category"
            onChange={handleCategoryChange}
            value={category}
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "pre",
            }}
          >
            {allCategories && allCategories.length
              ? allCategories.map((cat: string) => (
                  <MenuItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </MenuItem>
                ))
              :   <>
              {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton animation="wave" key={index} />
              ))}
            </>}
          </Select>
        </FormControl>

        <FormControl fullWidth >
          <InputLabel id="multipleProducts">Product</InputLabel>
          <Select
            labelId="multipleProducts"
            id="multipleProducts-checkbox"
            multiple
            value={products}
            onChange={handleProductChange}
            input={<OutlinedInput label="Product" />}
            disabled={!productList.length}
            renderValue={(selected) => selected.join(", ")}
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "pre",
            }}
          >
            {productList &&
              productList?.map((p: string) => (
                <MenuItem key={p} value={p}>
                  <Checkbox checked={products.indexOf(p) > -1} />
                  <ListItemText primary={p} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2 }} className="report-button" component="div">
          <Button
            fullWidth={true}
            onClick={(e) => handleRunReport(e)}
            variant="contained"
            disabled={!products.length}
          >
            Run Report
          </Button>
        </Box>
      </Box>
    </>
  );
};
