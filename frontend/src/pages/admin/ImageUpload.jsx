import React, { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (e) => {
    e.preventDefault();
    console.log("Upload button clicked.");

    if (!image) {
      console.error("No image selected.");
      setMessage("Please select an image.");
      return;
    }

    const formattedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    console.log("Formatted Tags:", formattedTags);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(formattedTags));
    formData.append("category", category);
    formData.append("file", image);
    formData.append("likes", JSON.stringify([]));
    formData.append("shares", 0);
    formData.append("views", 0);
    formData.append("downloads", 0);

    console.log("Form Data prepared:", {
      title,
      description,
      tags: formattedTags,
      category,
      file: image.name,
      likes: [],
      shares: 0,
      views: 0,
      downloads: 0,
    });

    try {
      console.log("Sending request to upload image...");
      const response = await axiosInstance.post(
        "/api/images/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", response.data);
      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
      setMessage("Error uploading image");
    }
  };

  return (
    <div className="max-w-md mx-auto pl-4">
      <h2 className="text-2xl font-bold my-4">Upload Image</h2>
      <form
        onSubmit={handleImageUpload}
        className="bg-white rounded-lg shadow-md"
      >
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-1 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Description
          </label>
          <textarea
            className="w-full px-3 py-1 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Tags
          </label>
          <input
            type="text"
            className="w-full px-3 py-1 border rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Category
          </label>
          <input
            type="text"
            className="w-full px-3 py-1 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Image
          </label>
          <input
            type="file"
            className="w-full px-3 py-1 border rounded"
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log("Selected file:", e.target.files[0]?.name || "None");
            }}
          />
        </div>
        {/* Hidden Fields for Backend */}
        <input type="hidden" name="likes" value="[]" />
        <input type="hidden" name="shares" value="0" />
        <input type="hidden" name="views" value="0" />
        <input type="hidden" name="downloads" value="0" />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ImageUpload;
