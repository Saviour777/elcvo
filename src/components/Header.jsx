import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useScroll, useSpring } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaCard from "./MediaCard";
import { fetchMedias } from "../services/api";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { scrollY } = useScroll();
  const ySpring = useSpring(scrollY, { stiffness: 100, damping: 20 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return ySpring.onChange((latest) => {
      setScrolled(latest > 100);
    });
  }, [ySpring]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await fetchMedias(searchTerm);
        setFilteredResults(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        background: scrolled
          ? "rgba(0, 0, 0, 0.7)"
          : "rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            px: 2,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              letterSpacing: "2px",
              border: "1px solid #fff",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            ELVCO
          </Typography>

          {/* Search Bar */}
          {!isMobile && (
            <Box
              sx={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}
              ref={searchRef}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                  color: "#fff",
                  "& input": { color: "#fff" },
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon sx={{ color: "#fff" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showDropdown && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    width: "100%",
                    background: "rgba(0,0,0,0.7)",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                    padding: 2,
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <Grid container spacing={1}>
                    {filteredResults.map((media) => (
                      <Grid key={media.id} size={{ xs: 12, sm: 12, md: 12 }}>
                        <MediaCard media={media} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Box>
          )}

          {/* Upload Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#ff4081",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                "&:hover": { backgroundColor: "#f50057" },
              }}
              onClick={() => navigate("/admin/upload")}
            >
              Upload
            </Button>
          </motion.div>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
