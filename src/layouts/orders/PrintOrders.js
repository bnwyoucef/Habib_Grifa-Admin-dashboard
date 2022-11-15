import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// import { ComponentToPrint } from "./ComponentToPrint";

export default function PrintOrders() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div ref={componentRef}>
        <h2>Testing the print function</h2>
        <p>I need to print all the confirmed orders</p>
        <img src="https://picsum.photos/200" alt="printed" />
      </div>
      <button onClick={handlePrint} type="button">
        Print this out!
      </button>
    </div>
  );
}
