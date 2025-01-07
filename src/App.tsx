import { useEffect, useState } from "react";
import axios from "axios";
import {
  Ban,
  BellOff,
  CheckCheck,
  Cigarette,
  PhoneCall,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "./lib/utils";

const TIMING = 5 * 1000; // Timing in Seconds

const getStatus = async () => {
  const res = await axios.get("https://status.computer-extra.net/status.php");
  const d = res.data[0];
  if (d == null) return null;
  return d;
};

function App() {
  const [status, setStatus] = useState<string | undefined>();
  const [zeit, setZeit] = useState<string | undefined>();

  useEffect(() => {
    // Get Status
    async function x() {
      const d = await getStatus();
      setStatus(d.status);
      setZeit(d.since);
    }

    void x();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const d = await getStatus();
      if (d == null) return;
      setStatus(d.status);
      setZeit(d.since);
    }, TIMING);
    return () => clearInterval(interval);
  }, []);

  const getIcon = () => {
    switch (status) {
      case "Anwesend":
        return <CheckCheck className="w-40 h-40 text-green-500" />;
      case "Abwesend":
        return <Ban className="w-40 h-40 text-red-500 ms-4" />;
      case "Beschäftigt":
        return <BellOff className="w-40 h-40 text-red-500 ms-4" />;
      case "Am Telefonieren":
        return <PhoneCall className="w-40 h-40 text-blue-500 ms-4" />;
      case "Im Mittag":
        return <UtensilsCrossed className="w-40 h-40 text-red-500 ms-4" />;
      case "Am Rauchen":
        return <Cigarette className="w-40 h-40 text-red-500 ms-4" />;
    }
  };

  const getColor = () => {
    switch (status) {
      case "Anwesend":
        return "border-green-500";
      case "Abwesend":
        return "border-red-500";
      case "Beschäftigt":
        return "border-red-500";
      case "Am Telefonieren":
        return "border-blue-500";
      case "Im Mittag":
        return "border-red-500";
      case "Am Rauchen":
        return "border-red-500";
    }
  };

  return (
    <div
      className={cn(
        "h-[320px] w-[480px] max-h-[320px] max-w-[480px] border-8",
        getColor()
      )}
    >
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Johannes' Status: <br />
        <span className="underline">{status}</span>
      </h1>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
        Seit: {zeit} Uhr
      </h2>
      <div className="flex items-center justify-center animate-wiggle">
        {getIcon()}
      </div>
    </div>
  );
}

export default App;
