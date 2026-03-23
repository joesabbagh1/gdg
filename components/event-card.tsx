import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface EventCardProps {
  title: string;
  location: string;
  date: string;
  href?: string;
  image?: string;
}

export function EventCard({ title, location, date, href, image }: EventCardProps) {
  const content = (
    <Card className="group transition-all duration-300 hover:shadow-xl hover:shadow-[#4285F4]/10 hover:-translate-y-2 border-2 hover:border-[#4285F4]/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden">
      {image ? (
        <div className="relative h-40 w-full overflow-hidden bg-black flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold group-hover:text-[#4285F4] transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 mt-3">
          <MapPinIcon className="h-5 w-5 text-[#DB4437] flex-shrink-0" />
          <span className="font-medium">{location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CalendarIcon className="h-5 w-5 text-[#F4B400] flex-shrink-0" />
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
