import { useState, useEffect, useRef } from "react";
import Steps from "./components/Steps";
import { incode, type SessionType } from "./incode";
import { fakeBackendStart } from "./fakeBackend";

import { ProcessId } from "./components/ProcessId";


import { CaptureId } from "./components/CaptureId";
import { Selfie } from "./components/Selfie";
import { ProcessFace } from "./components/ProcessFace";

// import { UserConsent } from "./components/UserConsent";


function App() {
  const [session, setSession] = useState<SessionType | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  function goNext() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goLast() {
    setStep(steps.length - 1);
  }

  function handleError(e: { type: string }) {
    setError(e.type);
  }

  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;

    (async () => {
      try {
        // 1) Init SDK
        await incode.initialize();

        // 2) Create session (DEMO ONLY)
        const s = await fakeBackendStart();
        setSession(s);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Failed to initialize");
      }
    })();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>Loading Session...</p>;


  const steps = [
    <CaptureId session={session} onError={handleError} onSuccess={goNext} />,
    <ProcessId session={session} onError={handleError} onSuccess={goNext} />,
    <Selfie session={session} onError={handleError} onSuccess={goNext} />,
    <ProcessFace session={session} onError={handleError} onSuccess={goLast} />,
    <h1>Done!</h1>,
  ];
  return <Steps currentStep={step}>{steps}</Steps>;
}

export default App;
