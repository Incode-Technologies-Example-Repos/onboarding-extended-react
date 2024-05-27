import {useEffect, useRef} from "react"
import {incode, type SessionType} from "../incode"

function UserConsent({ session, onSuccess}:UserConsentPropTypes) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    
    
    
    useEffect(() => {
        function captureAndContinue() {
            // Now that the user consented, we can ask for this data
            
            // Optional but valuable for fraud prevention, hurts conversion
            // incode.sendFingerprint(session);
            // incode.sendGeolocation(session);
            
            onSuccess();
        }

        if (isMounted.current) {
            return;
        }
        incode.renderUserConsent(containerRef.current, {
            onSuccess: () =>{ captureAndContinue() },
            session: session,
            
        });
        isMounted.current = true;
    }, [session, onSuccess]);
    
    return <div ref={containerRef}></div>;
}
type UserConsentPropTypes = {
    session: SessionType;
    onSuccess: () => void;
}
export {UserConsent};