import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export function TestimonialCard({
  quote,
  name,
  role,
  location,
}: {
  quote: string;
  name: string;
  role: string;
  location: string;
}) {
  return (
    <Card className="flex h-full flex-col p-6">
      <Quote className="size-7 text-muted-foreground" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">“{quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar name={name} />
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">
            {role} · {location}
          </p>
        </div>
      </div>
    </Card>
  );
}
