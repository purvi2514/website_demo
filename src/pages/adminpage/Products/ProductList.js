import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(endpoints.products.list);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error(err);
        alert('Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <Link to="/admin/products/new" className="px-3 py-2 bg-teal-600 text-white rounded">New Product</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">₹{p.price}</td>
                <td className="px-4 py-3 text-center">
                  <Link to={`/admin/products/${p._id}/edit`} className="text-teal-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
