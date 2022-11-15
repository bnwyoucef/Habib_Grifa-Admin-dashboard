// @mui material components
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";

import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Card, Icon } from "@mui/material";
import MDAvatar from "components/MDAvatar";
//  redux functionality
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchProducts,
  getAllProducts,
  updateSelectedProduct,
  deleteSelectedProduct,
} from "../../features/product/productSlice";

import Carousel from "./Carousel";
import Select from "./Select";

function Billing() {
  const dispatch = useDispatch();
  const productsList = useSelector(getAllProducts);
  const productStatus = useSelector((state) => state.product.status);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [updateName, setUpdateName] = useState("");
  const [updateImages, setUpdateImages] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateSizes, setUpdateSizes] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [newCategId, setNewCategId] = useState("");

  function updateHandler(clickedProduct) {
    setUpdateName(clickedProduct?.name);
    setUpdateImages(clickedProduct?.images);
    setUpdatePrice(clickedProduct?.price);
    setUpdateCategory(clickedProduct?.category.categoryName);
    setUpdateSizes(clickedProduct?.sizes);
    setUpdateDescription(clickedProduct?.description);
    setSelectedProduct(clickedProduct);
  }

  function updateProduct(event, productId) {
    event.preventDefault();
    const updatedProduct = {
      name: updateName,
      price: updatePrice,
      description: updateDescription,
      sizes: updateSizes,
      categoryId: newCategId,
    };
    dispatch(updateSelectedProduct({ updatedProduct, productId }));
  }

  useEffect(() => {
    if (productStatus === "idle") dispatch(fetchProducts());
  }, [productStatus, dispatch]);

  useEffect(() => {
    setSelectedProduct(productsList[0]);
    updateHandler(productsList[0]);
  }, [productsList]);

  function removeProduct(event, productId) {
    event.preventDefault();
    dispatch(deleteSelectedProduct(productId)).then(() => {
      toast.success("produit supprimé avec succès");
    });
  }

  const columns = [
    { Header: "image", accessor: "image", align: "left" },
    { Header: "produit", accessor: "produit", align: "center" },
    { Header: "category", accessor: "category", align: "left" },
    { Header: "prix", accessor: "prix", align: "center" },
    { Header: "nombre de commandes", accessor: "nombre_commandes", align: "center" },
    { Header: "Supprimer", accessor: "remove", align: "center" },
    { Header: "Modifier", accessor: "update", align: "center" },
  ];

  const rows = productsList?.map((product) => ({
    image: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar
          src={`http://localhost:1811/product/image/${product.images.split(",")[0]}`}
          name={product?.name}
          size="xl"
          style={{ cursor: "pointer" }}
        />
      </MDBox>
    ),
    produit: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {product?.name}
      </MDTypography>
    ),
    category: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {product?.category?.categoryName}
      </MDTypography>
    ),
    prix: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {`${product?.price}DA`}
      </MDTypography>
    ),
    nombre_commandes: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {product?.Order?.length}
      </MDTypography>
    ),
    remove: (
      <MDButton
        className="md-button"
        variant="text"
        size="large"
        color="info"
        onClick={(event) => removeProduct(event, product.id)}
      >
        <Icon>delete</Icon>
      </MDButton>
    ),
    update: (
      <MDButton
        className="md-button"
        variant="text"
        size="large"
        color="info"
        onClick={() => updateHandler(product)}
      >
        <Icon>edit</Icon>
      </MDButton>
    ),
  }));

  return (
    <DashboardLayout>
      <Toaster />
      <MDBox mt={0}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <DataTable
                table={{
                  columns,
                  rows,
                }}
                isSorted={false}
                entriesPerPage={{ defaultValue: 8, displayEntries: false }}
                showTotalEntries={false}
                noEndBorder
                diplayAddProductBtn
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card style={{ padding: "20px" }}>
                <Grid
                  container
                  rowSpacing={2}
                  style={{ backgroundColor: "white" }}
                  justifyContent="center"
                >
                  <Grid item xs={12}>
                    <div>
                      <Carousel product={selectedProduct} />
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <MDInput
                      type="text"
                      label="Produit"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <MDInput
                      type="text"
                      label="Prix"
                      value={updatePrice}
                      fullWidth
                      onChange={(e) => setUpdatePrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Select
                      updateCategory={updateCategory}
                      setUpdateCategory={setUpdateCategory}
                      setNewCategId={setNewCategId}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <MDInput
                      type="text"
                      label="Tailles"
                      value={updateSizes?.toUpperCase()}
                      fullWidth
                      onChange={(e) => setUpdateSizes(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <MDInput
                      label="description"
                      value={updateDescription}
                      onChange={(e) => setUpdateDescription(e.target.value)}
                      multiline
                      rows={5}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDButton
                      className="md-button"
                      variant="contained"
                      color="info"
                      fullWidth
                      onClick={(e) => updateProduct(e, selectedProduct.id)}
                    >
                      Modifier produit
                    </MDButton>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
