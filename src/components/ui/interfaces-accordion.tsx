'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

function InterfacesAccordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('flex w-full flex-col divide-y divide-white/[0.06]', className)}
      {...props}
    />
  );
}

function InterfacesAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('group py-1', className)}
      {...props}
    />
  );
}

function InterfacesAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex w-full items-start justify-between gap-4 py-5 px-1 text-left text-sm md:text-base font-semibold text-white transition-all outline-none',
          'hover:text-white/90 cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:rounded',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        <span className="leading-snug">{children}</span>
        <span className="mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-white/15 text-white/50 transition-all duration-300 group-data-[state=open]:border-white/30 group-data-[state=open]:text-white group-data-[state=open]:bg-white/5">
          <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-data-[state=open]:hidden" />
          <Minus className="w-3.5 h-3.5 transition-transform duration-300 hidden group-data-[state=open]:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function InterfacesAccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cn('pb-5 px-1 text-sm md:text-base text-zinc-400 leading-relaxed', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  InterfacesAccordion,
  InterfacesAccordionItem,
  InterfacesAccordionTrigger,
  InterfacesAccordionContent,
};
