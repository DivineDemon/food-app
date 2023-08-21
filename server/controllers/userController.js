const uploadProfile = async (req, res) => {
  const formData = new FormData();
  formData.append("image", req.body.image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.url;
};

module.exports = {
  uploadProfile,
};
