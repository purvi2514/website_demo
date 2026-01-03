import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function TopCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await axios.get(endpoints.topcategories.detail(id));
        const t = res.data.data.topCategory;
        setName(t.name || '');
      } catch (err) {
        console.error(err);
        alert('Failed to load top category');
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
        form.append('name', name);
        if (imgFile) form.append('img', imgFile);
        res = await axios.post(endpoints.topcategories.create, form, { headers: {'Content-Type':'multipart/form-data'} });
      } else {
        res = await axios.put(endpoints.topcategories.update(id), { name });
        if (imgFile) {
          const form = new FormData();
          form.append('image', imgFile);
          await axios.post(endpoints.topcategories.uploadImage(id), form, { headers: {'Content-Type':'multipart/form-data'} });
        }
      }
      navigate('/admin/topcategories');
    } catch (err) {
      console.error(err);
      alert('Failed to save top category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'New'} Top Category</h2>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Image</label>
          <input type="file" accept="image/*" onChange={e=>setImgFile(e.target.files[0])} />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" disabled={loading} className="px-3 py-2 bg-teal-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/topcategories')} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
