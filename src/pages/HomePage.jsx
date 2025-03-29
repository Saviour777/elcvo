import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MediaCard from "../components/MediaCard";
import Container from "@mui/material/Container";
import { Skeleton, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { fetchMedias } from "../services/api";

const HomePage = () => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        setMediaData(medias);
      } catch (error) {
        console.error("Error loading medias:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedias();
  }, []);

  return (
    <div>
      <Hero />
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          paddingTop: "16px",
          paddingBottom: "16px",
          marginTop: "0px",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: 4 }}
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 3, md: 3 }}>
                <Box sx={{ width: "100%", padding: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={180} />
                  <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))
          ) : mediaData.length === 0 ? (
            <Grid size={12} textAlign="center">
              <Box sx={{ py: 4 }}>
                <h3>No pictures available</h3>
              </Box>
            </Grid>
          ) : (
            mediaData.map((media) => (
              <Grid key={media.id} size={{ xs: 12, sm: 3, md: 3 }}>
                <MediaCard media={media} loading={loading} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
