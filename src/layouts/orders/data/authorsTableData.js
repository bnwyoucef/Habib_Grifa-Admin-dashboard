/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllOrders, fetchOrders } from "../../../features/order/orderSlice";

export default function data() {
  const ordersList = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.order.status);
  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  const Produit = ({ image, name, description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar
        src={image}
        name={name}
        size="sm"
        style={{ cursor: "pointer" }}
        onClick={() => window.open(image, "Image")}
      />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "produit", accessor: "produit", align: "center" },
      { Header: "Client", accessor: "client", align: "left" },
      { Header: "Numéro de téléphone", accessor: "numéro_de_téléphone", align: "left" },
      { Header: "Wilaya", accessor: "wilaya", align: "center" },
      { Header: "quantité", accessor: "quantité", align: "center" },
      { Header: "Taille", accessor: "taille", align: "center" },
      { Header: "montant", accessor: "montant", align: "center" },
      { Header: "reçu de l'operation", accessor: "reçu_de_operation", align: "center" },
      { Header: "confirmer", accessor: "confirmé", align: "center" },
    ],

    rows: ordersList?.map((order) => ({
      produit: (
        <Produit
          image={`http://localhost:1811/order/image/${order.productImageName}`}
          name={order.product.name}
          description={order.product.description.substring(0, 20)}
        />
      ),
      numéro_de_téléphone: order.clientPhoneNumber,
      wilaya: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {order.clientWilaya}
        </MDTypography>
      ),
      client: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {order.clientName}
        </MDTypography>
      ),
      quantité: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {order.productQuantity}
        </MDTypography>
      ),
      montant: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {order.orderCost}
        </MDTypography>
      ),
      taille: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {order.productSize.toUpperCase()}
        </MDTypography>
      ),
      reçu_de_operation: (
        <MDTypography
          component="a"
          href={`http://localhost:1811/order/imagePayed/${order.paymentCheckImage}`}
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {order.paymentCheckImage}
        </MDTypography>
      ),
      confirmé: (
        <MDButton component="a" href="#" variant="caption" color="text" fontWeight="medium">
          confirme
        </MDButton>
      ),
    })),
  };
}
