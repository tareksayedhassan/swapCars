import { LayoutDashboard, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BASE_URL } from "@/service/apis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/locales/i18n";
const UserHeader = ({
  user,
}: {
  user: {
    name: string;
    avatar: string;
    email: string;
  };
}) => {
  const { t } = useI18n();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-gray-100 ml-1 cursor-pointer group outline-none transition-all duration-300 hover:bg-gray-50/50 py-1 px-2 rounded-xl">
            <div className="hidden md:flex flex-col items-end leading-tight transition-all group-hover:opacity-80">
              <span className="text-[13px] font-bold text-gray-800 tracking-tight line-clamp-1 max-w-[100px]">
                {user.name}
              </span>
              <span className="text-[10px] text-primary font-medium flex items-center gap-1">
                {t("active_now")}
                <ChevronDown
                  size={10}
                  className="text-gray-400 group-hover:text-primary transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </span>
            </div>

            <div className="relative">
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-primary/15 transition-all duration-500 group-hover:scale-105">
                <AvatarImage
                  src={`${BASE_URL}/users/images/${user.avatar}`}
                  alt={user.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full shadow-sm z-10">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          sideOffset={12}
          className="w-64 p-2 rounded-[22px] border-gray-100/80 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200"
        >
          <DropdownMenuLabel className="font-normal px-3 py-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-gray-900 leading-none">
                {user.name}
              </p>
              <p className="text-[11px] text-gray-500 font-medium truncate">
                {user.email || "Premium Member"}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-100/50 mx-2" />

          <div className="p-1">
            {/* Dashboard Link */}
            <DropdownMenuItem
              onClick={() => window.location.assign("/profile")}
              className="flex items-center gap-3 p-3 text-gray-700 focus:bg-primary/10 focus:text-primary rounded-[14px] cursor-pointer transition-all duration-200 group/item"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/15 transition-colors">
                <LayoutDashboard size={16} className="text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[13px]">{t("dashboard")}</span>
                <span className="text-[10px] text-gray-400 font-normal">
                  {t("manage_your_account")}
                </span>
              </div>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="bg-gray-100/50 mx-2" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserHeader;
