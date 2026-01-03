import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', slug: '', price: 0, description: '', category: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(endpoints.products.byId(id));
        setForm(res.data.data || {});
      } catch (err) {
        console.error(err);
        alert('Failed to load product');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axios.put(endpoints.products.update(id), form);
        alert('Updated');
      } else {
        await axios.post(endpoints.products.create, form);
        alert('Created');
      }
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error?.message || 'Save failed';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Product' : 'New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Name" className="w-full px-3 py-2 border" />
        <input name="slug" value={form.slug || ''} onChange={handleChange} placeholder="Slug" className="w-full px-3 py-2 border" />
        <input name="price" value={form.price || 0} onChange={handleChange} placeholder="Price" type="number" className="w-full px-3 py-2 border" />
        <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border" />
        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-teal-600 text-white rounded">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
