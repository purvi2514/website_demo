import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(endpoints.categories.list);
        setCategories(res.data.data.categories || []);
      } catch (err) {
        console.error(err);
        alert('Failed to load categories');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <Link to="/admin/categories/new" className="px-3 py-2 bg-teal-600 text-white rounded">New Category</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">{c.slug}</td>
                <td className="px-4 py-3 text-center">
                  <Link to={`/admin/categories/${c._id}/edit`} className="text-teal-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
