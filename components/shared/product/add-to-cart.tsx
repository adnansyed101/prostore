"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { CartItem, Cart } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const handleAddtoCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast("Something went wrong.", {
        description: res.message,
      });
      return;
    }

    // Handle success add to cart
    toast(res.message, {
      action: { label: "Go to Cart", onClick: () => router.push("/cart") },
    });
  };

  // Handle Remove From Cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    toast("Item Removed from cart.", {
      description: res.message,
    });
  };

  // check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant={"outline"} onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant={"outline"} onClick={handleAddtoCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddtoCart}>
      <Plus /> AddToCart
    </Button>
  );
};

export default AddToCart;
