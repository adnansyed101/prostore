export async function POST() {
  return Response.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/orders`);
}
