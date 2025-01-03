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

const TIMING = 30 * 1000; // Timing in Seconds

function App() {
  const [status, setStatus] = useState<string | undefined>();
  const [zeit, setZeit] = useState<string | undefined>();

  useEffect(() => {
    // Get Status
    async function x() {
      const res = await axios.get(
        "https://status.computer-extra.net/status.php"
      );
      const d = res.data[0];
      if (d == null) return;

      setStatus(d.status);
      setZeit(d.since);
    }

    void x();
  }, []);

  useEffect(() => {
    // Reload Page
    const timer = setTimeout(() => {
      location.reload();
    }, TIMING);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getIcon = () => {
    switch (status) {
      case "Anwesend":
        return <CheckCheck className="w-14 h-14 ms-4" />;
      case "Abwesend":
        return <Ban className="w-14 h-14 ms-4" />;
      case "Beschäftigt":
        return <BellOff className="w-14 h-14 ms-4" />;
      case "Am Telefonieren":
        return <PhoneCall className="w-14 h-14 ms-4" />;
      case "Im Mittag":
        return <UtensilsCrossed className="w-14 h-14 ms-4" />;
      case "Am Rauchen":
        return <Cigarette className="w-14 h-14 ms-4" />;
    }
  };

  return (
    <>
      <h1 className="flex text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Aktueller Status: {status} {getIcon()}
      </h1>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
        Seit: {zeit} Uhr
      </h2>
    </>
  );
}

export default App;
