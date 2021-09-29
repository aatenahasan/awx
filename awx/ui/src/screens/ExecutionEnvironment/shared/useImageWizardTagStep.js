import React from 'react';
import { t } from '@lingui/macro';
import { useField } from 'formik';
import StepName from 'components/LaunchPrompt/steps/StepName';
import TagStep from './TagStep';

const STEP_ID = 'tag';

export default function useImageWizardTagStep(wizardHasErrors) {
  const [repositoryField] = useField('repository');
  return {
    step: getStep(wizardHasErrors, repositoryField.value),
    initialValues: null,
    isReady: true,
    contentError: null,
    hasError: false,
    setTouched: () => {},
    validate: () => {},
  };
}
function getStep(wizardHasErrors, repository) {
  return {
    id: STEP_ID,
    name: (
      <StepName hasErrors={false} id="tag-step">
        {t`Tag`}
      </StepName>
    ),
    component: <TagStep />,
    enableNext: !wizardHasErrors,
    nextButtonText: t`Confirm`,
    canJumpTo: !!repository,
  };
}
