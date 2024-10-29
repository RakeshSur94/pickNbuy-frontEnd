export interface PaymentVerificationRequest {
  orderId: string; // Assuming you have an orderId field
  paymentId: string; // Assuming you have a paymentId field
  signature: string; // Assuming you have a signature field
}