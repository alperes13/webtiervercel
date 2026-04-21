"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const firstNodeId = timelineData[0]?.id ?? null;
  const buildExpandedState = (openId: number | null) => {
    const state: Record<number, boolean> = {};
    timelineData.forEach((item) => {
      state[item.id] = item.id === openId;
    });
    return state;
  };

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(() => buildExpandedState(firstNodeId));
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>(() => {
    const pulse: Record<number, boolean> = {};
    timelineData[0]?.relatedIds.forEach((rid) => {
      pulse[rid] = true;
    });
    return pulse;
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(firstNodeId);
  const [orbitRadius, setOrbitRadius] = useState<number>(180);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 768) {
        const mobileRadius = Math.max(90, Math.min(130, Math.floor(window.innerWidth * 0.28)));
        setOrbitRadius(mobileRadius);
        return;
      }
      setOrbitRadius(180);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!timelineData.length) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      return;
    }

    if (activeNodeId !== null && timelineData.some((item) => item.id === activeNodeId)) {
      return;
    }

    const fallbackId = timelineData[0].id;
    const pulse: Record<number, boolean> = {};
    timelineData[0].relatedIds.forEach((rid) => {
      pulse[rid] = true;
    });

    setExpandedItems(buildExpandedState(fallbackId));
    setActiveNodeId(fallbackId);
    setPulseEffect(pulse);
    setAutoRotate(false);
  }, [activeNodeId, timelineData]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      if (activeNodeId !== null) {
        toggleItem(activeNodeId);
        return;
      }
      if (firstNodeId !== null) {
        toggleItem(firstNodeId);
      }
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems(buildExpandedState(id));
    setActiveNodeId(id);
    setAutoRotate(false);

    const relatedItems = timelineData.find((item) => item.id === id)?.relatedIds ?? [];
    const pulse: Record<number, boolean> = {};
    relatedItems.forEach((rid) => {
      pulse[rid] = true;
    });
    setPulseEffect(pulse);

    const nodeIndex = timelineData.findIndex((item) => item.id === id);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle(prev => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = orbitRadius * Math.cos(radian);
    const y = orbitRadius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return timelineData.find(i => i.id === activeNodeId)?.relatedIds.includes(itemId) ?? false;
  };

  const getStatusStyles = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed": return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      case "pending": return "text-white/70 bg-black/40 border-white/40";
    }
  };

  const getStatusLabel = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed": return "TAMAMLANDI";
      case "in-progress": return "DEVAM EDİYOR";
      case "pending": return "BEKLEMEDE";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-4 md:px-0"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-[420px] md:max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center node */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center z-10"
            style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}>
            <div className="absolute w-20 h-20 rounded-full border border-white/20"
              style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.6 }} />
            <div className="absolute w-24 h-24 rounded-full border border-white/10"
              style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite 0.5s', opacity: 0.4 }} />
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/10 pointer-events-none transition-all duration-300"
            style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
          />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={el => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={e => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy halo */}
                <div
                  className="absolute rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    animation: isPulsing ? 'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite' : 'none',
                  }}
                />

                {/* Icon circle */}
                <div
                  className={[
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                    isExpanded
                      ? 'bg-white text-black border-white shadow-lg shadow-white/30 scale-150'
                      : isRelated
                      ? 'bg-white/50 text-black border-white'
                      : 'bg-black text-white border-white/40',
                  ].join(' ')}
                  style={{ animation: isRelated && !isExpanded ? 'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite' : 'none' }}
                >
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div className={`absolute top-12 whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-wider transition-all duration-300 max-w-[110px] md:max-w-none text-center ${isExpanded ? 'text-white scale-125' : 'text-white/70'}`}
                  style={{ left: '50%', transform: isExpanded ? 'translateX(-50%) scale(1.25)' : 'translateX(-50%)' }}>
                  {item.title}
                </div>

                {/* Detail card */}
                {isExpanded && (
                  <div className="absolute top-16 md:top-20 w-[78vw] max-w-64 bg-black/90 backdrop-blur-lg border border-white/30 shadow-xl shadow-white/10 rounded-lg overflow-visible"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                    <div className="p-4 pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusStyles(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    </div>
                    <div className="px-4 pb-4 text-xs text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-white/60">
                            <Zap size={10} className="mr-1" />
                            Enerji
                          </span>
                          <span className="font-mono text-white/60">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }} />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <LinkIcon size={10} className="text-white/60 mr-1" />
                            <span className="text-xs uppercase tracking-wider font-medium text-white/60">Bağlı Adımlar</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map(rid => {
                              const related = timelineData.find(i => i.id === rid);
                              return (
                                <button
                                  key={rid}
                                  className="flex items-center h-6 px-2 text-xs border border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all rounded"
                                  onClick={e => { e.stopPropagation(); toggleItem(rid); }}
                                >
                                  {related?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
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
