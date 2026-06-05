"""
Run this script to populate the portfolio database with your data.
Usage: python seed_data.py  (from inside the backend/ directory with venv active)
"""
import os
import sys
import django

# ── Setup Django ──────────────────────────────────────────────────────────────
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend_project'))

print("Choose database to seed:")
print("1) Local Database")
print("2) Production Database (Render)")
choice = input("Enter option (1 or 2): ").strip()

if choice == "2":
    url = input("Paste your Render EXTERNAL Database URL (starts with postgres://): ").strip()
    if not url:
        print("❌ Database URL cannot be empty!")
        sys.exit(1)
    os.environ['DATABASE_URL'] = url
    os.environ['DJANGO_SETTINGS_MODULE'] = 'backend_project.settings_prod'
    os.environ['DJANGO_SECRET_KEY'] = 'django-insecure-seed-key'
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')

django.setup()

from backend_app.models import Profile, Skill, Project, Experience, Education, Certification

# ── Clear existing data ───────────────────────────────────────────────────────
Profile.objects.all().delete()
Skill.objects.all().delete()
Project.objects.all().delete()
Experience.objects.all().delete()
Education.objects.all().delete()
Certification.objects.all().delete()

# ── Profile ───────────────────────────────────────────────────────────────────
Profile.objects.create(
    name="Rahul Rangu",
    title="Aspiring Python Full Stack Developer | Django & React",
    bio="I’m a B.Tech AIML student with a strong interest in Python full stack development. I enjoy building end-to-end web applications using Python, Django, HTML, CSS, JavaScript, and MySQL.\n\n"
        "Skilled in backend development, REST API design, and database management. I have hands-on experience with projects involving authentication, CRUD operations, and API integration. Passionate about writing clean code and improving my skills through real-world projects and problem solving. Open to internships, entry-level roles, and collaboration opportunities.",
    email="rangurahul98@gmail.com",
    phone="+91 9177753961",
    location="Hyderabad, India",
    github="https://github.com/rangu-rahul",
    linkedin="https://www.linkedin.com/in/rangu-rahul",
    available=True,
)

# ── Skills ────────────────────────────────────────────────────────────────────
skills = [
    # Frontend
    ("React.js",        "frontend",  80, "react"),
    ("JavaScript",      "frontend",  85, "js"),
    ("HTML5 / CSS3",    "frontend",  90, "html"),
    # Backend
    ("Python",          "backend",   95, "python"),
    ("Django",          "backend",   90, "django"),
    ("Django REST Framework", "backend", 85, "drf"),
    # Database
    ("MySQL",           "database",  85, "mysql"),
    ("SQL",             "database",  85, "sql"),
    # Language / DSA
    ("Data Structures (Python/C++)", "language",  80, "algorithms"),
    ("C++",             "language",  80, "cpp"),
    # Tools
    ("Git / GitHub",    "tools",     85, "git"),
    ("REST APIs",       "tools",     85, "api"),
    # AI/ML
    ("Artificial Intelligence", "other",  80, "ai"),
    ("Machine Learning",       "other",  75, "ml"),
]
for i, (name, cat, prof, icon) in enumerate(skills):
    Skill.objects.create(name=name, category=cat, proficiency=prof, icon=icon, order=i)

# ── Projects ──────────────────────────────────────────────────────────────────
projects = [
    {
        "title": "Smart House Price Prediction",
        "description": "AI-powered web app that predicts house prices using machine learning models with geospatial data integration.",
        "tech_stack": ["Python", "Django", "scikit-learn", "React", "MySQL"],
        "github_url": "https://github.com/rangu-rahul/smart_house_prediction",
        "live_url": "",
        "featured": True,
        "order": 0,
    },
    {
        "title": "AI Tutor LMS Platform",
        "description": "Intelligent Learning Management System with AI-powered learning paths, real-time analytics, and gamification features.",
        "tech_stack": ["Django", "React", "Gemini AI", "MySQL", "REST API"],
        "github_url": "",
        "live_url": "",
        "featured": True,
        "order": 1,
    },
    {
        "title": "Stock Prediction",
        "description": "Stock market prediction web app that forecasts stock prices using machine learning algorithms and historical market data.",
        "tech_stack": ["Python", "Django", "React", "scikit-learn", "REST API"],
        "github_url": "https://github.com/rangu-rahul/stock_prediction",
        "live_url": "",
        "featured": False,
        "order": 2,
    },
]
for p in projects:
    Project.objects.create(**p)

# ── Experience ────────────────────────────────────────────────────────────────
from datetime import date

# (Keeping experience empty since there is none explicitly in the PDF, but you can add your Edunet/EY internship here)
Experience.objects.create(
    company="Edunet Foundation / EY",
    role="Python Full Stack Web Developer",
    start_date=date(2025, 9, 1),
    end_date=date(2026, 2, 28),
    current=False,
    description="Built an AI Tutor Dashboard during internship. Developed ML models, integrated Gemini AI API, "
                "and created analytics dashboards. Mentored by industry professionals.",
    location="Hybrid",
    order=0,
)

# ── Education ─────────────────────────────────────────────────────────────────
Education.objects.create(
    institution="Teegala Krishna Reddy Engineering College",
    degree="Bachelor of Technology - BTech",
    field="AIML",
    start_year=2023,
    end_year=2026,
    current=True,
    order=0,
)

Education.objects.create(
    institution="Pallavi Engineering College",
    degree="Diploma",
    field="Electrical and Electronics Engineering",
    start_year=2020,
    end_year=2023,
    current=False,
    order=1,
)

Education.objects.create(
    institution="Nalanda High School",
    degree="SSC",
    field="",
    start_year=2019,
    end_year=2020,
    current=False,
    order=2,
)

# ── Certifications ────────────────────────────────────────────────────────────
certs = [
    ("Artificial Intelligence Fundamentals", "IBM / Infosys Springboard", date(2024, 1, 1)),
    ("Artificial Intelligence", "Infosys Springboard", date(2023, 10, 1)),
    ("SQL", "Online Certification", date(2023, 8, 1)),
    ("Hackathon Participant", "Institution Hackathon", date(2023, 6, 1)),
]
for i, (name, issuer, dt) in enumerate(certs):
    Certification.objects.create(name=name, issuer=issuer, date=dt, order=i)

print("✅ Real data from PDF loaded! Database seeded successfully!")
