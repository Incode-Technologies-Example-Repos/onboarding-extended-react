import {useEffect, useRef} from "react"
import {incode, type SessionType} from "../incode"

const RedirectToMobile = function({
  session,
  onSkip,
  onFinish,
}: RedirectToMobileTypes) {
  const containerRef= useRef<HTMLDivElement>(null)
  const isMounted = useRef(false)
  
  useEffect(() => {
    if (isMounted.current) {
      return
    }

    const localServerUrl = import.meta.env.VITE_LOCAL_SERVER_URL as string;

    if ( incode.isDesktop() ) {
      incode.renderRedirectToMobile(containerRef.current, {
        session: session,
        onSuccess: onFinish,
        skipDesktopRedirect: (): void => {onSkip()},
        allowSkipRedirect: false,
        showSms: false,
        url:`${localServerUrl}?uniqueId=${session.uniqueId}`,
      });
    } else {
      onSkip();
    }
    
    isMounted.current = true
  }, [session, onSkip, onFinish])
  
  return <div ref={containerRef}></div>
}

type RedirectToMobileTypes = {
  session: SessionType;
  onSkip: () => void;
  onFinish: () => void;
}

export {RedirectToMobile}