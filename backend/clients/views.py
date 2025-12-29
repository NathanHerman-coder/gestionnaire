from rest_framework import viewsets
from .models import Client
from .serializers import ClientSerializer
from rest_framework.permissions import IsAuthenticated

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer 
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Client.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Associate the created client with the authenticated user
        serializer.save(user=self.request.user)
