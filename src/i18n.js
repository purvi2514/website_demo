import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        engine: "Engine Parts",
        tyres: "Tyres",
        accessories: "Accessories",
        lights: "Lights",
        spares: "Spares",
        service: "Service",
        others: "Others",
        searchPlaceholder: "Search motorcycle parts..."
      },
      banner: {
        title: "Performance in Every Detail",
        sub: "Performance Parts. Pure Adrenaline",
        cta: "Shop Now"
      },
      topCategories: "Top Categories",
      bestSellers: "Best Sellers",
      freeStrip: "Free Shipping Above SAR 999 | Easy EMI | Secure Payments",
      booking: {
        title: "Request a Booking",
        name: "Your Name",
        phone: "Mobile Number",
        submit: "Request"
      },
      products: {
        "Cap Fuel Tank": "Cap Fuel Tank",
        "Carburettor A102": "Carburettor A102",
        "Front Fender": "Front Fender",
        "Jack Shaft": "Jack Shaft",
        "LED Headlight": "LED Headlight",
        "Fog Lamp": "Fog Lamp",
        "Tail Light": "Tail Light",
        "Indicator Set": "Indicator Set",
        "Projector Lamp": "Projector Lamp"
      }
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
    translation: {
      nav: {
        home: "الرئيسية",
        engine: "قطع المحرك",
        tyres: "الإطارات",
        accessories: "الاكسسوارات",
        lights: "الأنوار",
        spares: "القطع",
        service: "الخدمة",
        others: "أخرى",
        searchPlaceholder: "ابحث عن قطع الدراجات النارية..."
      },
      banner: {
        title: "الأداء في كل تفصيل",
        sub: "قطع الأداء. أدرينالين خالص",
        cta: "تسوق الآن"
      },
      topCategories: "أفضل الفئات",
      bestSellers: "الأكثر مبيعاً",
      freeStrip: "شحن مجاني فوق ٩٩٩ ريال | تقسيط سهل | مدفوعات آمنة",
      booking: {
        title: "طلب حجز",
        name: "اسمك",
        phone: "رقم الجوال",
        submit: "طلب"
      },
      products: {
        "Cap Fuel Tank": "غطاء خزان الوقود",
        "Carburettor A102": "كاربوريتر A102",
        "Front Fender": "حاجب العجلة الأمامية",
        "Jack Shaft": "عمود التروس",
        "LED Headlight": "مصباح رأس LED",
        "Fog Lamp": "مصباح الضباب",
        "Tail Light": "مصباح الذيل",
        "Indicator Set": "مجموعة المؤشرات",
        "Projector Lamp": "مصباح العاكس"
      }
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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;