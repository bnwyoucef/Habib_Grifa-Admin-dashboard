import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Toaster } from "react-hot-toast";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import ProfilesList from "examples/Lists/ProfilesList";
//  redux tools
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCategories,
  fetchCategories,
  createCategory,
} from "../../features/category/categorySlice";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const categStatus = useSelector((state) => state.category.status);
  const [categoryNameInput, setCategoryNameInput] = useState("");

  useEffect(() => {
    if (categStatus === "idle") dispatch(fetchCategories());
  }, [dispatch, categStatus]);

  function addNewCategory(event, categoryName) {
    event.preventDefault();
    dispatch(createCategory(categoryName));
    setCategoryNameInput("");
  }

  return (
    <DashboardLayout>
      <Toaster />
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card style={{ padding: "50px" }}>
              <form onSubmit={(event) => addNewCategory(event, categoryNameInput)}>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item xs={8}>
                    <MDInput
                      label="écrivez ici..."
                      fullWidth
                      onChange={(event) => setCategoryNameInput(event.target.value)}
                      value={categoryNameInput}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <MDButton variant="contained" color="info" type="submit">
                      Ajouter
                    </MDButton>
                  </Grid>
                </Grid>
              </form>
              <ProfilesList
                title="catégories"
                profiles={categories.map((category) => ({
                  displayAvater: false,
                  name: category.categoryName,
                  description: `${category.product.length} produits`,
                  action: {
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "reply",
                  },
                }))}
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
