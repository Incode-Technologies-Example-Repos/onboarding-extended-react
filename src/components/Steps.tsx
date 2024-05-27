import { Children, cloneElement } from "react";

function Steps({ children, currentStep }: StepsPropTypes) {
  return (
    <>
      {Children.map(
        children,
        (child, index) => currentStep === index && cloneElement(child)
      )}
    </>
  );
}
type StepsPropTypes= {
  children: React.ReactElement[];
  currentStep: number;
}
export default Steps;
