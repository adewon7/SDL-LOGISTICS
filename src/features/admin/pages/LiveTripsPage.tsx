import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { Button } from "../../../components/ui/Button";
import { StatusPill } from "../../../components/ui/StatusPill";
import { MapPlaceholder } from "../../../components/ui/MapPlaceholder";
import { LIVE_TRIPS } from "../../../data/adminData";

export function LiveTripsPage() {
  return (
    <>
      <PageHeader
        title="Live trips & deliveries"
        sub="Real-time monitoring · Abuja zone"
        right={<Pill tone="green">3 active</Pill>}
      />
      <div className="grid2">
        <MapPlaceholder height={330} label="Fleet map · 3 vehicles" live />
        <div>
          {LIVE_TRIPS.map((t) => (
            <Card key={t.id} className="row mb">
              <div className="grow">
                <div className="row" style={{ gap: 8 }}>
                  <b style={{ fontSize: 13.5 }}>{t.id}</b>
                  <StatusPill status={t.status} />
                </div>
                <div className="muted" style={{ fontSize: 12.5 }}>{t.route} · {t.partner}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <b style={{ fontSize: 13 }}>ETA {t.eta}</b>
                <div style={{ marginTop: 4 }}>
                  <Button variant="ghost" size="sm">Monitor</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}