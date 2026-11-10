from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Portfolio API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/projects")
def projects():
    return [
        {
            "title": "MyLeague",
            "category": "Real-time sports platform",
            "description": "Multi-sport auction and league management platform.",
            "year": 2026,
        },
        {
            "title": "IBVAP",
            "category": "Computer vision platform",
            "description": "Real-time CCTV analytics and alerting platform.",
            "year": 2026,
            "url": "https://github.com/iam-bipro/IBVAP",
        },
        {
            "title": "CineMatch AI",
            "category": "Machine learning product",
            "description": "Content-based movie recommendation engine.",
            "year": 2026,
            "url": "https://github.com/iam-bipro/moviereccom",
        },
        {
            "title": "JanSuvidha",
            "category": "AI for public welfare",
            "description": "Welfare scheme discovery platform built at IEMHacks 4.0.",
            "year": 2026,
        },
        {
            "title": "Campus Channels",
            "category": "Campus communication",
            "description": "TypeScript web experience for campus information sharing.",
            "year": 2026,
            "url": "https://github.com/iam-bipro/campus-channels",
        },
        {
            "title": "Sahayak",
            "category": "Frontend experience",
            "description": "Accessible interface for connecting people with services.",
            "year": 2026,
            "url": "https://github.com/iam-bipro/sahayak-Frontend",
        },
    ]


@app.post("/api/contact", status_code=202)
def send_contact_message(message: ContactMessage):
    # Replace with email delivery or persistence before production.
    return {"received": True, "from": message.email}
