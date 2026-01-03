import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(endpoints.banners.list);
        setBanners(res.data.data.banners || []);
      } catch (err) {
        console.error(err);
        alert('Failed to load banners');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Banners</h2>
        <Link to="/admin/banners/new" className="px-3 py-2 bg-teal-600 text-white rounded">New Banner</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="px-4 py-3">{b.title}</td>
                <td className="px-4 py-3 text-center"><img src={b.image} alt={b.title} className="h-12 mx-auto"/></td>
                <td className="px-4 py-3 text-center">
                  <Link to={`/admin/banners/${b._id}/edit`} className="text-teal-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
