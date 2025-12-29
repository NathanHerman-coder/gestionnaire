from rest_framework import serializers
from .models import Invoice
from clients.serializers import ClientSerializer


class InvoiceSerializer(serializers.ModelSerializer):
    # Return nested client data for reads, accept client id on write via client_id
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        source='client', queryset=ClientSerializer.Meta.model.objects.all(), write_only=True, required=False
    )

    class Meta:
        model = Invoice
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True},
        }