import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchMedias } from "../../services/api";
import { Box } from "@mui/material";

const categoryStyles = {
  videos: "linear-gradient(135deg, #ff6b6b, #ff4757)",
  images: "linear-gradient(135deg, #1e90ff, #3742fa)",
  movies: "linear-gradient(135deg, #2ed573, #10ac84)",
};

const ViewCards = () => {
  const categories = ["videos", "images", "movies"];
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        const counts = categories.map((category) => ({
          category,
          count: medias.filter((media) => media.category === category).length,
        }));
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    loadMedias();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Overview
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categoryCounts.map(({ category, count }) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card
              sx={{
                borderRadius: "20px",
                textAlign: "center",
                height: "14rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                },
                background: categoryStyles[category] || "#ccc",
                color: "white",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ letterSpacing: "1px" }}
                >
                  {category.toUpperCase()}
                </Typography>
                <Typography variant="h3" fontWeight="bold" mt={1}>
                  {count}
                </Typography>
              </CardContent>
              {/* Floating effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  filter: "blur(8px)",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewCards;
