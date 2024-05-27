import {useEffect, useRef } from "react"
import {incode, type SessionType} from "../incode"

const BackId = function({
  session,
  onSuccess,
  onError
}: BackIdPropTypes) {
  const containerRef= useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    incode.renderCamera("back", containerRef.current, {
      onSuccess,
      onError: ()=> onError({type: "Couldn't Capture Back Id"}),
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

type BackIdPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}

export {BackId}