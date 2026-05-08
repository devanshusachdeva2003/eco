"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../components/CartContext";
import { products } from "../../data/products";

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);

  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="p-10">
        <p>Product not found</p>
        <Link href="/catalog" className="text-blue-600 underline">Back to catalog</Link>
      </div>
    );
  }

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, img: product.img, color: selectedColor, size }, qty);
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded shadow overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-96">
          <Image src={product.img} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" loading="eager" className="object-cover" />
        </div>

        <div className="p-6">
          <div className="mb-4">
            <Link href="/catalog" className="text-sm text-gray-500">← Back to catalog</Link>
          </div>

          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-lg font-bold">{product.price}</p>

          <div className="mt-6">
            <p className="text-xs text-gray-500 uppercase">Colors</p>
            <div className="flex gap-2 mt-3">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded-full border ${c} ${selectedColor===c? 'ring-2 ring-offset-2 ring-purple-600':''}`} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500 uppercase">Size</p>
            <div className="mt-2 flex gap-2">
              {['S','M','L','XL'].map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 border ${size===s? 'bg-gray-900 text-white':''}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1 border">-</button>
              <div className="px-4">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1 border">+</button>
            </div>

            <button onClick={handleAdd} className="ml-4 bg-purple-700 text-white px-4 py-2 rounded">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
