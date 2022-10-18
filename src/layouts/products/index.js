// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Transactions from "layouts/products/components/Transactions";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Card, Icon } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import { useEffect } from "react";
//  redux functionality
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, getAllProducts } from "../../features/product/productSlice";

function Billing() {
  const dispatch = useDispatch();
  const productsList = useSelector(getAllProducts);
  const productStatus = useSelector((state) => state.product.status);

  useEffect(() => {
    if (productStatus === "idle") dispatch(fetchProducts());
  }, [productStatus, dispatch]);

  const columns = [
    { Header: "image", accessor: "image", align: "left" },
    { Header: "produit", accessor: "produit", align: "center" },
    { Header: "category", accessor: "category", align: "left" },
    { Header: "prix", accessor: "prix", align: "center" },
    { Header: "nombre de commandes", accessor: "nombre_commandes", align: "center" },
  ];

  const rows = productsList?.map((product) => ({
    image: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar
          src={`http://localhost:1811/product/image/${product.images.split(",")[0]}`}
          name={product.name}
          size="xl"
          style={{ cursor: "pointer" }}
        />
      </MDBox>
    ),
    produit: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {product.name}
      </MDTypography>
    ),
    category: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {product.category.categoryName}
      </MDTypography>
    ),
    prix: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {`${product.price}DA`}
      </MDTypography>
    ),
    nombre_commandes: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {product.Order?.length}
      </MDTypography>
    ),
    remove: (
      <MDButton
        variant="text"
        size="large"
        color="info"
        // onClick={(e) => removeConfirmedOrder(e, order.id)}
      >
        <Icon>delete</Icon>
      </MDButton>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <DataTable
                table={{
                  columns,
                  rows,
                }}
                isSorted={false}
                entriesPerPage={{ defaultValue: 5, displayEntries: false }}
                showTotalEntries={false}
                noEndBorder
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
