import { BlurText } from "../ui/magic-ui";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  centered?: boolean;
};

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <BlurText
        text={title}
        className="text-3xl font-bold tracking-tight text-[#111111] md:text-4xl"
      />
      <p className="mt-3 max-w-2xl text-base text-[#6E737B]">{subtitle}</p>
    </div>
  );
}
