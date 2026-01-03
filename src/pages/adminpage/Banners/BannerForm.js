import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function BannerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await axios.get(endpoints.banners.detail(id));
        const b = res.data.data.banner;
        setTitle(b.title || '');
      } catch (err) {
        console.error(err);
        alert('Failed to load banner');
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (!id) {
        const form = new FormData();
        form.append('title', title);
        if (imageFile) form.append('image', imageFile);
        res = await axios.post(endpoints.banners.create, form, { headers: {'Content-Type':'multipart/form-data'} });
      } else {
        // update text fields
        res = await axios.put(endpoints.banners.update(id), { title });
        // if image was selected upload separately
        if (imageFile) {
          const form = new FormData();
          form.append('image', imageFile);
          await axios.post(endpoints.banners.uploadImage(id), form, { headers: {'Content-Type':'multipart/form-data'} });
        }
      }
      navigate('/admin/banners');
    } catch (err) {
      console.error(err);
      alert('Failed to save banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'New'} Banner</h2>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="block text-sm mb-1">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Image</label>
          <input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" disabled={loading} className="px-3 py-2 bg-teal-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/banners')} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
