import { z } from "zod";
import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type cart = z.infer<typeof insertCartSchema>;

export type cartitem = z.infer<typeof cartItemSchema>;
