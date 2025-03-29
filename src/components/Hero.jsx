import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import hero from "../assets/images/images3.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated Border Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          border: "4px dashed rgba(255,255,255,0.5)",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          boxShadow: "0px 0px 15px rgba(255,255,255,0.2)",
        }}
      />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#fff",
            letterSpacing: "3px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          }}
        >
         The world is awesome <br/> and so are the games
        </Typography>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <Typography
            variant="h5"
            sx={{
              fontStyle: "italic",
              marginTop: "15px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
           View the latest images of your favorites
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Hero;
