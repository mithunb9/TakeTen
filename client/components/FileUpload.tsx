import React, { useState, ChangeEvent } from "react";
import axios from "axios";

require("dotenv").config();

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("purpose", "assistants");

      axios.post("https://api.openai.com/v1/files");
    } else {
      console.error("No file selected!");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>File Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;
