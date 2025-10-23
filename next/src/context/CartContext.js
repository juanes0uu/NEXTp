'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🔹 Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error al leer carrito del localStorage", e);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // 🔹 Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 🔹 Agregar al carrito
  const addToCart = (producto, cantidad = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === producto.id);
      if (exists) {
        return prev.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  // 🔹 Actualizar cantidad
  const updateCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  // 🔹 Eliminar producto
  const eliminarProducto = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // 🔹 Vaciar carrito
  const clearCart = () => setCart([]);

  // 🔹 Totales
  const totalPrecio = cart.reduce((s, p) => s + p.precio * p.cantidad, 0);
  const totalProductos = cart.reduce((s, p) => s + p.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCantidad,
        eliminarProducto,
        clearCart,
        totalPrecio,
        totalProductos
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
