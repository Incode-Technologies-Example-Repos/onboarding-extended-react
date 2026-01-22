import { useEffect, useRef } from "react";
import { incode, type SessionType } from "../incode";

type Props = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: { type: string }) => void;
};

export function ProcessFace({ session, onSuccess, onError }: Props) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        await incode.processFace({ token: session.token });
        onSuccess();
      } catch (e) {
        console.error(e);
        onError({ type: "Couldn't process face" });
      }
    })();
  }, [session.token, onSuccess, onError]);

  return <p>Processing face...</p>;
}
