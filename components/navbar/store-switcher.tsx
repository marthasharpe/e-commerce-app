"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Check,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  StoreIcon,
} from "lucide-react";
import { PopoverTriggerProps } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

export default function StoreSwitcher({ stores = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedStores = stores?.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedStores?.find(
    (store) => store.value === params?.storeId
  );

  const [isOpen, setIsOpen] = useState(false);

  const onStoreSelect = (selectedStore: { label: string; value: string }) => {
    setIsOpen(false);
    router.push(`/${selectedStore.value}`);
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
          {currentStore?.label || "Create a Store"}
          <ChevronsUpDownIcon size={16} className="ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search stores..." />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            {formattedStores && (
              <CommandGroup heading="Stores">
                {formattedStores.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    <StoreIcon size={16} className="mr-2" />
                    {store.label}
                    <Check
                      size={16}
                      className={cn(
                        "ml-auto",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandItem
              onSelect={() => {
                setIsOpen(false);
                storeModal.onOpen();
              }}
            >
              <PlusCircleIcon size={20} className="mr-2" />
              Create Store
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
