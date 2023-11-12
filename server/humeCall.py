
import numpy as np
import pandas as pd
import json

from hume import HumeBatchClient
from hume.models.config import FaceConfig

def humeCall():
# Replace with your actual API key
    API_KEY = "zEZrGFie5NUQ7M2XfJEYmBvh9pzRErECj0T30GGynPtOKHXP"

    all_emotions = ['Anxiety', 'Awkwardness', 'Boredom', 'Confusion', 'Contempt', 'Craving', 'Desire', 'Disappointment',
                        'Disgust', 'Distress', 'Doubt', 'Embarrassment', 'Empathic Pain', 'Envy', 'Fear', 'Guilt', 'Horror',
                    'Pain', 'Sadness', 'Shame', 'Surprise (negative)', 'Tiredness']

    # File path of the image
    image_path = "./image.png"

    # Start Hume Batch API
    batch_client = HumeBatchClient(API_KEY)

    # Send image to analyze facial expressions
    job = batch_client.submit_job(urls=[], configs=[FaceConfig(identify_faces=True)], files=[image_path])
    print("Hume API is processing the image...")
    details = job.await_complete()
    print("Emotion predictions downloaded.\n")
    job.download_predictions("image_emotions.json")

    with open("image_emotions.json") as f:
        data = json.load(f)
        img_dict = data[0]["results"]["predictions"][0]["models"]["face"]["grouped_predictions"][0]["predictions"]
        img_df = pd.DataFrame.from_dict({"name": all_emotions, "score": np.repeat(0.0, 22)})
        num_faces = len(img_dict)
        for i in range(num_faces):
            emotions_dict = img_dict[i]["emotions"]
            emotions_df = pd.DataFrame.from_dict(emotions_dict).sort_values("name")
            img_df["score"] = img_df["score"] + emotions_df["score"]
        img_df["score"] = img_df["score"] / num_faces
        stress_value = img_df[img_df["name"].isin(all_emotions)]["score"].sum()
        print(f"Stress value: {stress_value}")
        return stress_value
