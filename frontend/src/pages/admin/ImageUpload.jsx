import React, { useState } from "react";
import axios from "axios";

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
      .split(",") // Split by comma
      .map((tag) => tag.trim()) // Trim spaces
      .filter((tag) => tag !== ""); // Remove empty tags

    console.log("Formatted Tags:", formattedTags);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(formattedTags)); // Convert to JSON string
    formData.append("category", category);
    formData.append("file", image);

    console.log("Form Data prepared:", {
      title,
      description,
      tags: formattedTags,
      category,
      file: image.name,
    });

    try {
      console.log("Sending request to upload image...");
      const response = await axios.post(
        "http://localhost:3000/api/images/upload",
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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Upload Image</h2>
      <form
        onSubmit={handleImageUpload}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log("Selected file:", e.target.files[0]?.name || "None");
            }}
          />
        </div>
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
