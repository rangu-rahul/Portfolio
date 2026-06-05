import logging
import resend
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, Skill, Project, Experience, Education, Certification, ContactMessage
from django.conf import settings
from .serializers import (
    ProfileSerializer, SkillSerializer, ProjectSerializer,
    ExperienceSerializer, EducationSerializer, CertificationSerializer,
    ContactMessageSerializer,
)

logger = logging.getLogger(__name__)


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({'detail': 'Profile not found.'}, status=404)
        return Response(ProfileSerializer(profile).data)


class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            qs = qs.filter(featured=True)
        return qs


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class ContactView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        name = serializer.validated_data["name"]
        email = serializer.validated_data["email"]
        subject = serializer.validated_data["subject"]
        message = serializer.validated_data["message"]

        # Set Resend API key
        resend.api_key = settings.RESEND_API_KEY

        # Email to Rahul
        try:
            resend.Emails.send({
                "from": "Portfolio Contact <onboarding@resend.dev>",
                "to": ["rangurahul98@gmail.com"],
                "subject": f"Portfolio Contact: {subject}",
                "text": f"New message from portfolio website\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}",
            })
            logger.info("Contact notification email sent to rangurahul98@gmail.com")
        except Exception as e:
            logger.error(f"Failed to send contact notification email: {e}")

        # Auto reply to visitor
        try:
            resend.Emails.send({
                "from": "Rahul Rangu <onboarding@resend.dev>",
                "to": [email],
                "subject": "Thank you for contacting Rahul",
                "text": f"Hi {name},\n\nThank you for contacting me.\n\nI have received your message and will get back to you soon.\n\nRegards,\nRahul Rangu",
            })
            logger.info(f"Auto-reply email sent to {email}")
        except Exception as e:
            logger.error(f"Failed to send auto-reply email: {e}")

        return Response(
            {"message": "Message sent successfully! I will get back to you soon."},
            status=status.HTTP_201_CREATED
        )

class PortfolioSummaryView(APIView):
    """Returns all portfolio data in one request."""

    def get(self, request):
        profile = Profile.objects.first()
        return Response({
            'profile':        ProfileSerializer(profile).data if profile else None,
            'skills':         SkillSerializer(Skill.objects.all(), many=True).data,
            'projects':       ProjectSerializer(Project.objects.all(), many=True).data,
            'experience':     ExperienceSerializer(Experience.objects.all(), many=True).data,
            'education':      EducationSerializer(Education.objects.all(), many=True).data,
            'certifications': CertificationSerializer(Certification.objects.all(), many=True).data,
        })


class TestEmailView(APIView):
    """Temporary debug endpoint — sends a test email and returns JSON result."""

    def get(self, request):
        resend.api_key = settings.RESEND_API_KEY
        result = {
            'resend_key_len': len(getattr(settings, 'RESEND_API_KEY', '')),
        }
        try:
            resend.Emails.send({
                "from": "Portfolio Test <onboarding@resend.dev>",
                "to": ["rangurahul98@gmail.com"],
                "subject": "[Render Test] Portfolio Email Check",
                "text": "If you received this, Resend email works on Render!",
            })
            result['status'] = 'SUCCESS'
            result['message'] = 'Email sent via Resend! Check rangurahul98@gmail.com'
        except Exception as e:
            result['status'] = 'FAILED'
            result['error'] = str(e)
        return Response(result)


