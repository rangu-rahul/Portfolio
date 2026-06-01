from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, Skill, Project, Experience, Education, Certification, ContactMessage
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
        return Response(
            {'message': 'Message sent successfully! I will get back to you soon.'},
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
