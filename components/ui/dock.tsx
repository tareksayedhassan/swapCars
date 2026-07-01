"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Dock({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { direction?: "top" | "bottom" }) {
  return (
    <div
      data-slot="dock"
      className={cn(
        "flex items-center gap-2 rounded-2xl border bg-white/90 p-2 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function DockIcon({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      data-slot="dock-icon"
      className={cn("group relative size-12", className)}
      {...props}
    >
      {children}
      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  )
}

export { Dock, DockIcon }
