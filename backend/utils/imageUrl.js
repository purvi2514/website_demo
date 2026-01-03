function getBaseUrl(req) {
  if (process.env.API_BASE_URL) return process.env.API_BASE_URL;
  if (req && req.get) {
    const protocol = req.get("x-forwarded-proto") || req.protocol || "http";
    const host = req.get("x-forwarded-host") || req.get("host") || "localhost:5000";
    return `${protocol}://${host}`;
  }
  const isDev = process.env.NODE_ENV !== "production";
  return isDev ? "http://localhost:5000" : "https://api.tazweed.com";
}

function constructImageUrl(imagePath, req) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const base = getBaseUrl(req);
  return `${base}${imagePath}`;
}

function toPlain(doc) {
  return doc?.toObject ? doc.toObject() : { ...doc };
}

function transformTopCategory(cat, req) {
  const base = `${req.protocol}://${req.get("host")}`;
  return {
    _id: cat._id,
    name: cat.name,
    count: cat.count,
    active: cat.active,
    img: cat.img ? base + cat.img : "",
    subProducts: cat.subProducts?.map(sp => ({
      _id: sp._id,
      name: sp.name,
      price: sp.price,
      type: sp.type,
      active: sp.active,
      image: sp.image ? base + sp.image : ""
    })) || []
  };
}

function transformBanner(banner, req) {
  const base = `${req.protocol}://${req.get("host")}`;
  return {
    _id: banner._id,
    title: banner.title,
    image: banner.image ? base + banner.image : "",
    link: banner.link || "",
    active: banner.active,
    order: banner.order,
  };
}




function transformProduct(prod, req) {
  if (!prod) return null;
  const base = getBaseUrl(req);
  const p = toPlain(prod);
  return {
    _id: p._id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    images: (p.images || []).map(i => (i && i.startsWith('http') ? i : base + i)),
    category: p.category ? (p.category._id ? { _id: p.category._id, name: p.category.name, slug: p.category.slug } : { _id: p.category }) : null,
    stock: p.stock,
    featured: p.featured,
    active: p.active,
    bestSeller: p.bestSeller,
    meta: p.meta || {},
  };
}

module.exports = {
  getBaseUrl,
  constructImageUrl,
  transformTopCategory,
  transformBanner,
  transformProduct,
};
