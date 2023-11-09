"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/use-toast";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/stores", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
      onClose();
      toast({
        description: "Store created successfully",
      });

      window.location.assign(`/${responseData.id}`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          (error as Error).message || "There was a problem creating the store.",
      });
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                disabled={form.formState.isSubmitting}
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
