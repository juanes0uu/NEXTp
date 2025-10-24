"use client";
import { useSearchParams } from "next/navigation";

export default function ResponsePage() {
  const params = useSearchParams();
  const transactionState = params.get("transactionState");
  const referenceCode = params.get("referenceCode");
  const TX_VALUE = params.get("TX_VALUE");
  const lapPaymentMethod = params.get("lapPaymentMethod");

  const stateMessages = {
    4: "✅ Transacción aprobada",
    6: "❌ Transacción rechazada",
    104: "⚠️ Error en la transacción",
    7: "⌛ Transacción pendiente",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">
        {stateMessages[transactionState] || "Resultado desconocido"}
      </h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-96">
        <p><strong>Referencia:</strong> {referenceCode}</p>
        <p><strong>Valor:</strong> ${TX_VALUE}</p>
        <p><strong>Método:</strong> {lapPaymentMethod}</p>
      </div>
      <a
        href="/"
        className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Volver al inicio
      </a>
    </div>
  );
}
