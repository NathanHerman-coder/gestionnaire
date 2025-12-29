from rest_framework import viewsets
from .models import Invoice
from .serializers import InvoiceSerializer
from rest_framework.permissions import IsAuthenticated

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Invoice.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Associate the created invoice with the authenticated user
        serializer.save(user=self.request.user)