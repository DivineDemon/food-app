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
