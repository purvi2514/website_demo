export const formatSAR = (amount, lang = "en") => {
  const locale = lang === "ar" ? "ar-SA" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency: "SAR" }).format(Number(amount || 0));
};
