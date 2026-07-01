import Link from "next/link";

import { Dock, DockIcon } from "@/components/ui/dock";

import { ShoppingBag, Home } from "lucide-react";
import { useI18n } from "@/locales/i18n";

const MobelNavigate = () => {
  const { lang, t } = useI18n();
  const MOBILE_NAV = [
    { label: "home", href: "/", icon: Home },
    { label: "Market", href: "/MarketPlace", icon: ShoppingBag },
  ];

  return (
    <div>
      <nav
        className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="relative pointer-events-auto">
          <Dock
            direction="bottom"
            className="border-white/70 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.45)]"
          >
            {MOBILE_NAV.map((navItem) => {
              const Icon = navItem.icon;
              return (
                <DockIcon key={navItem.label} label={t(navItem.label)}>
                  <Link
                    href={navItem.href}
                    className="relative flex items-center justify-center w-full h-full rounded-[14px] bg-linear-to-b from-white to-gray-50/80 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] border border-gray-200/80 active:opacity-80 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_20px_color-mix(in_srgb,var(--primary)_16%,transparent)] text-gray-600 hover:text-primary transition-all duration-300"
                  >
                    <Icon className="w-[22px] h-[22px] stroke-[1.8]" />
                  </Link>
                </DockIcon>
              );
            })}
          </Dock>
        </div>
      </nav>
      <div className="md:hidden h-24" />
    </div>
  );
};

export default MobelNavigate;
