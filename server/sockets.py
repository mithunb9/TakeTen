import asyncio
import base64
import os
import urllib.request
import websockets
import io, base64
from PIL import Image
#import the hume function from ./humeCall.py
import humeCall



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
            stress_value = humeCall.humeCall()

            # Send the stress value back to the client
            if stress_value > 4.6:
                print("Stress value is high")
                #play an mp3 file
                playsound('./Ping.mp3')
                
                
            #send a message to the client

            print("Sending stress value to client... " + str(stress_value))
            await websocket.send(str(stress_value))
        except:
            print("Error")

async def main():
    async with websockets.serve(receive_image, 'localhost', 8765):
        print("Socket is running...")
        await asyncio.Future()  # Run forever

if __name__ == '__main__':
    asyncio.run(main())
