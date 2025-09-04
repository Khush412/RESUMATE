import React, { useState, useEffect, forwardRef } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Button,
  InputBase,
  Tooltip,
  Dialog,
  DialogTitle,
  Avatar,
  ListItemIcon,
  Divider,
  styled,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import ThemeCustomizer from "./ThemeCustomizer";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// Search bar styles
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.17),
  transition: "background-color 0.3s ease",
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.3) },
  marginLeft: theme.spacing(4),
  width: "280px",
  [theme.breakpoints.down("sm")]: {
    width: "180px",
    marginLeft: theme.spacing(2),
  },
  boxShadow: "inset 0 0 6px rgba(255,255,255,0.1)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ddd",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "400",
  fontSize: 12,
  fontFamily: theme.typography.fontFamily,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: "width 0.3s ease, color 0.3s ease",
    width: "100%",
    fontFamily: theme.typography.fontFamily,
    "&:focus": {
      color: theme.palette.secondary.main,
      width: 320,
      [theme.breakpoints.down("md")]: { width: "100%" },
    },
    [theme.breakpoints.up("md")]: { width: 230 },
  },
}));

// Navigation link styles
const NavLink = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.secondary.main : theme.palette.common.white,
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: "0.07em",
  fontFamily: theme.typography.fontFamily,
  marginRight: theme.spacing(3),
  paddingBottom: 5,
  position: "relative",
  textTransform: "uppercase",
  background: "none",
  minWidth: 70,
  transition: "color 0.3s ease",
  borderBottom: active
    ? `2px solid ${theme.palette.secondary.main}`
    : "2px solid transparent",
  "&:hover, &:focus": {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    background: "none",
    outlineOffset: 2,
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 3,
  },
}));

// Site name
const SiteName = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.common.white,
  fontWeight: 800,
  letterSpacing: "0.18em",
  textDecoration: "none",
  userSelect: "none",
  whiteSpace: "nowrap",
  fontSize: "1.6rem",
  textTransform: "uppercase",
  cursor: "pointer",
}));

// Profile container
const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  padding: theme.spacing(0.25, 0.75),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: "background-color 0.3s",
  "&:hover, &:focus-visible": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    outline: "none",
  },
}));

const DropdownArrow = styled(ArrowDropDownIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 26,
  userSelect: "none",
  pointerEvents: "none",
}));

// ✅ Fixed StyledMenu with forwardRef so ModalProps works
const BaseMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 12,
    minWidth: 220,
    marginTop: theme.spacing(1.5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 3px 12px, rgba(0, 0, 0, 0.1) 0px 0px 2px",
  },
  "& .MuiMenu-list": {
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .MuiPaper-root::before": {
    content: '""',
    position: "absolute",
    top: 7,
    right: 26,
    width: 12,
    height: 12,
    bgcolor: theme.palette.background.paper,
    transform: "rotate(45deg)",
    boxShadow: "rgba(0, 0, 0, 0.1) -1px -1px 1px",
    zIndex: 0,
  },
}));

const StyledMenu = forwardRef((props, ref) => (
  <BaseMenu
    ref={ref}
    {...props}
  />
));

export default function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
    navigate("/");
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          fontFamily: theme.typography.fontFamily,
          backgroundColor: theme.palette.primary.main,
          boxShadow: hasShadow ? "0 3px 12px rgba(0,0,0,0.35)" : "none",
          transition: "box-shadow 0.3s ease",
          width: "100vw",
          left: 0,
          top: 0,
          zIndex: 1400,
        }}
        elevation={hasShadow ? 6 : 0}
        enableColorOnDark
      >
        <Toolbar
          sx={{
            px: 0,
            maxWidth: 1400,
            margin: "auto",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Site Name */}
          <Box sx={{ display: "flex", flexShrink: 0 }}>
            <SiteName
              component={RouterLink}
              to="/"
              tabIndex={0}
              aria-label="Go to homepage"
            >
              ResuMate
            </SiteName>
          </Box>

          {/* Navigation Links */}
          <Box
            component="nav"
            aria-label="main navigation"
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 6,
              alignItems: "center",
            }}
          >
            <NavLink
              component={RouterLink}
              to="/"
              active={isActive("/") ? 1 : 0}
              tabIndex={0}
            >
              Home
            </NavLink>
            <NavLink
              component={RouterLink}
              to="/community"
              active={isActive("/community") ? 1 : 0}
              tabIndex={0}
            >
              Community
            </NavLink>
            <NavLink
              component={RouterLink}
              to="/my-resumes"
              active={isActive("/my-resumes") ? 1 : 0}
              tabIndex={0}
            >
              Resumes
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Search aria-label="search resumes">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Theme Button */}
          <Tooltip title="Customize theme" arrow>
            <IconButton
              size="large"
              sx={{
                color: theme.palette.common.white,
                ml: 2,
                "&:hover": {
                  color: theme.palette.secondary.main,
                  backgroundColor: "transparent",
                },
                transition: "color 0.25s ease",
              }}
              onClick={() => setThemeDialogOpen(true)}
              aria-label="open theme customizer"
            >
              <PaletteIcon />
            </IconButton>
          </Tooltip>

          {/* User Profile or Login Button */}
          {isAuthenticated ? (
            <>
              <ProfileContainer
                aria-controls={anchorElUser ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorElUser ? "true" : undefined}
                onClick={handleOpenUserMenu}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenUserMenu(e);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="User account menu"
              >
                <Avatar
                  src={user?.profilePic || ""}
                  alt={user?.username || "User"}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    fontSize: 14,
                    userSelect: "none",
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <DropdownArrow />
              </ProfileContainer>

              <StyledMenu
                id="user-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  "aria-labelledby": "user-menu-button",
                  role: "menu",
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "700", mb: 0.5 }}
                  >
                    {user?.username || "User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user?.email || ""}
                  </Typography>
                </Box>

                <MenuItem onClick={handleProfile} sx={{ borderRadius: 1 }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/subscription");
                  }}
                >
                  <ListItemIcon>
                    <SubscriptionsIcon fontSize="small" />
                  </ListItemIcon>
                  Subscription
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    setThemeDialogOpen(true);
                  }}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem
                  onClick={handleLogout}
                  sx={{ borderRadius: 1, color: "error.main" }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </StyledMenu>
            </>
          ) : (
            <Button
              variant="outlined"
              component={RouterLink}
              to="/login"
              sx={{
                ml: 3,
                borderColor: theme.palette.common.white,
                color: theme.palette.common.white,
                fontWeight: 700,
                fontSize: 12,
                borderRadius: 2,
                px: 2,
                py: 0.8,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.secondary.main,
                  boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
                },
                "&:focus-visible": {
                  outline: `2px solid ${theme.palette.secondary.main}`,
                  outlineOffset: 4,
                },
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Theme Customizer Dialog */}
      <Dialog
        open={themeDialogOpen}
        onClose={() => setThemeDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="theme-dialog-title"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle id="theme-dialog-title" sx={{ fontWeight: 700 }}>
          Customize Theme
        </DialogTitle>
        <ThemeCustomizer />
      </Dialog>
    </>
  );
}
