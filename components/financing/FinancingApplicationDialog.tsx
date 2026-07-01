"use client"

import { HandCoins } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/locales/i18n"

export function FinancingApplicationDialog({
  open,
  onOpenChange,
  trigger,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
}) {
  const { t, isRtl } = useI18n()

  return (
    <>
      {trigger}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          dir={isRtl ? "rtl" : "ltr"}
          className="max-w-lg rounded-2xl border-white/70 bg-white/95 p-6 shadow-2xl backdrop-blur-xl"
        >
          <DialogHeader className="text-start">
            <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HandCoins className="h-5 w-5" />
            </span>
            <DialogTitle className="text-xl font-bold">
              {t("financingApplication.title", "Financing application")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "financingApplication.description",
                "Share a few details and our team will help you choose a suitable car financing option.",
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input placeholder={t("financingApplication.car", "Preferred car")} />
            <Input placeholder={t("financingApplication.budget", "Monthly budget")} />
            <Input placeholder={t("financingApplication.phone", "Phone number")} />
            <Button className="mt-2 h-11 rounded-xl">
              {t("financingApplication.submit", "Submit request")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
