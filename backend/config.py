import os
from dotenv import load_dotenv

load_dotenv()

FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY", "")
MODEL_NAME = os.getenv("MODEL_NAME", "accounts/fireworks/models/gemma-4-e4b-multimodal")
