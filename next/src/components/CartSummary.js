'use client';
import React from "react";
import { generatePayUSignature } from "../lib/payUSignature";

const CartSummary = ({ totalPrecio, totalProductos }) => {
  const handlePay = () => {
    if (!totalPrecio) return alert("No hay total calculado.");

    const referenceCode = "ORDER_" + new Date().getTime();
    const amount = totalPrecio.toFixed(2);
    const currency = process.env.NEXT_PUBLIC_PAYU_CURRENCY;
    const merchantId = process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID;
    const accountId = process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID;
    const apiKey = process.env.NEXT_PUBLIC_PAYU_API_KEY;

    // Generar firma digital localmente
    const signature = generatePayUSignature({
      apiKey,
      merchantId,
      referenceCode,
      amount,
      currency,
    });

    // Crear formulario oculto
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/";

    const fields = {
      merchantId,
      accountId,
      description: "Compra en Mi Tienda Next.js",
      referenceCode,
      amount,
      tax: 0,
      taxReturnBase: 0,
      currency,
      signature,
      test: 1,
      buyerEmail: "cliente@correo.com",
      responseUrl: "http://localhost:3000/payments/response",
      confirmationUrl: "http://localhost:3000/api/payments/confirmation",
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="text-end p-4 border-top">
      <p className="mb-2 fw-semibold">Total productos: {totalProductos}</p>
      <h4 className="fw-bold mb-3">Total: ${totalPrecio?.toFixed(2)}</h4>
      <button
        className="btn btn-primary btn-lg px-4 py-2 border-0"
        style={{ borderRadius: 25 }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        onClick={handlePay}
      >
        Pagar pedido
      </button>
    </div>
  );
};

export default CartSummary;
