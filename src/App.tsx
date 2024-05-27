import { useState, useEffect, useRef } from 'react'
import Steps from "./components/Steps";
import {type SessionType } from "./incode"
import { RedirectToMobile } from './components/RedirectToMobile';
import { FrontId } from './components/FrontId';
import { BackId } from './components/BackId';
import { ProcessId } from './components/ProcessId';
import { Selfie } from './components/Selfie';
import { ProcessFace } from './components/ProcessFace';
import { FinishOnboarding } from './components/FinishOnboarding';
import { UserConsent } from './components/UserConsent';


//Function to fetch the onboarding session
async function startOnboardingSession() {
  const tokenServerURL = import.meta.env.VITE_TOKEN_SERVER_URL as string;
  
  const urlParams = new URLSearchParams(window.location.search);
  const uniqueId = urlParams.get('uniqueId');
  
  let sessionStartUrl = `${tokenServerURL}/start`
  if (uniqueId) sessionStartUrl +=`?uniqueId=${uniqueId}`;

  const response = await fetch(sessionStartUrl);
  if (!response.ok) {
    const sessionData = await response.json();
    throw new Error(sessionData.error);
  }

  return await response.json() as SessionType;
}

function App() {
  const [session, setSession] = useState<null|SessionType>(null); // Stores the Session
  
  const [step, setStep] = useState(0); // Store the current step
  
  //Advance to the next Step
  function goNext() {
    setStep(step + 1);
  }
  function goLast() {
    setStep(8);
  }
  
  // Error Handling
  const [error, setError] = useState("");
  //Handling Error
  function handleError(e: { type: string; }) {
    setError(e.type);
  }
  
  // Store data that will not trigger re-renders unless specifically told so
  const isLoaded = useRef(false); 

  // Run this after the initial loading
  useEffect(() => {
    // Only fetch the data if we havent fetched it yet
    if (isLoaded.current) return;
    
    //Fetch the session and save it on the session variable
    startOnboardingSession().then(async (session:SessionType) => {
      setSession(session);
    }).catch(
      (e)=>console.log(e)
    );
    // We already sent the async call, don't call it again
    isLoaded.current = true;
  }, []);

  if (!session) return (<p>Loading Session...</p>);
  if (error) return (<p>Error: {error}!</p>);
  return (
    <Steps currentStep={step}>
      <RedirectToMobile session={session} onSkip={goNext} onFinish={goLast}/>
      <UserConsent session={session} onSuccess={goNext}/>
      <FrontId session={session} onError={handleError} onSuccess={goNext}/>
      <BackId session={session} onError={handleError} onSuccess={goNext}/>
      <ProcessId  session={session} onError={handleError} onSuccess={goNext} />
      <Selfie session={session} onError={handleError} onSuccess={goNext}/>
      <ProcessFace  session={session} onError={handleError} onSuccess={goNext} />
      <FinishOnboarding session={session} onError={handleError} onSuccess={goNext} />
      <h1>Done!</h1>
    </Steps>
  )
}

export default App