import { Section, SectionHeading } from "@/components/ui/section";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description,
  className,
}: {
  items: AccordionItemData[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <Section className={className}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Accordion items={items} />
      </div>
    </Section>
  );
}
