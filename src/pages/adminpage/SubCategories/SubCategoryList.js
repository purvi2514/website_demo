import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function SubCategoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(endpoints.subcategories.list);
        setItems(res.data.data.subcategories || []);
      } catch (err) {
        console.error(err);
        alert('Failed to load subcategories');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Sub Categories</h2>
        <Link to="/admin/subcategories/new" className="px-3 py-2 bg-teal-600 text-white rounded">New Sub Category</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">{b.parent ? b.parent.name : '-'}</td>
                <td className="px-4 py-3 text-center">
                  <Link to={`/admin/subcategories/${b._id}/edit`} className="text-teal-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
