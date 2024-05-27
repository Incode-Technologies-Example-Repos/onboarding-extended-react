import {useEffect, useRef } from "react"
import {incode, type SessionType} from "../incode"

const FrontId = function({
  session,
  onSuccess,
  onError
}: FrontIdPropTypes) {
  const containerRef= useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    incode.renderCamera("front", containerRef.current, {
      onSuccess,
      onError: ()=> onError({type: "Couldn't Capture FrontId"}),
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
type FrontIdPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}

export {FrontId}