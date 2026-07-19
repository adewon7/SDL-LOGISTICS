import { useEffect, useState } from "react";
import { ChevronLeft, Phone, MessageCircle, Star, Share2 } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { MapPlaceholder } from "../../../components/ui/MapPlaceholder";
import { Timeline } from "../../../components/ui/Timeline";
import { DRIVER } from "../../../data/customerData";

const TRIP_STEPS = [
  { t: "Driver assigned", d: "Emeka accepted your request" },
  { t: "En route to pickup", d: "About 4 minutes away" },
  { t: "Arrived at pickup", d: "Meet at the main gate" },
  { t: "Trip in progress", d: "Heading to destination" },
  { t: "Completed", d: "Rate your experience" },
];

interface TrackingPageProps {
  back: () => void;
  onDone: () => void;
  onChat: () => void;
  onCall: () => void;
}

export function TrackingPage({ back, onDone, onChat, onCall }: TrackingPageProps) {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    if (phase >= 4) return;
    const t = setTimeout(() => setPhase(phase + 1), 4200);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2 className="grow">Live tracking</h2>
        <Pill tone="teal">ETA 12 min</Pill>
      </div>

      <div className="body">
        <MapPlaceholder height={210} label="Live route · updating" live />

        <Card className="mt row">
          <Avatar name={DRIVER.name} />
          <div className="grow">
            <b style={{ fontSize: 14.5 }}>{DRIVER.name}</b>
            <div className="muted" style={{ fontSize: 12.5 }}>{DRIVER.vehicle} · {DRIVER.plate}</div>
            <div className="row" style={{ gap: 5, marginTop: 3 }}>
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <b style={{ fontSize: 12.5 }}>{DRIVER.rating}</b>
              <span className="muted" style={{ fontSize: 12 }}>· {DRIVER.trips.toLocaleString()} trips</span>
            </div>
          </div>
          <button className="iconbtn" aria-label="Call driver" onClick={onCall}>
            <Phone size={17} color="var(--teal)" />
          </button>
          <button className="iconbtn" aria-label="Chat with driver" onClick={onChat}>
            <MessageCircle size={17} color="var(--blue)" />
          </button>
        </Card>

        <Card className="mt">
          <div className="h3 mb">Trip progress</div>
          <Timeline steps={TRIP_STEPS} active={Math.min(phase, 4)} />
        </Card>

        <div className="row mt">
          <div className="grow">
            <Button variant="secondary" fullWidth>
              <Share2 size={15} /> Share trip
            </Button>
          </div>
          <div className="grow">
            {phase >= 4 ? (
              <Button variant="teal" fullWidth onClick={onDone}>Rate trip</Button>
            ) : (
              <Button variant="danger" fullWidth onClick={back}>Cancel</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}