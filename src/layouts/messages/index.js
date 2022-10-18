// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/messages/components/Header";
import PlatformSettings from "layouts/messages/components/PlatformSettings";

// Data
import profilesListData from "layouts/messages/data/profilesListData";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container>
        <Grid item>item one</Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
