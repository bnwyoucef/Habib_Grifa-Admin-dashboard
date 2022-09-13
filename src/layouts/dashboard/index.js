// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllOrders, fetchOrders } from "../../features/order/orderSlice";

function Dashboard() {
  const { sales } = reportsLineChartData;
  let today = new Date();
  const ddBefore = String(today.getDate() - 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const time = String(today.getHours()).concat(":").concat(today.getMinutes());
  const yyyy = String(today.getFullYear());

  today = yyyy.concat("-".concat(mm.concat("-").concat(dd)));
  const yesterday = yyyy.concat("-".concat(mm.concat("-").concat(ddBefore)));

  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const orderStatus = useSelector((state) => state.order.status);
  const [countDay, setCountDay] = useState(0);
  const [countDayBefore, setCountDayBefore] = useState(0);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);
  useEffect(() => {
    const orderDay = orders.filter((order) => order.createdAt.substring(0, 10) === today).length;
    const orderDayBefore = orders.filter(
      (order) => order.createdAt.substring(0, 10) === yesterday
    ).length;
    setCountDay(orderDay);
    setCountDayBefore(orderDay - orderDayBefore);
  }, [orders]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="today"
                title="Commandes/jour"
                count={countDay}
                percentage={{
                  color: countDayBefore > 0 ? "success" : "error",
                  amount: countDayBefore > 0 ? "+".concat(countDayBefore) : String(countDayBefore),
                  label: "que le dernier jour",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="calendar_month"
                title="Commande/mois"
                count={
                  orders.filter(
                    (order) => order.createdAt.substring(0, 7) === today.substring(0, 7)
                  ).length
                }
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "que le mois dernier",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="paid"
                title="Revenue/jour"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "que le dernier jour",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="query_stats"
                title="Revenue/mois"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Nombre de commandes par jour"
                  description={today}
                  date={time}
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="nombre de commandes par semaine"
                  description={today}
                  date={time}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <DefaultLineChart
                  icon={{ color: "info", component: "leaderboard" }}
                  title="Commandes Annuelles"
                  description="Nombre de demandes par mois"
                  chart={{
                    labels: [
                      "Jan",
                      "fév",
                      "Mar",
                      "Avr",
                      "Mai",
                      "Jui",
                      "Juil",
                      "Août",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        label: "nombre de commandes",
                        color: "info",
                        data: [
                          500, 400, 3000, 2200, 5000, 2500, 4000, 2300, 5000, 3200, 3400, 1200,
                        ],
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
