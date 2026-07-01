"use client"

import * as React from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-2", className)} {...props} />
}

function FormLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-semibold leading-none text-foreground", className)}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} />
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-xs leading-5 text-muted-foreground", className)} {...props} />
  )
}

function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  const form = useFormContext()
  const message =
    children ||
    Object.values(form?.formState?.errors || {})[0]?.message?.toString()

  if (!message) return null

  return (
    <p className={cn("text-xs font-medium text-destructive", className)} {...props}>
      {message}
    </p>
  )
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}
