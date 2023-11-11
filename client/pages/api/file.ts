import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import mysql from "mysql2/promise";

// Load environment variables
require("dotenv").config();

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message?: string;
  error?: string;
  id?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files: any) => {
    if (err) {
      res.status(500).json({ error: "Error parsing the form" });
      return;
    }

    try {
      // Read the file's content
      const fileContent = await fs.readFile(files.file.filepath);

      // Create the connection to the database
      const connection = await mysql.createConnection(process.env.DATABASE_URL);

      // Perform your query
      const [results] = await connection.execute(
        "INSERT INTO your_table (content) VALUES (?)",
        [fileContent]
      );

      // Close the database connection
      await connection.end();

      res
        .status(200)
        .json({ message: "File uploaded successfully", id: results.insertId });
    } catch (fileError) {
      console.error(fileError);
      res
        .status(500)
        .json({ error: "Error handling the file", details: fileError.message });
    }
  });
}
