import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllOrders, fetchOrders } from "../../features/order/orderSlice";

function Dashboard() {
  const [salesDayTime, setSalesDayTime] = useState({
    labels: ["08", "10", "12", "14", "16", "18", "20", "22", "00"],
    datasets: { label: "commandes", data: [] },
  });
  const [yearData, setYearData] = useState([]);

  let today = new Date();
  const ddBefore = String(today.getDate() - 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const mmBefore = String(today.getMonth()).padStart(2, "0");
  const time = String(today.getHours()).concat(":").concat(today.getMinutes());
  const yyyy = String(today.getFullYear());

  today = yyyy.concat("-".concat(mm.concat("-").concat(dd)));
  const yesterday = yyyy.concat("-".concat(mm.concat("-").concat(ddBefore)));
  const lastMonth = yyyy.concat("-".concat(mmBefore));

  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const orderStatus = useSelector((state) => state.order.status);
  const [countDay, setCountDay] = useState(0);
  const [countDayBefore, setCountDayBefore] = useState(0);
  const [countMonth, setCountMonth] = useState(0);
  const [countMonthBefore, setCountMonthBefore] = useState(0);
  const [revenuDay, setRevenuDay] = useState(0);
  const [revenuDayBefore, setRevenuDayBefore] = useState(0);
  const [revenuMonth, setRevenuMonth] = useState(0);
  const [revenuMonthBefore, setRevenuMonthBefore] = useState(0);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  function filterOrders(orderList, filterTime, startIndex, endIndex) {
    return orderList
      ? orderList?.filter(
          (order) =>
            order?.createdAt?.substring(startIndex, endIndex) ===
            filterTime?.substring(startIndex, endIndex)
        )
      : [];
  }

  function revenuCalcul(orderList) {
    let costSome = 0;
    orderList.forEach((order) => (costSome += parseInt(order.orderCost, 10)));
    return costSome;
  }

  function filterOrderByTime(orderList, filterTime, startIndex, endIndex) {
    return orderList.filter(
      (order) =>
        order.createdAt.substring(startIndex, endIndex) === String(filterTime) ||
        order.createdAt.substring(startIndex, endIndex) === String(filterTime + 1)
    ).length;
  }

  useEffect(() => {
    const orderDay = filterOrders(orders, today, 0, 10);
    const orderDayBefore = filterOrders(orders, yesterday, 0, 10);
    setCountDay(orderDay.length);
    setCountDayBefore(orderDay.length - orderDayBefore.length);

    setRevenuDay(revenuCalcul(orderDay));
    setRevenuDayBefore(revenuCalcul(orderDayBefore));

    const orderMonth = filterOrders(orders, today, 0, 7);
    const orderMonthBefore = filterOrders(orders, lastMonth, 0, 7);
    setCountMonth(orderMonth.length);
    setCountMonthBefore(orderMonth.length - orderMonthBefore.length);

    setRevenuMonth(revenuCalcul(orderMonth));
    setRevenuMonthBefore(revenuCalcul(orderMonthBefore));

    let data = [];
    let i = 8;
    while (i <= 22) {
      data.push(filterOrderByTime(orderDay, i, 11, 13));
      i += 2;
    }
    data.push(filterOrderByTime(orderDay, 0, 11, 13));
    const salesData = {
      labels: ["08", "10", "12", "14", "16", "18", "20", "22", "00"],
      datasets: { label: "commandes", data },
    };
    setSalesDayTime(salesData);
    data = [];
    i = 1;
    while (i < 13) {
      if (i < 10) {
        data.push(filterOrders(orders, yyyy.concat("-0").concat(i), 0, 7).length);
      } else {
        data.push(filterOrders(orders, yyyy.concat("-").concat(i), 0, 7).length);
      }
      i += 1;
    }
    setYearData(data);
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
                  amount: countDayBefore > 0 ? "+".concat(countDayBefore) : countDayBefore,
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
                count={countMonth}
                percentage={{
                  color: countMonthBefore > 0 ? "success" : "error",
                  amount: countMonthBefore > 0 ? "+".concat(countMonthBefore) : countMonthBefore,
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
                count={String(revenuDay).concat(" DA")}
                percentage={{
                  color: revenuDay - revenuDayBefore > 0 ? "success" : "error",
                  amount:
                    revenuDay - revenuDayBefore > 0
                      ? "+".concat(revenuDay - revenuDayBefore).concat("DA")
                      : String(revenuDay - revenuDayBefore).concat("DA"),
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
                count={String(revenuMonth).concat(" DA")}
                percentage={{
                  color: "success",
                  amount:
                    revenuMonth - revenuMonthBefore > 0
                      ? "+".concat(revenuMonth - revenuMonthBefore).concat("DA")
                      : String(revenuMonth - revenuMonthBefore).concat("DA"),
                  label: "que le mois dernier",
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
                  chart={salesDayTime}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="nombre de commandes par mois"
                  description={today}
                  date={time}
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
                    datasets: { label: "commandes", data: yearData },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <DefaultLineChart
                  icon={{ color: "info", component: "leaderboard" }}
                  title="Commandes Annuelles"
                  description="Nombre de commandes par anne"
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
                        data: yearData,
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
