from openai import OpenAI
import os
import asyncio
import dotenv
import db

dotenv.load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def estimateDifficulty(tasks):
    prompt = "\n".join([
        "Estimate the difficulty level of the following tasks on a scale of 1 to 3, where 1 is easy and 3 is hard:",
        *tasks,
        "Provide the difficulty level next to each task number like '1 1'."
    ])

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a difficulty estimator"},
            {"role": "user", "content": prompt},
        ]
    )

    response = response.choices[0].message.content

    return response

tasks = [
    "Give a gift to Pranav",
    "Defenestrate Sree",
    "Drive to UNT",
    "Finish HW"
]


