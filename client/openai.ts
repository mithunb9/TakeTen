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
        content: `Can you identify the task, due date, class from the following in the format, and an estimated time numerically in hours to complete the task?
      "Task Name"
      "mm/dd/yy" (Tomorrow's date is 11/12/23)
      "class name"
      "time
    without code and only format no response
    
    ${prompt}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return chatTask.choices[0].message.content;
}
