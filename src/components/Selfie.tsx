import {useEffect, useRef} from "react"
import {incode, type SessionType} from "../incode"

function Selfie({ session, onSuccess, onError }:SelfiePropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderCamera("selfie", containerRef.current, {
      onSuccess,
      onError: ()=> onError({type: "Couldn't Capture Selfie"}),
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      showCustomCameraPermissionScreen: true,
      showDoublePermissionsRequest: true,
    });
    isMounted.current = true;
  }, [session, onSuccess, onError]);
  
  return <div ref={containerRef}></div>;
}
type SelfiePropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}
export {Selfie};