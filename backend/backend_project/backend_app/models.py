from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    resume_url = models.URLField(blank=True)
    profile_image = models.URLField(blank=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tools', 'Tools & DevOps'),
        ('language', 'Languages'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    proficiency = models.IntegerField(default=80)
    icon = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    tech_stack = models.JSONField(default=list)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    description = models.TextField()
    location = models.CharField(max_length=100, blank=True)
    company_logo = models.URLField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-start_date']

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field = models.CharField(max_length=200, blank=True)
    start_year = models.IntegerField()
    end_year = models.IntegerField(null=True, blank=True)
    current = models.BooleanField(default=False)
    cgpa = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-start_year']

    def __str__(self):
        return f"{self.degree} – {self.institution}"


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date = models.DateField()
    credential_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-date']

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name}: {self.subject}"
