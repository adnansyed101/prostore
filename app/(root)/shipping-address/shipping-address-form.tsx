"use client";

import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  return <div>ShippingAddressForm</div>;
};

export default ShippingAddressForm;
