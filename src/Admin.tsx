import axios from "axios";
import {
  Ban,
  BellOff,
  CheckCheck,
  Cigarette,
  PhoneCall,
  Server,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GetStatus, TIMING } from "./App";

export default function Admin() {
  const [status, setStatus] = useState<string | undefined>();
  const [zeit, setZeit] = useState<string | undefined>();

  useEffect(() => {
    async function x() {
      const d = await GetStatus();
      setStatus(d.status);
      setZeit(d.since);
    }

    void x();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const d = await GetStatus();
      if (d == null) return;
      setStatus(d.status);
      setZeit(d.since);
    }, TIMING);
    return () => clearInterval(interval);
  }, []);

  const handleClick =
    (
      status:
        | "Anwesend"
        | "Abwesend"
        | "Beschäftigt"
        | "Am Telefonieren"
        | "Im Mittag"
        | "Am Rauchen"
        | "In Wartung"
        | "Auf Silbers Platz"
    ) =>
    async () => {
      await axios.post("https://status.computer-extra.net/post.php", {
        status: status,
      });
      alert(`Status wurde geändert zu ${status}`);
    };

  return (
    <div className="container">
      <p className="mb-6 text-2xl font-bold text-center">
        Aktueller Status: <span className="underline">{status}</span> <br />
        Seit: <span className="underline">{zeit}</span> Uhr
      </p>
      <div className="grid grid-cols-1 gap-14 mx-14">
        <Button onClick={handleClick("Anwesend")}>
          <div className="flex items-center justify-center gap-6">
            Anwesend <CheckCheck className="w-4 h-4 text-green-500" />
          </div>
        </Button>
        <Button onClick={handleClick("Abwesend")}>
          <div className="flex items-center justify-center gap-6">
            Abwesend <Ban className="w-4 h-4 text-red-500 ms-4" />
          </div>
        </Button>
        <Button onClick={handleClick("Beschäftigt")}>
          <div className="flex items-center justify-center gap-6">
            DND <BellOff className="w-4 h-4 text-red-500 ms-4" />
          </div>
        </Button>
        <Button onClick={handleClick("Am Telefonieren")}>
          <div className="flex items-center justify-center gap-6">
            Telefon <PhoneCall className="w-4 h-4 text-blue-500 ms-4" />
          </div>
        </Button>
        <Button onClick={handleClick("Im Mittag")}>
          <div className="flex items-center justify-center gap-6">
            Mittag <UtensilsCrossed className="w-4 h-4 text-red-500 ms-4" />
          </div>
        </Button>
        <Button onClick={handleClick("Am Rauchen")}>
          <div className="flex items-center justify-center gap-6">
            Rauchen <Cigarette className="w-4 h-4 text-red-500 ms-4" />
          </div>
        </Button>
        <Button onClick={handleClick("Am Rauchen")}>
          <div className="flex items-center justify-center gap-6">
            Wartung <Server className="w-4 h-4 text-red-500 ms-4" />
          </div>
        </Button>
        <Button onClick={handleClick("Am Rauchen")}>
          <div className="flex items-center justify-center gap-6">
            Silber <UtensilsCrossed className="w-4 h-4 text-red-500 ms-4" />
          </div>
        </Button>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-lg bg-slate-800 py-3.5 px-6 border border-transparent text-center text-base text-white transition-all shadow hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      {children}
    </button>
  );
}
