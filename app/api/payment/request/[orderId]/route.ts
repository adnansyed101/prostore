import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";
import { NextResponse } from "next/server";
import { SslCommerzPayment } from "sslcommerz";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const orderId = (await params).orderId;

  const store_id = process.env.SSLCOMMERZ_STORE_ID;
  const store_password = process.env.SSLCOMMERZ_STORE_Password;
  const is_live = false; // true for live, false for sandbox

  try {
    // Get orders from database
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!order) throw new Error("Order not found for SSL Payment.");

    const shippingAddressObject = JSON.parse(
      JSON.stringify(order.shippingAddress)
    );

    const data = {
      total_amount: Number(order.totalPrice),
      currency: "BDT",
      tran_id: order.id, // use unique tran_id for each api call
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/success/${order.id}`,
      fail_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/ipn`,
      shipping_method: "Courier",
      product_name: order.id,
      product_category: "Clothing",
      product_profile: "general",
      cus_name: order.user.name,
      cus_email: order.user.email,
      cus_add1: shippingAddressObject.streetAddress,
      cus_add2: shippingAddressObject.streetAddress,
      cus_city: shippingAddressObject.city,
      cus_state: shippingAddressObject.city,
      cus_postcode: shippingAddressObject.postalCode,
      cus_country: shippingAddressObject.country,
      cus_phone: "01711111111",
      ship_name: order.user.name,
      ship_add1: shippingAddressObject.streetAddress,
      ship_add2: shippingAddressObject.streetAddress,
      ship_city: shippingAddressObject.city,
      ship_state: shippingAddressObject.city,
      ship_postcode: shippingAddressObject.postalCode,
      ship_country: shippingAddressObject.country,
    };

    const sslcz = new SslCommerzPayment(store_id, store_password, is_live);

    const GatewayPageURL = await sslcz
      .init(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((apiResponse: any) => apiResponse.GatewayPageURL);

    return Response.json({ success: true, url: GatewayPageURL });
  } catch (error) {
    return Response.json({ success: false, message: formatError(error) });
  }
}

export async function POST() {
  return new NextResponse(JSON.stringify("This is a POST request"));
}
