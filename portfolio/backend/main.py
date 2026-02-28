from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os

app = FastAPI()

# This points to the Kubernetes ExternalName service we created earlier
# which routes to your good laptop's Tailscale IP
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama-service:11434/api/generate")

class ChatRequest(BaseModel):
    prompt: str

# The system prompt acts as the "brain" of your agent
SYSTEM_PROMPT = """You are the AI assistant for Shubham Thakur, a DevOps and Platform Engineer. 
Answer questions about his professional experience briefly and professionally.
Key facts to know:
- He migrated an entire tech stack from GCP to Azure, building Terraform modules from scratch.
- He deployed and configured Backstage as an Internal Developer Platform (IDP).
- He uses ArgoCD for GitOps deployments.
- He is highly skilled in GitLab CI/CD, Octopus Deploy, Ansible, and Dynatrace automation.
- He automated PKI certificate signing, reducing lead time from 3 days to 15 minutes.
Keep responses under 3 sentences."""

@app.post("/api/chat")
def chat_with_resume(request: ChatRequest):
    payload = {
        "model": "llama3.2", # Change this to the model you pulled on your good laptop
        "prompt": f"{SYSTEM_PROMPT}\n\nUser: {request.prompt}\nAssistant:",
        "stream": False
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        return {"response": data.get("response", "No response generated.")}
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Ollama: {e}")
        raise HTTPException(status_code=503, detail="AI Inference Node is currently unreachable.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
