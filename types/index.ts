import { blog } from "@prisma/client";

export interface blogs extends blog {
  Author: {
    name: string;
    img: string;
  };
}
