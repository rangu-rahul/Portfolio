"""
Production settings for Render deployment.
Inherits from settings.py and overrides for production.
"""
from .settings import *
import os
import dj_database_url

# ── Security ──────────────────────────────────────────────────────────────────
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
DEBUG = False
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# ── Database (PostgreSQL on Render) ───────────────────────────────────────────
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ['DATABASE_URL'],
        conn_max_age=600,
    )
}

# ── Static files (WhiteNoise) ─────────────────────────────────────────────────
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ── CORS ──────────────────────────────────────────────────────────────────────
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')
