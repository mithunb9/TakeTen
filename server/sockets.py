import asyncio
import base64
import os
import urllib.request
import websockets

async def receive_image(websocket, path):
    async for message in websocket:
        # Decode the base64-encoded URL
        print("Message received")
        print(message)
        imageEncoded = message
        try:
            with open('image.png', 'wb') as file_handler:
                file_handler.write(base64.decodebytes(imageEncoded))
        except:
            print("Error")

async def main():
    async with websockets.serve(receive_image, 'localhost', 8765):
        print("Socket is running...")
        await asyncio.Future()  # Run forever

if __name__ == '__main__':
    asyncio.run(main())
