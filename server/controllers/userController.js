const uploadProfile = async (req, res) => {
  const formData = new FormData();
  formData.append("image", req.body.image);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.data.url) {
      return res.status(200).json({
        success: true,
        message: "Successfully Stored Image!",
        url: data.data.url,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to Stored Image!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

module.exports = {
  uploadProfile,
};
