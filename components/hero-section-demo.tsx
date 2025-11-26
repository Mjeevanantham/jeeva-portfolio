import { AnimatedRoadmap } from "@/components/ui/hero-section-5";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const milestonesData = [
  {
    id: 1,
    name: "Kick-off",
    status: "complete",
    position: { top: "70%", left: "5%" },
  },
  {
    id: 2,
    name: "Design",
    status: "complete",
    position: { top: "15%", left: "20%" },
  },
  {
    id: 3,
    name: "Development",
    status: "in-progress",
    position: { top: "45%", left: "55%" },
  },
  {
    id: 4,
    name: "Launch",
    status: "pending",
    position: { top: "10%", right: "10%" },
  },
] as const;

const mapImageSrc =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80";

interface HeroSectionDemoProps {
  className?: string;
}

const HeroSectionDemo = ({ className }: HeroSectionDemoProps) => {
  return (
    <div className={cn("w-full bg-background text-foreground", className)}>
      <div className="flex flex-col items-center px-4 py-16 text-center md:py-24">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Stay ahead with a <span className="rounded-md bg-primary/20 p-2">clear</span> product plan
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Visualize your roadmap, assign tasks, and hit every milestone—faster and smarter.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg">Get started — it&apos;s free!</Button>
          <Button size="lg" variant="outline">
            See how it works
          </Button>
        </div>
      </div>

      <AnimatedRoadmap
        milestones={milestonesData}
        mapImageSrc={mapImageSrc}
        aria-label="An animated roadmap showing project milestones from kick-off to launch."
      />
    </div>
  );
};

export default HeroSectionDemo;
