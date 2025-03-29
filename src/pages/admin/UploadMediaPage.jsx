import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { uploadMedia } from "../../services/api";

const categories = ["Images"];

const UploadMediaPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!title || !category || !file) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category.toLowerCase());
    formData.append("file", file);

    try {
      const response = await uploadMedia(formData);

      console.log("Upload Success:", response.data);
      setSuccess("Media uploaded successfully!");
      setError("");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setProgress(0);
    } catch (error) {
      setError("Error uploading media");
      console.error("Upload Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);

    if (selectedFile) {
      const isValid =
        selectedFile.type.startsWith("video/") ||
        selectedFile.type.startsWith("image/");
      if (!isValid) {
        setError("Invalid file type. Please upload an image or video.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #1a1a2e, #16213e)",
        color: "#fff",
      }}
    >
      <Card
        sx={{
          width: 500,
          padding: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "15px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", color: "#FF9800" }}
          >
            Upload Media
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
            }}
          />

          <TextField
            select
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Drag & Drop Upload */}
          <Box
            sx={{
              border: "2px dashed #FF9800",
              borderRadius: 2,
              textAlign: "center",
              padding: 3,
              cursor: "pointer",
              mb: 2,
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <input
              type="file"
              accept="video/*,image/*"
              onChange={handleFileChange}
              hidden
              id="upload-input"
            />
            <label htmlFor="upload-input">
              <IconButton component="span">
                <CloudUpload sx={{ fontSize: 50, color: "#FF9800" }} />
              </IconButton>
              <Typography variant="body1">
                Drag & Drop or Click to Upload
              </Typography>
            </label>
          </Box>

          {/* File Preview */}
          {preview && (
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                mb: 2,
              }}
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <video width="100%" height="200px" controls>
                  <source src={preview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                }}
                onClick={handleRemoveFile}
              >
                <Delete />
              </IconButton>
            </Box>
          )}

          {/* Upload Progress */}
          {loading && (
            <Box sx={{ width: "100%", mb: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography
                variant="body2"
                sx={{ textAlign: "center", mt: 1, color: "#FF9800" }}
              >
                Uploading... {progress}%
              </Typography>
            </Box>
          )}

          {/* Upload Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleUpload}
            disabled={loading}
            sx={{
              mb: 2,
              backgroundColor: "#FF9800",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#e68900",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="#FF9800" />
            ) : (
              "Upload Image"
            )}
          </Button>

          {/* Success & Error Messages */}
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", mt: 2 }}
            >
              {error}
            </Typography>
          )}
          {success && (
            <Typography
              variant="body2"
              color="success"
              sx={{ textAlign: "center", mt: 2 }}
            >
              {success}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadMediaPage;
