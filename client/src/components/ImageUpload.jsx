import React, { useState } from "react";

import Loading from "../components/Loading";
import { imageToBase64 } from "../utils/helpers";

const ImageUpload = ({ toggle, formData, setFormData, image }) => {
  const [loading, setLoading] = useState(false);

  const triggerUpload = () => {
    document.getElementById("imageUpload").click();
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    const base64 = await imageToBase64(e.target.files[0]);

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      }
    );

    const data = await response.json();

    if (data.url) {
      setLoading(false);
      setFormData({ ...formData, image: data.url });
    }
  };

  return (
    <>
      {!toggle && (
        <>
          <div className="w-full h-full rounded-md flex flex-col items-start justify-start space-y-3">
            <label className="text-sm font-semibold" htmlFor="image">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="imageUpload"
              className="hidden"
              onChange={(e) => handleImageUpload(e)}
            />
            <button
              type="button"
              onClick={triggerUpload}
              className={
                formData.image
                  ? "hidden"
                  : "px-5 py-3 text-white font-semibold rounded-lg bg-black"
              }>
              Upload Image
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full flex items-end justify-end">
              {formData.image ? (
                <img
                  src={formData.image || ""}
                  alt="profile"
                  className={
                    formData.image ? "w-32 h-32 rounded-full" : "hidden"
                  }
                />
              ) : (
                <img
                  src={image || ""}
                  alt="profile"
                  className={image ? "w-32 h-32 rounded-full" : "hidden"}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageUpload;
