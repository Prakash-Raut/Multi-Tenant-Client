"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tenant } from "@/types";
import { useRouter } from "next/navigation";

const TenantSelect = ({ resturants }: { resturants: { data: Tenant[] } }) => {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    router.push(`/?restaurantId=${value}`);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] focus:ring-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {resturants.data.map((restaurant) => (
          <SelectItem key={restaurant.id} value={String(restaurant.id)}>
            {restaurant.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
