import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  Divider,
  IconButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  Collapse,
} from "@mui/material";
import {
  Chat,
  ChevronRight,
  Logout,
  Notifications,
  Search,
  Menu as MenuIcon,
  ChevronLeft,
  Dashboard,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import {
  Avatar,
  Badge,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";

import logo from "../assets/logo.png";
import { getNavs } from "../navigation";
import { clearMsg, logout as logoutAction } from "../store/reducers/auth";
import toast from "react-hot-toast";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    minHeight: "100vh",
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [navs, setNavs] = useState([]);
  const [collapseMenu, setCollapseMenu] = useState({});

  const openAccountMenu = Boolean(anchorEl);

  // INVOKE
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // HANDLE NAVIGATE
  const handleNavigate = (path) => {
    handleCloseAccountMenu();
    navigate(path);
  };

  // GET STORE DATA
  const { role, userInfo, successMsg, errorMsg } = useSelector(
    (store) => store.auth
  );

  // HANDLE ACCOUNT MENU OPEN
  const handleOpenAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // HANDLE ACCOUNT MENU CLOSE
  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  // HANDLE OPEN DRAWER
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // HANDLE CLOSE DRAWER
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // HANDLE LOGOUT
  const handleLogout = () => {
    handleCloseAccountMenu();
    dispatch(logoutAction());
  };

  // SHOW TOAST NOTIFICATION
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      toast.success(successMsg);
      window.location.href = "/";
      dispatch(clearMsg());
    }
  }, [successMsg, errorMsg]);

  useEffect(() => {
    const allNavs = getNavs(role);
    setNavs(allNavs);
  }, [role]);

  useEffect(() => {
    // Initialize collapseMenu when navs change
    const initialCollapseMenu = navs
      .filter((nav) => nav.children)
      .reduce((acc, curr) => {
        acc[curr.id] = false;
        return acc;
      }, {});
    setCollapseMenu(initialCollapseMenu);
  }, [navs]);

  const handleToggle = (id) => {
    setCollapseMenu((prevCollapseMenu) => ({
      ...prevCollapseMenu,
      [id]: !prevCollapseMenu[id],
    }));
  };

  return (
    <Box sx={{ display: "flex" }} bgcolor={grey[200]}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0} color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 1, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: "30px" }} />
            </Link>
          )}
          <Box ml={2} display={open ? "none" : "block"}>
            <Typography fontSize={18} fontWeight={600} color={grey[600]}>
              APBN
            </Typography>
            <Typography fontSize={10} fontWeight={600} color={grey[600]}>
              Armd Police Battalion
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "auto" }} display="flex" alignItems="center">
            <Box>
              <Tooltip title="Account settings" arrow>
                <IconButton
                  onClick={handleOpenAccountMenu}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openAccountMenu ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? "true" : undefined}
                >
                  <Avatar
                    src={userInfo?.image?.secure_url}
                    alt={userInfo?.name || "S"}
                    sx={{ width: 32, height: 32 }}
                  >
                    M
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAccountMenu}
                onClose={handleCloseAccountMenu}
                onClick={handleCloseAccountMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleNavigate("/scout/profile")}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleNavigate("/scout/dashboard")}>
                  <ListItemIcon>
                    <Dashboard color="info" fontSize="small" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout color="info" fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: "30px" }} />
            </Link>
            <Box>
              <Typography fontSize={18} fontWeight={600} color={grey[600]}>
                APBN
              </Typography>
              <Typography fontSize={10} fontWeight={600} color={grey[600]}>
                Armd Police Battalion
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ backgroundColor: grey[200] }}
          >
            <ChevronLeft color="error" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box mt={3}>
          <Box px={2.5} fontSize={16} fontWeight={600}>
            Login As:{" "}
            <Chip
              variant="outlined"
              label={userInfo?.scout ? userInfo?.name : "Guest"}
              color="error"
              size="small"
            />
          </Box>
          <Divider sx={{ my: 1 }} />
          {navs &&
            navs.map((nav, i) => {
              if (!nav.children) {
                return (
                  <MenuItem
                    key={i}
                    sx={{
                      py: 1.5,
                    }}
                    onClick={() => navigate(nav.path)}
                    selected={pathname === nav.path}
                  >
                    <ListItemIcon>{nav.icon}</ListItemIcon>
                    <ListItemText primary={nav.title} />
                  </MenuItem>
                );
              } else {
                return (
                  <Box key={i}>
                    <MenuItem
                      sx={{
                        py: 1.5,
                      }}
                      onClick={() => handleToggle(nav.id)}
                    >
                      <ListItemIcon>{nav.icon}</ListItemIcon>
                      <ListItemText primary={nav.title} />
                      {collapseMenu[nav.id] ? (
                        <KeyboardArrowUp color="info" />
                      ) : (
                        <KeyboardArrowDown color="info" />
                      )}
                    </MenuItem>
                    <Collapse in={collapseMenu[nav.id]}>
                      {nav.children.map((child) => (
                        <MenuItem
                          key={child.path}
                          sx={{
                            pl: 6,
                          }}
                          onClick={() => navigate(child.path)}
                          selected={pathname === child.path}
                        >
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.title} />
                        </MenuItem>
                      ))}
                    </Collapse>
                  </Box>
                );
              }
            })}
          <MenuItem
            sx={{
              my: 1,
              py: 1.5,
            }}
            onClick={handleLogout}
          >
            <ListItemIcon>
              <Logout color="info" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
