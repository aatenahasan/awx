import { useState } from 'react';
import useImageWizardRepositoryStep from './useImageWizardRepositoryStep';
import useImageWizardTagStep from './useImageWizardTagStep';

export default function useImageWizardSteps() {
  const [visited, setVisited] = useState({});
  const steps = [useImageWizardRepositoryStep(visited)];

  const hasErrors = steps.some((step) => step.hasError);

  steps.push(useImageWizardTagStep(hasErrors));

  return {
    steps: steps.map((s) => s.step).filter((s) => s != null),
    validateStep: (stepId) =>
      steps.find((s) => s?.step.id === stepId).validate(),
    visitStep: (prevStepId, setFieldTouched) => {
      setVisited({
        ...visited,
        [prevStepId]: true,
      });
      steps.find((s) => s?.step?.id === prevStepId).setTouched(setFieldTouched);
    },
  };
}
