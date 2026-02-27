const StripePayment = ({
  priceInCents,
  orderId,
  client_secret,
}: {
  priceInCents: number;
  orderId: string;
  client_secret: string;
}) => {
  return <div>Stripe Form</div>;
};

export default StripePayment;
