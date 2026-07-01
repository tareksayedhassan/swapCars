"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type InputOTPContextValue = {
  value: string
  setValue: (value: string) => void
  maxLength: number
}

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null)

function InputOTP({
  value,
  onChange,
  maxLength = 6,
  className,
  containerClassName,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  containerClassName?: string
  inputMode?: string
  autoComplete?: string
  pattern?: string
}) {
  const setValue = React.useCallback(
    (next: string) => onChange(next.replace(/\D/g, "").slice(0, maxLength)),
    [maxLength, onChange],
  )

  return (
    <InputOTPContext.Provider value={{ value, setValue, maxLength }}>
      <div className={cn("flex items-center gap-2", containerClassName, className)} {...props}>
        {children}
      </div>
    </InputOTPContext.Provider>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />
}

function InputOTPSlot({
  index,
  className,
}: React.ComponentProps<"input"> & { index: number }) {
  const ctx = React.useContext(InputOTPContext)
  if (!ctx) throw new Error("InputOTPSlot must be used within InputOTP")

  return (
    <input
      aria-label={`Digit ${index + 1}`}
      inputMode="numeric"
      value={ctx.value[index] ?? ""}
      onChange={(event) => {
        const chars = ctx.value.split("")
        chars[index] = event.target.value.replace(/\D/g, "").slice(-1)
        ctx.setValue(chars.join(""))
      }}
      className={cn(
        "mx-0.5 flex size-10 rounded-lg border border-input bg-background text-center text-sm font-semibold shadow-xs outline-none transition-all focus:border-ring focus:ring-3 focus:ring-ring/25",
        className,
      )}
    />
  )
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-1 text-muted-foreground", className)} {...props}>
      -
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
