from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, Skill, Project, Experience, Education, Certification, ContactMessage
from django.core.mail import send_mail
from django.conf import settings
from .serializers import (
    ProfileSerializer, SkillSerializer, ProjectSerializer,
    ExperienceSerializer, EducationSerializer, CertificationSerializer,
    ContactMessageSerializer,
)


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

        # Email to Rahul
        send_mail(
            subject=f"Portfolio Contact: {subject}",
            message=f"""
New message from portfolio website

Name: {name}
Email: {email}

Message:
{message}
""",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["rangurahul98@gmail.com"],
            fail_silently=True,
        )

        # Auto reply to visitor
        send_mail(
            subject="Thank you for contacting Rahul",
            message=f"""
Hi {name},

Thank you for contacting me.

I have received your message and will get back to you soon.

Regards,
Rahul Rangu
""",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=True,
        )

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


