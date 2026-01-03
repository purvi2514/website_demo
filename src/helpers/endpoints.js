const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default {
  auth: {
    login: `${BASE}/api/auth/login`,
    signup: `${BASE}/api/auth/signup`,
    logout: `${BASE}/api/auth/logout`,
    me: `${BASE}/api/auth/me`,
  },

  products: {
    base: `${BASE}/api/products`,
    list: `${BASE}/api/products`,
    create: `${BASE}/api/products`,
    search: `${BASE}/api/products/search`,
    bestsellers: `${BASE}/api/products/bestsellers`,
    bySlug: (slug) => `${BASE}/api/products/slug/${slug}`,
    byId: (id) => `${BASE}/api/products/${id}`,
    uploadImages: (id) => `${BASE}/api/products/${id}/images`,
    update: (id) => `${BASE}/api/products/${id}`,
    remove: (id) => `${BASE}/api/products/${id}`,
  },

  categories: {
    base: `${BASE}/api/categories`,
    list: `${BASE}/api/categories`,
    menu: `${BASE}/api/categories/nav`,
    topCategories: `${BASE}/api/categories/topcategories`,
    byId: (id) => `${BASE}/api/categories/${id}`,
    create: `${BASE}/api/categories`,
    update: (id) => `${BASE}/api/categories/${id}`,
    remove: (id) => `${BASE}/api/categories/${id}`,
  },

  topcategories: {
    base: `${BASE}/api/topcategories`,
    list: `${BASE}/api/topcategories`,
    byId: (id) => `${BASE}/api/topcategories/${id}`,
    create: `${BASE}/api/topcategories`,
    update: (id) => `${BASE}/api/topcategories/${id}`,
    remove: (id) => `${BASE}/api/topcategories/${id}`,
    uploadImage: (id) => `${BASE}/api/topcategories/${id}/image`,
    addSubProduct: (id) => `${BASE}/api/topcategories/${id}/subproducts`,
    updateSubProduct: (id, subId) => `${BASE}/api/topcategories/${id}/subproducts/${subId}`,
    deleteSubProduct: (id, subId) => `${BASE}/api/topcategories/${id}/subproducts/${subId}`,
    uploadSubProductImage: (id, subId) => `${BASE}/api/topcategories/${id}/subproducts/${subId}/image`,
  },

  subcategories: {
    base: `${BASE}/api/subcategories`,
    list: `${BASE}/api/subcategories`,
    byId: (id) => `${BASE}/api/subcategories/${id}`,
    create: `${BASE}/api/subcategories`,
    update: (id) => `${BASE}/api/subcategories/${id}`,
    remove: (id) => `${BASE}/api/subcategories/${id}`,
  },

  banners: {
    base: `${BASE}/api/banners`,
    list: `${BASE}/api/banners`,
    byId: (id) => `${BASE}/api/banners/${id}`,
    create: `${BASE}/api/banners`,
    update: (id) => `${BASE}/api/banners/${id}`,
    remove: (id) => `${BASE}/api/banners/${id}`,
    uploadImage: (id) => `${BASE}/api/banners/${id}/image`,
  },

  cart: {
    base: `${BASE}/api/cart`,
    get: `${BASE}/api/cart`,
    add: `${BASE}/api/cart`,
    updateItem: (id) => `${BASE}/api/cart/${id}`,
    removeItem: (id) => `${BASE}/api/cart/${id}`,
    clear: `${BASE}/api/cart`,
  },

  orders: {
    base: `${BASE}/api/orders`,
    list: `${BASE}/api/orders`,
    create: `${BASE}/api/orders`,
    byId: (id) => `${BASE}/api/orders/${id}`,
    update: (id) => `${BASE}/api/orders/${id}`,
  },

  wishlist: {
    base: `${BASE}/api/wishlist`,
    toggle: (productId) => `${BASE}/api/wishlist/${productId}`,
    list: `${BASE}/api/wishlist`,
  },

  uploads: {
    image: `${BASE}/api/uploads/image`,
  },
};
