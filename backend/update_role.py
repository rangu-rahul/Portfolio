"""
Quick update — only patches the Experience role.
Run: python update_role.py  (from inside backend/ with venv active)
"""
import os, sys, django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend_project'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from backend_app.models import Experience, Project
from datetime import date

# ── Update Experience role ────────────────────────────────────────────────────
updated = Experience.objects.filter(company="Edunet Foundation / EY").update(
    role="Python Full Stack Web Developer"
)
print(f"✅ Experience updated: {updated} record(s)")

# ── Add Stock Prediction project if not already present ──────────────────────
if not Project.objects.filter(title="Stock Prediction").exists():
    Project.objects.create(
        title="Stock Prediction",
        description="Stock market prediction web app that forecasts stock prices using machine learning algorithms and historical market data.",
        tech_stack=["Python", "Django", "React", "scikit-learn", "REST API"],
        github_url="https://github.com/rangu-rahul/stock_prediction",
        live_url="",
        featured=False,
        order=2,
    )
    print("✅ Stock Prediction project added")
else:
    print("ℹ️  Stock Prediction already exists — skipped")

# ── Update Smart House github_url if empty ────────────────────────────────────
Project.objects.filter(title="Smart House Price Prediction", github_url="").update(
    github_url="https://github.com/rangu-rahul/smart_house_prediction"
)
print("✅ Smart House GitHub URL ensured")

print("\n🎉 All done! Refresh the frontend.")
