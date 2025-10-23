'use client';

import { useEffect, useState } from 'react';
import productosData from '../data/productos.json';
import { useCart } from '../context/CartContext';
import Link from "next/link";

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setProductos(productosData);
  }, []);

  const handleAdd = (prod) => {
    addToCart(prod, 1);
    alert(`✅ "${prod.nombre}" agregado al carrito`);
  };

  return (
    <div className="min-vh-100" style={{backgroundColor: '#f8fafc', fontFamily: 'var(--font-inter)'}}>
      <div className="container py-5">
        <h1 className="text-center mb-4" style={{fontSize: '2rem', fontWeight: '700'}}>Catálogo de Productos</h1>
        <div className="row g-4">
          {productos.map(prod => (
            <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm" style={{borderRadius: 12}}>
                <img src={prod.imagen} className="card-img-top" alt={prod.nombre} style={{height: 160, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12}} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{fontWeight: 600}}>{prod.nombre}</h5>
                  <p className="card-text text-muted" style={{flexGrow: 1}}>${prod.precio}</p>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAdd(prod)}
                      style={{ borderRadius: 25 }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link href="/cart" className="btn btn-outline-secondary">Ir al carrito</Link>
        </div>
      </div>
    </div>
  );
}
