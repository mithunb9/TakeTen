import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function complete(prompt: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
}

export async function task(prompt: any) {
  const chatTask = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Can you identify the task, due date (in the same format as given and only that mm/dd/yy) todays date is 11/12/23, class from the following in the format, and an estimated time between 1-3 numerically in hours to complete the task I want exactly a number not a range?
      Name
      dueDate
      class
      time
    without code and only format no response 

    ${prompt}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(chatTask);

  return chatTask.choices[0].message.content;
}

export async function task4(prompt: any) {
  const chatTask = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Can you identify the task, due date (in the same format as given and only that mm/dd/yy) todays date is 11/12/23, class from the following in the format, and an estimated time between 1-3 numerically in hours to complete the task I want exactly a number not a range?
      Name
      dueDate
      class
      time
      ==
      Name
      dueDate
      class
      time
    without code and only format no response when you return them add == in between each task not surrounding to serve as the delimitor

    ${prompt}`,
      },
    ],
    model: "gpt-4",
  });

  console.log(chatTask);

  return chatTask.choices[0].message.content;
}

export async function schedule(prompt: any) {
  const chatSchedule = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Can you identify the task, due date, class from the following in the format, and an estimated time between 1-3 numerically in hours to complete the task?
          "Task Name"
          "mm/dd/yy" (Tomorrow's date is 11/12/23)
          "class name"
          "time
        without code and only format no response and if there are multiple add {/} between each task
        ${prompt}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
}
