import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ViewCards from "./ViewCards";

const drawerWidth = 280; // Wider for better spacing

const AdminDashboard = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(10, 25, 47, 0.9)", // Glass effect
        backdropFilter: "blur(10px)",
        color: "#fff",
        paddingTop: 2,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          padding: "16px",
          fontWeight: "bold",
          color: "#FF9800",
        }}
      >
        Admin elvco
      </Typography>

      <Divider sx={{ backgroundColor: "#FF9800", margin: "8px 20px" }} />

      <List>
        {[
          { text: "HOME", path: "/" },
          { text: "OVERVIEW", path: "/admin" },
          { text: "UPLOAD IMAGES", path: "/admin/upload" },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? "#FF9800" : "#fff",
              background:
                location.pathname === item.path
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              borderRadius: "8px",
              margin: "8px 12px",
              transition: "0.3s",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ListItemText primary={item.text} sx={{ textAlign: "center" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              marginLeft: 2,
              color: "#FF9800",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(5px)",
              padding: "10px",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": { background: "rgba(255, 255, 255, 0.3)" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: "80%",
                boxSizing: "border-box",
                background: "rgba(10, 25, 47, 0.9)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "rgba(10, 25, 47, 0.9)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "linear-gradient(to right, #1a1a2e, #16213e)",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        {location.pathname === "/admin" && <ViewCards />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
