"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.action";

const AddToCart = ({ item }: { item: CartItem }) => {
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

  return (
    <Button className="w-full" type="button" onClick={handleAddtoCart}>
      <Plus /> AddToCart
    </Button>
  );
};

export default AddToCart;
