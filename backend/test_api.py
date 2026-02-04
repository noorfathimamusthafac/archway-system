import requests
import json

try:
    url = "http://127.0.0.1:8000/ask"
    payload = {"question": "What is the waterproofing standard?"}
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
