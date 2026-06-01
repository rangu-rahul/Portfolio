from django.contrib import admin
from .models import Profile, Skill, Project, Experience, Education, Certification, ContactMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'available']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_filter = ['category']
    ordering = ['category', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'order']
    list_filter = ['featured']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'start_date', 'end_date', 'current']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_year', 'end_year']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuer', 'date']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'read']
    list_filter = ['read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
