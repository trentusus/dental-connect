"use client";

import { useEffect, useState } from "react";
import { useStatsigClient } from "@statsig/react-bindings";

export default function ConsentBar(): React.ReactElement | null {
  const { client } = useStatsigClient();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const decision = window.localStorage.getItem("statsig_consent");
      setVisible(!decision);

    } catch {
      // If storage is unavailable, default to showing the bar
      setVisible(true);
    }
  }, [client]);

  if (!visible) return null;

  const accept = () => {
    try {
      window.localStorage.setItem("statsig_consent", "accepted");
    } catch {}
    console.log("events can be sent now")
    client.updateRuntimeOptions({ loggingEnabled: "browser-only", disableStorage: false });
    client.flush();
    setVisible(false);
    
  };

  const reject = () => {
    try {
      window.localStorage.setItem("statsig_consent", "rejected");
    } catch {}
    client.updateRuntimeOptions({ loggingEnabled: "disabled", disableStorage: true });
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white border-t shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3 justify-between">
        <p className="text-sm text-gray-700">
          We use Statsig for feature analytics to improve your experience. You can accept or reject data collection.
        </p>
        <div className="flex gap-2">
          <button
            onClick={reject}
            className="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

