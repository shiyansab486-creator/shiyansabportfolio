import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Clapperboard } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "Video 1",
    date: "2024",
    content: "A short cinematic edit.",
    category: "Cinematic",
    icon: Clapperboard,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
    src: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    title: "Video 2",
    date: "2024",
    content: "Content cut.",
    category: "Content Cut",
    icon: Clapperboard,
    relatedIds: [1],
    status: "completed" as const,
    energy: 90,
  }
];

export default function DemoOne() {
  return (
    <div className="w-full h-screen bg-black">
      <RadialOrbitalTimeline timelineData={timelineData} />
    </div>
  );
}
