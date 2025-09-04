import React, { useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const FEATURES = [
  "Create a single resume",
  "Basic templates",
  "Download as PDF",
  "Save resumes locally",
  "Community support",
  "Create multiple resumes",
  "Access premium templates",
  "Download PDF & DOCX",
  "Unlimited cloud storage",
  "Priority email support",
  "SEO optimization tools",
  "Professional review services",
  "Resume delivery tracking",
  "Custom branding",
  "Dedicated support",
];

const PLAN_FEATURE_COUNTS = {
  free: 5,
  premium: 7,
  pro: FEATURES.length,
};

const PLANS = [
  { key: "free", name: "Free", price: "$0 / month" },
  { key: "premium", name: "Premium", price: "$9.99 / month" },
  { key: "pro", name: "Pro", price: "$19.99 / month" },
];

export default function SubscriptionPage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // Replace this with actual user subscription state fetched from API/context
  const [currentPlan, setCurrentPlan] = useState("free");
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const isFeatureIncluded = (planKey, featureIndex) =>
    featureIndex < PLAN_FEATURE_COUNTS[planKey];

  const handleSelectPlan = (planKey) => {
    setSelectedPlan(planKey);
  };

  const handleConfirmSubscription = () => {
    if (selectedPlan === currentPlan) return;
    // Here connect to backend and process payment/update subscription
    alert(`Successfully subscribed to ${selectedPlan.toUpperCase()} plan!`);
    setCurrentPlan(selectedPlan);
  };

  return (
    <Box maxWidth={960} mx="auto" my={6} px={2}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center">
        Choose Your Subscription Plan
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom align="center">
        Select the best plan that fits your needs and upgrade anytime.
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold", minWidth: 240 }}>
                Features
              </TableCell>
              {PLANS.map((plan) => (
                <TableCell
                  key={plan.key}
                  align="center"
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 18,
                    userSelect: "none",
                    bgcolor:
                      plan.key === currentPlan ? theme.palette.secondary.main : "inherit",
                  }}
                >
                  {plan.name}
                  <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                    {plan.price}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {FEATURES.map((feature, i) => (
              <TableRow key={feature} hover>
                <TableCell sx={{ py: 1.5, fontWeight: "600" }}>{feature}</TableCell>
                {PLANS.map((plan) => (
                  <TableCell key={plan.key + feature} align="center" sx={{ py: 1.5 }}>
                    {isFeatureIncluded(plan.key, i) ? (
                      <Tooltip title="Included" arrow>
                        <CheckCircleIcon color="success" fontSize="large" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not included" arrow>
                        <CancelIcon color="disabled" fontSize="large" />
                      </Tooltip>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            <TableRow>
              <TableCell />
              {PLANS.map((plan) => {
                const isCurrent = plan.key === currentPlan;
                const isSelected = plan.key === selectedPlan;
                return (
                  <TableCell key={"btn-" + plan.key} align="center" sx={{ py: 3 }}>
                    <Button
                      variant={isSelected ? "contained" : "outlined"}
                      color={isSelected ? "secondary" : "primary"}
                      disabled={isCurrent}
                      onClick={() => handleSelectPlan(plan.key)}
                      sx={{ minWidth: 140 }}
                    >
                      {isCurrent ? "Current Plan" : isSelected ? "Selected" : "Select"}
                    </Button>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        <Button
          variant="contained"
          color="secondary"
          size={isSmall ? "medium" : "large"}
          disabled={selectedPlan === currentPlan}
          onClick={handleConfirmSubscription}
        >
          {selectedPlan === currentPlan ? "Subscribed" : "Confirm Subscription"}
        </Button>
        {selectedPlan !== currentPlan && (
          <Button
            variant="outlined"
            size={isSmall ? "medium" : "large"}
            onClick={() => setSelectedPlan(currentPlan)}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}
