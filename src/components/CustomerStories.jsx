import React from "react";
import { Container, Typography, Paper } from "@mui/material";

export default function CustomerStories() {
  const stories = [
    { name: "Rahul", text: "Got my car modified here, amazing service!" },
    { name: "Sneha", text: "Quick repair and friendly staff." }
  ];
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}>
        Hear It from Fellow Car Owners
      </Typography>
      {stories.map((s, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{s.name}</Typography>
          <Typography>{s.text}</Typography>
        </Paper>
      ))}
    </Container>
  );
}
