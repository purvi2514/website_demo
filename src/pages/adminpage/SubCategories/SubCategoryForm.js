import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../helpers/axios';
import endpoints from '../../../helpers/endpoints';

export default function SubCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(endpoints.categories.list);
        setCategories(res.data.data.categories || []);
        if (id) {
          const r2 = await axios.get(endpoints.subcategories.detail(id));
          const s = r2.data.data.subcategory;
          setName(s.name || '');
          setParent(s.parent ? s.parent._id : '');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to load data');
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!id) {
        await axios.post(endpoints.subcategories.create, { name, parent });
      } else {
        await axios.put(endpoints.subcategories.update(id), { name, parent });
      }
      navigate('/admin/subcategories');
    } catch (err) {
      console.error(err);
      alert('Failed to save sub category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'New'} Sub Category</h2>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="block text-sm mb-1">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Parent Category</label>
          <select value={parent} onChange={e=>setParent(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">-- Select Category --</option>
            {categories.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" disabled={loading} className="px-3 py-2 bg-teal-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/admin/subcategories')} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
