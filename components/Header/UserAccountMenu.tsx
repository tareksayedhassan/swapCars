"use client";

import { ChevronDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/locales/i18n";

import { BASE_URL } from "@/service/apis";

interface HeaderUser {
  name?: string;
  fullName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
}
export function UserAccountMenu({
  user,
  logout,
}: {
  user: HeaderUser | null;
  logout: () => Promise<void>;
}) {
  const { t } = useI18n();
  const name = user?.name || user?.fullName || t("account.user", "User");
  const avatar = user?.avatar ? `${BASE_URL}/users/images/${user.avatar}` : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/10 md:pe-2"
        >
          <Avatar className="h-8 w-8 border border-white shadow-sm">
            <AvatarImage
              src={
                avatar
                  ? avatar.startsWith("http")
                    ? avatar
                    : `${BASE_URL}/users/images/${avatar}`
                  : "/assets/avatar.png"
              }
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-23 truncate text-xs font-bold text-slate-800 md:block">
            {name}
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 md:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-2xl border-slate-100 bg-white p-2 shadow-2xl"
      >
        <DropdownMenuLabel className="px-3 py-3">
          <p className="truncate text-sm font-bold text-slate-950">{name}</p>
          <p className="mt-1 truncate text-xs font-medium text-slate-500">
            {user?.email || user?.phone || t("account.member", "Member")}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => logout()}
          className="rounded-xl px-3 py-2.5 text-sm font-semibold"
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
