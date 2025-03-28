import  { useState } from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Box,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MediaCard from "./MediaCard";

const MediaTabs = ({ mediaData, loading }) => {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const filteredMedia =
    tab === "all"
      ? mediaData
      : mediaData.filter((media) => media.category === tab);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMedia = filteredMedia.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }}>
      {/* Modern Styled Tabs */}
      <Tabs
        value={tab}
        onChange={(e, newValue) => {
          setTab(newValue);
          setPage(1);
        }}
        centered
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "6px",
          display: "inline-block",
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        {["all", "videos", "images"].map((category) => (
          <Tab
            key={category}
            label={category.toUpperCase()}
            value={category}
            sx={{
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "0.3s",
              color: "#fff",
              "&.Mui-selected": {
                background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          />
        ))}
      </Tabs>

      {/* Loading State */}
      {loading ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : filteredMedia.length === 0 ? (
        <Typography variant="h6" sx={{ marginTop: 3, color: "gray" }}>
          No media available
        </Typography>
      ) : (
        <>
          {/* Media Grid */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            {paginatedMedia.map((media) => (
              <Grid key={media.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <MediaCard media={media} />
              </Grid>
            ))}
          </Grid>

          {/* Styled Pagination */}
          {filteredMedia.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(filteredMedia.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "#ff7eb3",
                },
                "& .Mui-selected": {
                  background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                  color: "white",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};
MediaTabs.propTypes = {
  mediaData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MediaTabs;

