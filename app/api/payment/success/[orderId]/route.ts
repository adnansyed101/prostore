import { updateOrderToPaid } from "@/lib/actions/order.action";
import { formatError } from "@/lib/utils";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const orderId = (await params).orderId;
  try {
    await updateOrderToPaid({ orderId });

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/order/${orderId}`
    );
  } catch (error) {
    return Response.json({ success: false, message: formatError(error) });
  }
}
