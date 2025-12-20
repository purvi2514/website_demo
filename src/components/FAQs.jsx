import React from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQs() {
  const faqs = [
    { q: "Do you use genuine parts?", a: "Yes, we only use certified genuine parts." },
    { q: "How long does a service take?", a: "Most services are completed within 2-3 hours." }
  ];
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}>
        FAQs
      </Typography>
      {faqs.map((f, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
