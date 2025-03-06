import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteImage from "../../components/DeleteImage";

export default function ImageManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_ROUTE = "http://localhost:3000/api/images/get-all"; // Adjust API route if needed

  // Fetch images from server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_ROUTE);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading images...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <main className="p-6">
      <div className="w-[256px] bg-green-500 rounded-md py-2 hover:bg-green-600 text-center mb-4">
        <a
          href="/admin/manage-images/upload-image"
          className="py-2 w-full text-white "
        >
          Upload Image
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-3 py-2 border text-left">#</th>
              <th className="px-3 py-2 border text-left">Image</th>
              <th className="px-3 py-2 border text-left">Title</th>
              <th className="px-3 py-2 border text-left">Category</th>
              <th className="px-3 py-2 border text-left">Description</th>
              <th className="px-3 py-2 border text-left">Tags</th>
              <th className="px-3 py-2 border text-left">Likes</th>
              <th className="px-3 py-2 border text-left">Shares</th>
              <th className="px-3 py-2 border text-left">Views</th>
              <th className="px-3 py-2 border text-left">Downloads</th>
              <th className="px-3 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2 border">{index + 1}</td>
                <td className="px-3 py-2 border">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="h-16 w-auto rounded-md shadow-sm"
                  />
                </td>
                <td className="px-3 py-2 border">{image.title}</td>
                <td className="px-3 py-2 border">{image.category}</td>
                <td className="px-3 py-2 border">
                  {image.description
                    ? image.description.slice(0, 50) + "..."
                    : "No description"}
                </td>
                <td className="px-3 py-2 border">
                  {image.tags && image.tags.length > 0
                    ? image.tags.join(", ")
                    : "No tags"}
                </td>
                <td className="px-3 py-2 border">{image.likes?.length || 0}</td>
                <td className="px-3 py-2 border">{image.shares}</td>
                <td className="px-3 py-2 border">{image.views}</td>
                <td className="px-3 py-2 border">{image.downloads}</td>
                <td className="px-3 py-2  border">
                  <div className="gap-2 min-w-[160px] grid grid-cols-2">
                    <a
                      href={`/admin/manage-images/update-image/${image._id}`}
                      className="text-center px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </a>

                    <DeleteImage />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
