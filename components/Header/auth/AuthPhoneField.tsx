"use client";

import { Phone } from "lucide-react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const COUNTRY_CODE = "+966";

type AuthPhoneFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder: string;
  description: string;
  isRtl: boolean;
};

export function AuthPhoneField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  isRtl,
}: AuthPhoneFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div
            className={cn(
              "flex min-h-12 overflow-hidden rounded-xl border border-input bg-background shadow-sm transition-colors focus-within:border-primary/40 focus-within:ring-3 focus-within:ring-primary/15",
              isRtl && "flex-row-reverse",
            )}
          >
            <div className="flex w-23.5 shrink-0 items-center justify-center gap-1.5 border-border bg-muted px-3 text-sm font-bold text-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span dir="ltr">{COUNTRY_CODE}</span>
            </div>
            <FormControl>
              <Input
                {...field}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder={placeholder}
                dir="ltr"
                onChange={(event) => {
                  field.onChange(event.target.value.replace(/\D/g, ""));
                }}
                className="h-12 rounded-none border-0 bg-transparent px-4 text-start shadow-none focus-visible:border-transparent focus-visible:ring-0"
              />
            </FormControl>
          </div>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
