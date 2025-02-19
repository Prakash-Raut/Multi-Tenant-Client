import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { addAddress } from "@/lib/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addressSchema = z.object({
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters.",
    })
    .max(250, {
      message: "Address must be less than 250 characters.",
    }),
});

export function AddressModal({ customerId }: { customerId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  const queryClient = useQueryClient();

  const {
    mutate: addressMutate,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["address", customerId],
    mutationFn: async (address: string) => {
      await addAddress(customerId, address);
      toast.success("Address added successfully.");
    },
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });

  function onSubmit(data: z.infer<typeof addressSchema>) {
    addressMutate(data.address);
  }

  if (isError) {
    toast.error("Failed to add address.");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <Plus />
          Add Address
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                We can save your address for future orders.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Please Wait</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
