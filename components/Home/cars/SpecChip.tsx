export default function SpecChip({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="size-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
      <span className="truncate">{children}</span>
    </div>
  );
}
