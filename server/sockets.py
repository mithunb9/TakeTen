import asyncio
import base64
import os
import urllib.request
import websockets
import io, base64
from PIL import Image

async def receive_image(websocket, path):
    async for message in websocket:
        # Decode the base64-encoded URL
        
        print(f"Message received: {message[:50]}")  # Display first 50 characters

        imageEncoded = message
        try:
            #with open('image.png', 'wb') as file_handler:
            base64_str = imageEncoded.split(',')[1]  # Get the base64-encoded image data from the URL
            img = Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))
            img.save("image.png", "PNG")
             #   file_handler.write(base64.decodebytes(imageEncoded))
        except:
            print("Error")

async def main():
    async with websockets.serve(receive_image, 'localhost', 8765):
        print("Socket is running...")
        await asyncio.Future()  # Run forever

if __name__ == '__main__':
    asyncio.run(main())
