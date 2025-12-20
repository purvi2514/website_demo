import React from "react";
import { Button } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();
  return (
    <Button variant="outlined" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
      {lang === "en" ? "العربية" : "English"}
    </Button>
  );
}
