import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();

        // Check if data is non-empty and is a string
        if (data && typeof data === "string") {
          let taskArray = data;

          console.log("Task blocks:", taskArray);
        } else {
          console.error("No text data received from server");
        }
      } else {
        console.error(
          "Error uploading file. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload and Extract Text</button>
    </div>
  );
};

export default FileUpload;
