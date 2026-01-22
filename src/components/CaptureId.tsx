import { useEffect, useRef } from "react";
import { incode, type SessionType } from "../incode";
import { v2UiConfig } from "../uiConfig";

type Props = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: { type: string }) => void;
};

export function CaptureId({ session, onSuccess, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    if (!containerRef.current) {
      onError({ type: "Missing container" });
      return;
    }

    incode.renderCaptureId(containerRef.current, {
      session,
      forceIdV2: true,
      uiConfig: v2UiConfig,
      onSuccess: () => onSuccess(),
      onError: () => onError({ type: "Couldn't Capture ID (V2)" }),
    });

    return () => {
    };
  }, [session, onSuccess, onError]);

  return <div ref={containerRef} />;
}
