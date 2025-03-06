import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [columns, setColumns] = useState([[], [], []]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_ROUTE = "http://localhost:3000/api/images/get-all"; // Adjust API route if needed

  // Function to divide images into columns
  const divideIntoColumns = (images, numColumns) => {
    console.log(`Dividing ${images.length} images into ${numColumns} columns...`);
    const cols = Array.from({ length: numColumns }, () => []);
    
    images.forEach((image, index) => {
      cols[index % numColumns].push(image);
    });

    cols.forEach((col, i) => console.log(`Column ${i + 1}: ${col.length} images`));
    return cols;
  };

  // Fetch images from server
  useEffect(() => {
    const fetchImages = async () => {
      console.log("Fetching images from server...");

      try {
        const response = await axios.get(API_ROUTE);
        console.log(`Received ${response.data.length} images from API`);

        setImages(response.data);
        setColumns(divideIntoColumns(response.data, 3)); // Divide images into 3 columns
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images. Please try again.");
      } finally {
        setLoading(false);
        console.log("Image fetch process completed.");
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    console.log("Loading images...");
    return <p className="text-center mt-4">Loading images...</p>;
  }

  if (error) {
    console.warn("Displaying error message to user.");
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6">
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col justify-start items-center gap-y-6"
          >
            {column.map((image, index) => (
              <div key={index}>
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full rounded-md shadow-md"
                />
                <p>{image.title}</p> {/* Show title to confirm data exists */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default ImageGrid;
