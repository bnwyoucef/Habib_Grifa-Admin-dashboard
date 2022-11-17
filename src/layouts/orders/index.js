// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import nonConfirmedOrdersData from "layouts/orders/data/authorsTableData";
import MDButton from "components/MDButton";

import "./printer.css";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { imageConstLink } from "./data/authorsTableData";

function Tables() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { columns, rows, columns2, rows2, confirmedOrders } = nonConfirmedOrdersData("confirmed");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="order-list">
          <div className="paper-header">
            <h2>Habib Grifa babat zawali</h2>
            <h4>Liste de commandes</h4>
          </div>
          {confirmedOrders.map((order) => (
            <>
              <div className="page-break" />
              <div key={order.id} className="single-order">
                <img src={`${imageConstLink}/image/${order.productImageName}`} alt="test" />
                <div className="clientInformation">
                  <p>
                    <span>Nom du client:</span>
                    {order.clientName}
                  </p>
                  <p>
                    <span>Numéro de téléphone:</span>
                    {order.clientPhoneNumber}
                  </p>
                  <p>
                    <span>Wilaya:</span>
                    {order.clientWilaya}
                  </p>
                  <p>
                    <span>Taille:</span>
                    {order.productSize}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <MDTypography variant="h6" color="white">
                  Nouvelles commandes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
                style={{ display: "flex" }}
              >
                <MDTypography variant="h6" color="white" style={{ flex: 1 }}>
                  Commandes confirmées
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="info"
                  onClick={handlePrint}
                  className="md-button"
                >
                  Imprimer
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: columns2,
                    rows: rows2,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
