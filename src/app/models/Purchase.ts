export interface Purchase {
    purchaseId ?: number;
    clientId ?: number;
    paymentId ?: number;
    purchaseAmount ?: number;
    subtotal ?: number;
    costDelivery ?: number;
    purchaseDate ?: Date;
    status ?: string;
}
