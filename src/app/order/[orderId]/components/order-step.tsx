"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { defineStepper } from "@stepperize/react";
import {
  CheckCheck,
  FileCheck,
  Microwave,
  Package,
  PackageCheck,
} from "lucide-react";

const { Scoped, useStepper, steps } = defineStepper(
  {
    id: "received",
    title: "Received",
    icon: FileCheck,
    description: "We are confirming your order",
  },
  {
    id: "confirmed",
    title: "Confirmed",
    icon: Package,
    description: "We have started preparing your order",
  },
  {
    id: "prepared",
    title: "Prepared",
    icon: Microwave,
    description: "Ready for pickup",
  },
  {
    id: "outfordelivery",
    title: "Out For Delivery",
    icon: PackageCheck,
    description: "Order is out for delivery",
  },
  {
    id: "delivered",
    title: "Delivered",
    icon: CheckCheck,
    description: "Order has been delivered",
  }
);

const OrderStep = () => {
  const stepper = useStepper();
  console.log("stepper", stepper);
  const currentStep = "prepared";
  const currentIndex = steps.findIndex((step) => step.id === currentStep);
  return (
    <>
      <div className="flex items-center justify-between gap-40">
        {steps.map((step, index) => (
          <Scoped key={index} initialStep={currentStep}>
            <div className="flex items-center">
              <div
                className={cn(
                  "flex flex-col items-center gap-2",
                  index <= currentIndex
                    ? "font-bold text-primary" // Highlight current and previous steps
                    : "text-gray-500"
                )}
              >
                <step.icon
                  size={32}
                  className={cn(
                    "transition-colors",
                    index <= currentIndex
                      ? "text-primary" // Change color for completed steps
                      : "text-gray-400"
                  )}
                />
                <span>{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <Separator
                  className={cn(
                    "mx-4 h-0.5 w-full",
                    index <= currentIndex ? "bg-primary" : "bg-gray-400"
                  )}
                />
              )}
            </div>
          </Scoped>
        ))}
      </div>
    </>
  );
};

export default OrderStep;
