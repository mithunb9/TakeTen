import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import pdf from "pdf-parse";
import { task, task4 } from "@/openai";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const formData = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });

  try {
    const file = formData?.file[0];
    const buffer = await fs.readFile(file.filepath);
    const pdfData = await pdf(buffer);

    const aiData = await task4(pdfData.text);

    // let splitData = aiData?.split("==");

    // console.log("aiData", aiData);
    // splitData?.shift();
    // // turn into array of objects

    // console.log("split", splitData);

    // let tasks = [];

    // for (let i = 0; i < splitData?.length; i++) {
    //   let task = splitData[i].split("\n");
    //   tasks.push({
    //     name: task[1],
    //     dueDate: task[2],
    //     className: task[3],
    //     time: task[4],
    //   });
    // }

    // console.log("dawg", tasks);

    res.status(200).json(aiData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
