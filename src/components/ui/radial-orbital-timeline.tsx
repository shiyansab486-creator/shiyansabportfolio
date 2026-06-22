"use client";
import { useState, useEffect, useRef } from "react";
import { Clapperboard, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  src?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If we click outside an expanded card, collapse all
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      closeAll();
    }
  };

  const closeAll = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      // Close other items
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      const isOpening = !prev[id];
      newState[id] = isOpening;

      if (isOpening) {
        setActiveNodeId(id);
        setAutoRotate(false);

        // Highlight related items
        const currentItem = timelineData.find((item) => item.id === id);
        const relatedItems = currentItem ? currentItem.relatedIds : [];
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: any;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 30);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    // We want the active node at the top or a specific visual spot. 
    // 270 degrees is top.
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    
    // Adaptive radius
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const radius = isMobile ? 120 : 200;
    
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.3,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1200px" }}
        >
          {/* Central empty core with pulse */}
          <div className="absolute w-24 h-24 rounded-full border border-white/5 flex items-center justify-center pointer-events-none">
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-purple)] to-transparent opacity-20 animate-pulse"></div>
          </div>

          <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full border border-white/5 opacity-40 pointer-events-none"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = activeNodeId && timelineData.find(a => a.id === activeNodeId)?.relatedIds.includes(item.id);
            const isPulsing = pulseEffect[item.id];
            
            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px) scale(${isExpanded ? 1 : 1})`,
              zIndex: isExpanded ? 500 : position.zIndex,
              opacity: activeNodeId ? (isExpanded || isRelated ? 1 : 0.2) : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { if (el) nodeRefs.current[item.id] = el; }}
                className={cn(
                  "absolute transition-all duration-700 cursor-pointer",
                  activeNodeId && !isExpanded && !isRelated ? "pointer-events-none" : ""
                )}
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Orbital Node */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    isExpanded 
                      ? "bg-white text-black border-white scale-125 shadow-[0_0_30px_white]" 
                      : isRelated 
                        ? "bg-[var(--accent-blue)]/50 text-white border-[var(--accent-blue)] animate-pulse" 
                        : "bg-[var(--card-bg)] text-white border-white/20 backdrop-blur-md"
                  )}
                >
                  <Clapperboard size={18} />
                  {isPulsing && (
                    <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-40"></div>
                  )}
                </div>

                {/* Node Title */}
                {!activeNodeId && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-widest text-white/60 uppercase">
                    {item.title}
                  </div>
                )}

                {/* Expanded Video Card */}
                {isExpanded && (
                  <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={closeAll}></div>
                    <div className="relative w-full max-w-5xl aspect-[9/16] md:aspect-video bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-500">
                      <button 
                        onClick={closeAll}
                        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-[var(--accent-blue)] transition-all duration-300 shadow-lg"
                      >
                        <X size={20} />
                      </button>

                      <div className="w-full h-full flex items-center justify-center">
                        {item.src ? (
                          <video 
                            src={item.src} 
                            autoPlay 
                            controls 
                            loop 
                            playsInline 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-white/20 flex flex-col items-center gap-4">
                            <Clapperboard size={64} className="animate-pulse" />
                            <p className="mono-font text-xs uppercase tracking-widest opacity-50">Content Loading</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
