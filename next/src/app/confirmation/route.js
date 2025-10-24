export async function POST(request) {
  try {
    const data = await request.formData();
    const referenceCode = data.get("reference_sale");
    const state = data.get("state_pol");
    const value = data.get("value");

    console.log("🔔 Confirmación de PayU:", { referenceCode, state, value });

    // Aquí podrías actualizar tu base de datos o enviar correos, etc.

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error al procesar confirmación:", error);
    return new Response("ERROR", { status: 500 });
  }
}
