import {useEffect} from "react"
import {incode, type SessionType} from "../incode"

function ProcessFace({
  session,
  onSuccess,
  onError
}:ProccessFacePropTypes) {
  useEffect(() => {
    void incode.processFace(
      {token: session.token}
    ).then(() => {
      onSuccess();
    }).catch((error) => {
      onError({type: error});
    });
  }, [session, onSuccess, onError]);
  
  return <p>Processing...</p>;
}

type ProccessFacePropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}

export {ProcessFace}