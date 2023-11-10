"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { TrashIcon } from "lucide-react";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Title</h2>
          <p className="text-sm text-muted-foreground">description</p>
        </div>
        <Button variant="destructive" size="icon" onClick={() => {}}>
          <TrashIcon size={16} />
        </Button>
      </div>
      <Separator className="my-2" />
    </>
  );
};
export default SettingsForm;
