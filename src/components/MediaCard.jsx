import { Card, Typography, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import Image1 from "../assets/images/images.jpeg";
import Image2 from "../assets/images/images1.jpg";
import Image3 from "../assets/images/images2.jpeg";

const defaultThumbnails = {
  video: [Image1, Image2, Image3],
  movie: [Image1, Image2, Image3],
  image: [Image1, Image2, Image3],
};

const getRandomThumbnail = (type) => {
  const images = defaultThumbnails[type] || defaultThumbnails.image;
  return images[Math.floor(Math.random() * images.length)];
};

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <StarIcon
      key={i}
      sx={{
        color: i < rating ? "#ffcc00" : "#666",
        fontSize: "18px",
      }}
    />
  ));
};

const MediaCard = ({ media }) => {
  const isVideoOrMovie =
    media.category === "videos" || media.category === "movies";
  const thumbnail = isVideoOrMovie
    ? getRandomThumbnail(media.category)
    : media.url || getRandomThumbnail(media.category || "image");

  return (
    <Link to={`/media/${media.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          margin: "12px",
          borderRadius: "16px",
          overflow: "hidden",
          height: 280,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.5)), url(${thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box sx={{ padding: "10px", textAlign: "center", color: "#fff" }}>
          <Typography
            variant="h6"
            component={Link}
            to={`/media/${media.id}`}
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
              textDecoration: "none",
              color: "#fff",
              transition: "color 0.3s ease",
              "&:hover": { color: "#ffcc00" },
            }}
          >
            {media.title || "Untitled"}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
          >
            {renderStars(media.averageRating || 0)}
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", paddingBottom: "10px" }}>
          {isVideoOrMovie && (
            <IconButton
              component={Link}
              to={`/media/${media.id}`}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "12px",
                borderRadius: "50%",
                transition: "background 0.3s ease",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
        </Box>
      </Card>
    </Link>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    averageRating: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
  }).isRequired,
};

export default MediaCard;
