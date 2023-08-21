export const isAuthenticated = () => {
  let user = null;
  const savedUser = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).user;

  if (Object.keys(savedUser).length !== 0) {
    user = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).user;
  }

  if (Object.keys(user).length !== 0) {
    return true;
  } else {
    return false;
  }
};

export const imageToBase64 = (image) => {
  return new Promise((resolve, reject) => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let base64 = e.target.result;
        base64 = base64.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
    } else {
      reject(new Error("No Image Provided."));
    }
  });
};