import React from 'react';
import { t } from '@lingui/macro';
import { useField } from 'formik';
import StepName from 'components/LaunchPrompt/steps/StepName';
import RepositoryStep from './RepositoryStep';

const STEP_ID = 'repository';

export default function useImageWizardRepositoryStep(visitedSteps) {
  const [field, meta, helpers] = useField('repository');
  const formError =
    Object.keys(visitedSteps).includes(STEP_ID) && meta.touched && !meta.value;

  return {
    step: getStep(formError, field.value),
    initialValues: null,
    isReady: true,
    contentError: null,
    hasError: formError,
    setTouched: (setFieldTouched) => {
      setFieldTouched('repository', true, false);
    },
    validate: () => {
      if (meta.touched && !meta.value) {
        helpers.setError(t`A repository must be selected`);
      }
    },
  };
}
function getStep(formError, fieldValue) {
  return {
    id: STEP_ID,
    name: (
      <StepName hasErrors={formError} id="repository-step">
        {t`Repository`}
      </StepName>
    ),
    component: <RepositoryStep />,
    enableNext: !!fieldValue,
  };
}
