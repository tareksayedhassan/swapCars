"use client";

import { Bell, BellOff, Clock3 } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/locales/i18n";

type NotificationLike = {
  id: number;
  title: string;
  body: string;
  type: "Booking" | "financing" | "Register_New_Account";

  isRead: boolean;
  createdAt: Date;
  updatedAt?: Date;
  imageUrl?: string | null;
  actionUrl?: string | null;
  data?: Record<string, unknown> | null;
};
type NotificationsDialogProps = {
  notifications?: NotificationLike[];
};

export function NotificationsDialog({
  notifications = [],
}: NotificationsDialogProps) {
  const { lang, t } = useI18n();
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label={t("notifications.trigger")}
          className="group relative h-10 w-10 rounded-xl border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/10 hover:text-primary"
        >
          <Bell className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -end-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="max-h-[86vh] max-w-lg overflow-hidden rounded-3xl border-slate-200 p-0"
      >
        <DialogHeader className="border-b border-slate-100 px-6 py-5 text-start">
          <div className="flex items-center justify-between gap-4 pe-8">
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-950">
                {t("notifications.title")}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-slate-500">
                {t("notifications.description")}
              </DialogDescription>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-primary/10 text-primary">
                {unreadCount}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {notifications.length > 0 ? (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 p-4">
              {notifications.map((notification, index) => (
                <article
                  key={notification.id ?? index}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        {notification.imageUrl && (
                          <Image
                            src={notification.imageUrl}
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full object-cover shrink-0"
                          />
                        )}
                        <h3 className="truncate text-sm font-bold text-slate-950">
                          {notification.title || "Notification"}
                        </h3>
                      </div>

                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                        {notification.body || "You have a new update."}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Clock3 className="h-3.5 w-3.5" />
                    {formatNotificationTime(notification.createdAt, lang)}
                  </p>
                </article>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <BellOff className="h-6 w-6" />
            </span>
            <h3 className="text-base font-bold text-slate-950">
              {t("notifications.emptyTitle")}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              {t("notifications.emptyMessage")}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function formatNotificationTime(value: Date | undefined, lang: string): string {
  if (!value) return lang === "ar" ? "الآن" : "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return lang === "ar" ? "الآن" : "Just now";

  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
