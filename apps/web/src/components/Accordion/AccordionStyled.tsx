"use client";
import { forwardRef, type ElementRef, ComponentPropsWithoutRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export const AccordionItem = forwardRef<
  ElementRef<typeof Accordion.Item>,
  ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, value, ...props }, forwardedRef) => (
  <Accordion.Item
    value={value}
    className={cn(
      "focus-within:z-10  overflow-hidden mt-1 first:mt-0 first:rounded-t-1 last:rounded-b-1",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  ElementRef<typeof Accordion.Trigger>,
  ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex shadow-2">
    <Accordion.Trigger
      className={cn(
        "hover:bg-accent-2 group flex h-rx-9 flex-1 cursor-default items-center justify-between  px-5 ",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-crimson-9 ease-in-out transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  ElementRef<typeof Accordion.Content>,
  ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cn(
      "shadow-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden ",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-5 py-5">{children}</div>
  </Accordion.Content>
));

AccordionContent.displayName = "AccordionContent";

export const AccordionRoot = forwardRef<
  ElementRef<typeof Accordion.Root>,
  ComponentPropsWithoutRef<typeof Accordion.Root>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Root
    className={cn(
      "rounded-3 shadow-2 bg-panel-translucent  data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-3",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Root>
));

AccordionRoot.displayName = "AccordionRoot";
