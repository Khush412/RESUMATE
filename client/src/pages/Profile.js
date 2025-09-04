import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Profile() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3, fontFamily: theme.typography.fontFamily }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ textTransform: "uppercase" }}
        >
          Profile Page Removed
        </Typography>
        <Typography variant="body1" textAlign="center">
          The profile editing functionality has been removed.
        </Typography>
      </Paper>
    </Container>
  );
}
