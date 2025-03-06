import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ImageUpdatePage = () => {
  const { _id } = useParams(); // Get _id from URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/images/id/${_id}`);
        const data = response.data; // Instead of response.data.data
        setTitle(data.title);
        setDescription(data.description);
        setTags(data.tags.join(", "));
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching image:", error);
        setMessage("Error fetching image details.");
      }
    };

    fetchImageData();
  }, [_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formattedTags = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(formattedTags));
    formData.append("category", category);
    if (image) formData.append("file", image);

    try {
      await axios.put(`http://localhost:3000/api/images/update/${_id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Image updated successfully!");
    } catch (error) {
      console.error("Error updating image:", error);
      setMessage("Error updating image.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Image</h2>
      <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea className="w-full px-3 py-2 border rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Image (Optional)</label>
          <input type="file" className="w-full px-3 py-2 border rounded-lg" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">Update</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ImageUpdatePage;
