import React from "react";
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import EmailIcon from "@mui/icons-material/Email";


// Hero section image path
const HERO_IMG = "/images/hero.png";




// Features array with 6 features and icons
const FEATURES = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        width="48"
        height="48"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
    title: "Drag & Drop Resume Builder",
    description: "Customize your resume with an intuitive drag & drop interface.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        width="48"
        height="48"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "AI-Powered Suggestions",
    description: "Receive smart, real-time improvements from our AI assistant.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        width="48"
        height="48"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    title: "Export & Share",
    description: "Easily export in various formats and securely share your resume.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        width="48"
        height="48"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Modern Templates",
    description: "Choose from a library of professional, ATS-friendly resume templates.",
  },
  {
    icon: (<svg
   xmlns="http://www.w3.org/2000/svg"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
   viewBox="0 0 24 24"
   width="48"
   height="48"
>
   <path d="M12 1a10 10 0 00-10 10v5a4 4 0 004 4h2v-7H6v-2a6 6 0 1112 0v2h-2v7h2a4 4 0 004-4v-5A10 10 0 0012 1z" />
</svg>
),
    title: "Live Support",
    description: "Get help anytime with our responsive live customer support.",
  },
  {
    icon: (<svg
   xmlns="http://www.w3.org/2000/svg"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
   viewBox="0 0 24 24"
   width="48"
   height="48"
>
   <path d="M17 21v-2a4 4 0 00-3-3.87" />
   <path d="M7 21v-2a4 4 0 013-3.87" />
   <circle cx="12" cy="7" r="4" />
   <circle cx="5" cy="7" r="3" />
   <circle cx="19" cy="7" r="3" />
</svg>
),
    title: "Community",
    description: "Connect, share advice, and grow with our active user community.",
  },
];


// Texture URL from Transparent Textures
const TEXTURE_URL = "https://www.transparenttextures.com/patterns/paper-fibers.png";


export default function LandingPage() {
  const theme = useTheme();


  return (
    <Box
      sx={{
        fontFamily: theme.typography.fontFamily,
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage: `url(${TEXTURE_URL})`,
        backgroundRepeat: "repeat",
        backgroundBlendMode: "overlay",
        color: "text.primary",
        px: 2,
      }}
    >
      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          fontFamily: theme.typography.fontFamily,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          py: 12,
          px: 3,
        }}
      >
        <Box sx={{ fontFamily: theme.typography.fontFamily, flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: 24, md: 32 }, textTransform: "uppercase", fontFamily: theme.typography.fontFamily }}
          >
            Build Your Perfect Resume Effortlessly
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontFamily: theme.typography.fontFamily, mb: 5, maxWidth: 540 }}
          >
            Empower your job search with the industry’s leading resume builder featuring AI assistance and beautiful templates.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/register"
            sx={{
              fontFamily: theme.typography.fontFamily,
              px: 6,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Get Started
          </Button>
        </Box>
        <Box sx={{ fontFamily: theme.typography.fontFamily, flex: 1, pl: { md: 6 }, textAlign: "center" }}>
          <Box
            component="img"
            src={HERO_IMG}
            alt="Professional working on resume"
            sx={{ fontFamily: theme.typography.fontFamily, width: "75%", borderRadius: 3, boxShadow: 4, maxWidth: 480 }}
            draggable={false}
          />
        </Box>
      </Container>


      {/* Features Section */}
      <Container maxWidth="lg" sx={{ fontFamily: theme.typography.fontFamily, pb: 10, px: 3 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center" textAlign="center">
          {FEATURES.map(({ icon, title, description }, idx) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={idx}
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Paper
                elevation={5}
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  px: 4,
                  py: 7,
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <Box sx={{ fontFamily: theme.typography.fontFamily, mb: 3, color: "primary.main" }}>{icon}</Box>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ textTransform: "uppercase", fontFamily: theme.typography.fontFamily }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, maxWidth: 320 }}>
                  {description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* How It Works Section */}
      <Container maxWidth="md" sx={{ fontFamily: theme.typography.fontFamily, py: 10 }}>
        <Typography variant="h4" fontWeight="bold" mb={8} textAlign="center" sx={{ textTransform: "uppercase" }}>
          How It Works
        </Typography>
        <Grid container spacing={6} justifyContent="center" textAlign="center">
          {[
            {
              icon: <DescriptionIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />,
              title: "Choose a Template",
              desc: "Pick from professional and ATS-friendly resume designs.",
            },
            {
              icon: <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />,
              title: "Fill in Your Details",
              desc: "Add your information with AI-powered content suggestions.",
            },
            {
              icon: <DownloadDoneIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />,
              title: "Download & Apply",
              desc: "Export in multiple file formats and begin your job search.",
            },
          ].map(({ icon, title, desc }, idx) => (
            <Grid size={{ xs: 12, sm: 4 }} key={idx}>
              <Paper
                elevation={4}
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  p: 6,
                  borderRadius: 4,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-10px)" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {icon}
                <Typography variant="h6" fontWeight={700} mb={2} sx={{ textTransform: "uppercase" }}>
                  {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, maxWidth: 280 }}>
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>


      {/* Extra Engagement Section */}
      <Container maxWidth="md" sx={{ fontFamily: theme.typography.fontFamily, py: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} sx={{ textTransform: "uppercase" }}>
          Resume Tips Blog Preview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 6 }}>
          Discover the top 5 things recruiters look for in resumes to maximize your chances with your next application.
        </Typography>
        <Button variant="outlined" href="/blog" size="large" sx={{ px: 6, py: 1.5, textTransform: "uppercase" }}>
          Read Our Blog
        </Button>
      </Container>


      {/* Email Signup Section */}
      <Container maxWidth="sm" sx={{ fontFamily: theme.typography.fontFamily, py: 8 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center" sx={{ textTransform: "uppercase" }}>
          Get Free Resume Tips Straight to Your Inbox
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for subscribing!");
          }}
          sx={{ display: "flex", gap: 2, justifyContent: "center" }}
        >
          <TextField
            type="email"
            required
            label="Email address"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
            }}
          />
          <Button type="submit" variant="contained" size="large" sx={{ px: 5, textTransform: "uppercase" }}>
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
