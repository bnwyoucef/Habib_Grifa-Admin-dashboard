/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useContext } from "react";
import {
  selectAllOrders,
  fetchOrders,
  removeOrder,
  confirmOrder,
  addOrder,
} from "../../../features/order/orderSlice";
import { WebsocketContext } from "../../../context/webSocketContext";

export const imageConstLink = "http://localhost:1811/order";

export default function data() {
  const ordersList = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.order.status);

  const socket = useContext(WebsocketContext);
  useEffect(() => {
    if (orderStatus === "succeeded") {
      socket.on("order-added", (order) => {
        console.log(order);
        dispatch(addOrder(order));
      });
    }
  });

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  function removeConfirmedOrder(event, orderId) {
    event.preventDefault();
    dispatch(removeOrder(String(orderId)))
      .then(() => toast.success("commande supprimer avec succes"))
      .catch(() => toast.error("Cela n'a pas fonctionné réessayez"));
  }

  function confirmNewOrder(event, orderId) {
    event.preventDefault();
    dispatch(confirmOrder(String(orderId)))
      .then(() => {
        toast.success("commande confirmer avec succes");
      })
      .catch(() => toast.error("Cela n'a pas fonctionné réessayez"));
  }

  const Produit = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <Toaster />
      <MDAvatar
        src={image}
        name={name}
        size="xl"
        style={{ cursor: "pointer" }}
        onClick={() => window.open(image)}
      />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium" width="100px">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    confirmedOrders: ordersList.filter((order) => order.confirmedByAdmin)?.reverse(),
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

    rows: ordersList
      .filter((order) => !order.confirmedByAdmin)
      ?.reverse()
      .map((order) => ({
        produit: (
          <Produit
            image={`${imageConstLink}/image/${order.productImageName}`}
            name={order?.productName.substring(0, 20)}
          />
        ),
        numéro_de_téléphone: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {order.clientPhoneNumber}
          </MDTypography>
        ),
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
            {order.productSize?.toUpperCase()}
          </MDTypography>
        ),
        reçu_de_operation: (
          <MDAvatar
            src={`${imageConstLink}/imagePayed/${order.paymentCheckImage}`}
            name={order.paymentCheckImage}
            size="xl"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open(`${imageConstLink}/imagePayed/${order.paymentCheckImage}`, "_blank")
            }
          />
        ),
        confirmé: (
          <MDButton
            className="md-button"
            variant="outlined"
            size="small"
            color="info"
            onClick={(e) => confirmNewOrder(e, order.id)}
          >
            confirme
          </MDButton>
        ),
      })),
    columns2: [
      { Header: "produit", accessor: "produit", align: "center" },
      { Header: "Client", accessor: "client", align: "left" },
      { Header: "Numéro de téléphone", accessor: "numéro_de_téléphone", align: "left" },
      { Header: "Wilaya", accessor: "wilaya", align: "center" },
      { Header: "quantité", accessor: "quantité", align: "center" },
      { Header: "Taille", accessor: "taille", align: "center" },
      { Header: "montant", accessor: "montant", align: "center" },
      { Header: "reçu de l'operation", accessor: "reçu_de_operation", align: "center" },
      { Header: "suprimer", accessor: "remove", align: "center" },
    ],

    rows2: ordersList
      .filter((order) => order.confirmedByAdmin)
      ?.reverse()
      .map((order) => ({
        produit: (
          <Produit
            image={`${imageConstLink}/image/${order.productImageName}`}
            name={order?.productName.substring(0, 20)}
          />
        ),
        numéro_de_téléphone: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {order?.clientPhoneNumber}
          </MDTypography>
        ),
        wilaya: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {order?.clientWilaya}
          </MDTypography>
        ),
        client: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {order?.clientName}
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
          <MDAvatar
            src={`${imageConstLink}/imagePayed/${order.paymentCheckImage}`}
            name={order.paymentCheckImage}
            size="xl"
            style={{ cursor: "pointer" }}
            onClick={() => window.open(`${imageConstLink}/imagePayed/${order.paymentCheckImage}`)}
          />
        ),
        remove: (
          <MDButton
            variant="text"
            size="large"
            color="info"
            onClick={(e) => removeConfirmedOrder(e, order.id)}
          >
            <Icon className="delete-icon">delete</Icon>
          </MDButton>
        ),
      })),
  };
}
