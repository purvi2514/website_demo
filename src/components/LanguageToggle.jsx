import { Button, Box } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <Box textAlign="right">
      <Button
        size="small"
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
      >
        {lang === "en" ? "العربية" : "English"}
      </Button>
    </Box>
  );
}
