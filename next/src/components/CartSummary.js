/**
 * Componente CartSummary que muestra el resumen del carrito de compras, 
 * que incluye el total de precio y la cantidad total de productos.
 * @param {number} totalPrecio - El total de precio de los productos en el carrito.
 * @param {number} totalProductos - La cantidad total de productos en el carrito.
 */
export default function CartSummary({ totalPrecio, totalProductos }) {
  return (
    <div className="card-footer bg-white border-0 py-4" style={{borderRadius: '0 0 12px 12px', borderTop: '1px solid #e2e8f0'}}>
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="text-end text-md-start">
            <div className="mb-2">
              <span style={{fontWeight: '600', fontSize: '1.125rem', color: '#0f172a'}}>Total Precio: </span>
              <span style={{fontWeight: '700', fontSize: '1.5rem', color: '#3b82f6'}}>${totalPrecio}</span>
            </div>
            <div>
              <span style={{color: '#64748b', fontSize: '0.875rem'}}>Total de productos: </span>
              <span style={{fontWeight: '500', color: '#0f172a'}}>{totalProductos}</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-end">
            <button 
              className="btn btn-primary btn-lg px-4 py-2 border-0"
             style={{ borderRadius:25}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Pagar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}