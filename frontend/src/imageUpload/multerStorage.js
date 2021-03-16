import axios from "axios";

export const multerStorage = async (API, file, setUploading, setImage) => {
  const formData = new FormData();
  formData.append("image", file);

  setUploading(true);
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`${API}/upload`, formData, config);
    const imageUrl = data.replace(/\\/g, "/");
    // set images readable instance of image being uploaded using multer
    setImage(imageUrl);
    setUploading(false);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.error(err);
    alert(err);
    setUploading(false);
  }
};
