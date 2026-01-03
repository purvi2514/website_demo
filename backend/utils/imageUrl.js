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




module.exports = {
  getBaseUrl,
  constructImageUrl,
  transformTopCategory,
};
