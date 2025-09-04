import React from "react";
import { Box, Button, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

const pages = [
  { label: "Profile", path: "/profile", icon: AccountCircleIcon },
  { label: "Subscription", path: "/subscription", icon: PaymentIcon },
  { label: "Billing", path: "/billing", icon: PaymentIcon },
  { label: "Community", path: "/community", icon: GroupIcon },
  { label: "My Resumes", path: "/my-resumes", icon: DescriptionIcon },
  { label: "Settings", path: "/settings", icon: SettingsIcon },
  { label: "Courses", path: "/courses", icon: SchoolIcon },
];

export default function ControlPanel() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)", // adjusting for navbar height
        mt: "64px", // leaving space for navbar
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 3, sm: 6 },
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant={isSmallScreen ? "h4" : "h2"}
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          fontFamily: theme.typography.fontFamily,
          letterSpacing: 1.2,
          color: theme.palette.text.primary,
          mb: 6,
          userSelect: "none",
          width: "100%",
          maxWidth: 600,
        }}
      >
        Control Panel
      </Typography>

      <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} justifyContent="center" sx={{ width: "100%", maxWidth: 1200 }}>
        {pages.map(({ label, path, icon: Icon }) => (
          <Grid 
            key={label} 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate(path)}
              aria-label={`Go to ${label}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 140,
                minWidth: 150,
                maxWidth: 220,
                borderRadius: 3,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: 18,
                textTransform: "none",
                boxShadow: theme.shadows[4],
                px: 3,
                py: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: theme.shadows[8],
                  transform: "translateY(-6px)",
                },
                "&:focus-visible": {
                  outline: `3px solid ${theme.palette.primary.dark}`,
                  outlineOffset: 3,
                },
              }}
            >
              {Icon && <Icon sx={{ fontSize: 42, mb: 1, color: "white" }} />}
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 12,
          color: theme.palette.text.secondary,
          userSelect: "none",
          fontSize: 14,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} ResuMate. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
