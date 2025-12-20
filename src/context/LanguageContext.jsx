import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      home: "Home",
      engine: "Engine Parts",
      tyres: "Tyres",
      accessories: "Accessories",
      lights: "Lights",
      spares: "Spares",
      service: "Service",
      others: "Others",
      search: "Search motorcycle & car parts..."
    },
    strip: "Free Shipping Above SAR 999 | Easy EMI | Secure Payments",
    hero: { title: "Performance in Every Detail", sub: "Premium parts. Fair prices.", cta: "Shop Now" },
    sections: {
      topCategories: "Top Categories",
      bestSellers: "Best Sellers",
      whyShop: "Why shop with us?",
      booking: "Request a Booking",
      name: "Your Name",
      phone: "Mobile Number",
      submit: "Request"
    },
    footer: {
      contact: "Contact",
      quickLinks: "Quick Links",
      support: "Support",
      address: "Riyadh, Saudi Arabia",
      email: "care@yourshop.sa",
      call: "Call",
      open: "Open: Sun–Thu 9:30–19:00",
      directions: "Get Directions"
    }
    ,
    products: {
      "102": "STP",
      "Cap Fuel Tank": "Cap Fuel Tank",
      "Carburettor A102": "Carburettor A102",
      "Front Fender": "Front Fender",
      "Jack Shaft": "Jack Shaft",
      "LED Headlight": "LED Headlight",
      "Fog Lamp": "Fog Lamp",
      "Tail Light": "Tail Light",
      "Indicator Set": "Indicator Set",
      "Projector Lamp": "Projector Lamp",
      "Chain Kit #1": "Chain Kit #1",
      "Chain Kit #2": "Chain Kit #2",
      "Chain Kit #3": "Chain Kit #3",
      "Chain Kit #4": "Chain Kit #4",
      "Chain Kit #5": "Chain Kit #5",
      "Chain Kit #6": "Chain Kit #6",
      "Chain Kit #7": "Chain Kit #7",
      "Chain Kit #8": "Chain Kit #8",
      "Chain Kit #9": "Chain Kit #9",
      "Chain Kit #10": "Chain Kit #10",
      "Chain Kit #11": "Chain Kit #11",
      "Chain Kit #12": "Chain Kit #12"
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty.",
      shopProducts: "Shop Products",
      adjustQuantities: "Tip: Adjust quantities to update totals",
      clearCart: "Clear Cart",
      cartTotals: "Cart Totals",
      subtotal: "Subtotal",
      shipping: "Shipping",
      shippingCalc: "Calculated at checkout",
      total: "Total",
      checkout: "Proceed to Checkout"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      engine: "قطع المحرك",
      tyres: "الإطارات",
      accessories: "الاكسسوارات",
      lights: "الأنوار",
      spares: "القطع",
      service: "الخدمة",
      others: "أخرى",
      search: "ابحث عن قطع السيارات والدراجات..."
    },
    strip: "شحن مجاني فوق ٩٩٩ ريال | تقسيط سهل | مدفوعات آمنة",
    hero: { title: "الأداء في كل تفصيل", sub: "قطع مميزة. أسعار عادلة.", cta: "تسوق الآن" },
    sections: {
      topCategories: "أفضل الفئات",
      bestSellers: "الأكثر مبيعاً",
      whyShop: "لماذا تتسوق معنا؟",
      booking: "طلب حجز",
      name: "اسمك",
      phone: "رقم الجوال",
      submit: "طلب"
    },
    footer: {
      contact: "تواصل",
      quickLinks: "روابط سريعة",
      support: "الدعم",
      address: "الرياض، المملكة العربية السعودية",
      email: "care@yourshop.sa",
      call: "اتصل",
      open: "مفتوح: الأحد–الخميس 9:30–19:00",
      directions: "اتجاهات"
    }
    ,
    products: {
      "102": "STP",
      "Cap Fuel Tank": "غطاء خزان الوقود",
      "Carburettor A102": "كاربوريتر A102",
      "Front Fender": "حاجب العجلة الأمامية",
      "Jack Shaft": "عمود التروس",
      "LED Headlight": "مصباح رأس LED",
      "Fog Lamp": "مصباح الضباب",
      "Tail Light": "مصباح الذيل",
      "Indicator Set": "مجموعة المؤشرات",
      "Projector Lamp": "مصباح العاكس",
      "Chain Kit #1": "طقم سلسلة #1",
      "Chain Kit #2": "طقم سلسلة #2",
      "Chain Kit #3": "طقم سلسلة #3",
      "Chain Kit #4": "طقم سلسلة #4",
      "Chain Kit #5": "طقم سلسلة #5",
      "Chain Kit #6": "طقم سلسلة #6",
      "Chain Kit #7": "طقم سلسلة #7",
      "Chain Kit #8": "طقم سلسلة #8",
      "Chain Kit #9": "طقم سلسلة #9",
      "Chain Kit #10": "طقم سلسلة #10",
      "Chain Kit #11": "طقم سلسلة #11",
      "Chain Kit #12": "طقم سلسلة #12"
    },
    cart: {
      title: "سلة التسوق",
      empty: "سلتك فارغة.",
      shopProducts: "تسوق المنتجات",
      adjustQuantities: "نصيحة: اضبط الكميات لتحديث الإجماليات",
      clearCart: "مسح السلة",
      cartTotals: "إجمالي السلة",
      subtotal: "المجموع الجزئي",
      shipping: "الشحن",
      shippingCalc: "يتم حسابه عند الدفع",
      total: "الإجمالي",
      checkout: "المتابعة للدفع"
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const direction = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = direction;
  }, [lang, direction]);

  const t = useMemo(() => {
    const dict = translations[lang];
    const getter = (path) => path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), dict) || path;
    return getter;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, direction, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
