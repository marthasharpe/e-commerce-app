"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { ChevronsUpDownIcon, StoreIcon } from "lucide-react";
import { PopoverTriggerProps } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

export default function StoreSwitcher({ stores = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  //   const router = useRouter();

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedStores.find(
    (store) => store.value === params.storeId
  );

  const [isOpen, setIsOpen] = useState(false);

  const onStoreSelect = (selectedStore: { label: string; value: string }) => {
    setIsOpen(false);
    // router.push(`/${selectedStore.value}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a Store"
          className="flex w-[200px] items-center justify-between"
        >
          <StoreIcon size={16} className="mr-2" />
          Current Store
          <ChevronsUpDownIcon size={16} className="ml-auto" />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
