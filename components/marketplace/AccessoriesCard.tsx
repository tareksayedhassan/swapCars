import { Gem, Package, SaudiRiyal } from "lucide-react";
import { CardImageSwiper } from "../home/cars/CardImageSwiper";
import { Card } from "../ui/card";
import { Badge } from "../ui/Badge";
import { useRouter } from "next/navigation";

export const AccessoryCard = ({
  accessory,
  variant = "carousel",
}: {
  accessory: any;
  variant?: "carousel" | "grid" | "list";
}) => {
  const router = useRouter();
  return (
    <div
      className={
        variant === "grid" || variant === "list" ? "w-full h-full" : ""
      }
      onClick={() => router.push(`/accessories/${accessory.id}`)}
    >
      <Card
        className={`group relative flex overflow-hidden border-border/40 bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
          variant === "list"
            ? "flex-col sm:flex-row h-auto w-full items-stretch"
            : variant === "grid"
              ? "flex-col w-full h-full"
              : "flex-col h-full w-[min(280px,calc(100vw-2rem))] flex-none scroll-snap-align-start"
        }`}
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden bg-muted ${
            variant === "list"
              ? "w-full sm:w-[280px] shrink-0 aspect-[16/10]"
              : "w-full aspect-[16/10]"
          }`}
        >
          <CardImageSwiper
            images={accessory.images ?? []}
            alt={accessory.name}
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Gem className="size-8 text-muted-foreground/20" />
              </div>
            }
          />

          {/* Absolute Badges */}
          <Badge className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-md text-[9px] text-white border-none py-0.5 px-2">
            {accessory.category || "Accessory"}
          </Badge>
        </div>

        {/* Content - Flexible Spacing */}
        <div className="flex min-w-0 flex-1 flex-col p-4 justify-center">
          <div className="mb-1 flex min-w-0 items-start justify-between gap-2">
            <h3 className="line-clamp-1 min-w-0 flex-1 font-bold text-[15px] leading-tight group-hover:text-primary transition-colors">
              {accessory.name}
            </h3>
            <div className="shrink-0 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg flex items-center gap-1">
              <SaudiRiyal size={14} /> {accessory.price}
            </div>
          </div>
          <p className="line-clamp-2 text-[11px] text-muted-foreground mb-4 leading-relaxed">
            {accessory.description ||
              "No description available for this premium accessory."}
          </p>
          {/* Footer info - Pushed to bottom */}
          <div className="mt-auto flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3">
            <div className="flex items-center gap-1.5">
              <Package className="size-3.5 text-zinc-400" />
              <span className="text-[10px] font-semibold text-zinc-500">
                STK: {accessory.stockQuantity}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <div
                className="size-2.5 rounded-full ring-1 ring-inset ring-black/5"
                style={{ backgroundColor: accessory.color || "#ccc" }}
              />
              <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">
                {accessory.color || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
