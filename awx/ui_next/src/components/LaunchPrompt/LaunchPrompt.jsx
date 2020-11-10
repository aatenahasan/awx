import React from 'react';
import { Wizard } from '@patternfly/react-core';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Formik, useFormikContext } from 'formik';
import ContentError from '../ContentError';
import ContentLoading from '../ContentLoading';
import { useDismissableError } from '../../util/useRequest';
import mergeExtraVars from './mergeExtraVars';
import useLaunchSteps from './useLaunchSteps';
import AlertModal from '../AlertModal';
import getSurveyValues from './getSurveyValues';

function PromptModalForm({
  launchConfig,
  i18n,
  onCancel,
  onSubmit,
  resource,
  surveyConfig,
}) {
  const { values, setTouched, validateForm } = useFormikContext();

  const {
    steps,
    isReady,
    visitStep,
    visitAllSteps,
    contentError,
  } = useLaunchSteps(launchConfig, surveyConfig, resource, i18n);

  const handleSave = () => {
    const postValues = {};
    const setValue = (key, value) => {
      if (typeof value !== 'undefined' && value !== null) {
        postValues[key] = value;
      }
    };
    const surveyValues = getSurveyValues(values);
    setValue('inventory_id', values.inventory?.id);
    setValue(
      'credentials',
      values.credentials?.map(c => c.id)
    );
    setValue('job_type', values.job_type);
    setValue('limit', values.limit);
    setValue('job_tags', values.job_tags);
    setValue('skip_tags', values.skip_tags);
    const extraVars = launchConfig.ask_variables_on_launch
      ? values.extra_vars || '---'
      : resource.extra_vars;
    setValue('extra_vars', mergeExtraVars(extraVars, surveyValues));
    setValue('scm_branch', values.scm_branch);

    onSubmit(postValues);
  };
  const { error, dismissError } = useDismissableError(contentError);

  if (error) {
    return (
      <AlertModal
        isOpen={error}
        variant="error"
        title={i18n._(t`Error!`)}
        onClose={() => {
          dismissError();
        }}
      >
        <ContentError error={error} />
      </AlertModal>
    );
  }

  return (
    <Wizard
      isOpen
      onClose={onCancel}
      onSave={handleSave}
      onNext={async (nextStep, prevStep) => {
        if (nextStep.id === 'preview') {
          visitAllSteps(setTouched);
        } else {
          visitStep(prevStep.prevId);
        }
        await validateForm();
      }}
      onGoToStep={async (nextStep, prevStep) => {
        if (nextStep.id === 'preview') {
          visitAllSteps(setTouched);
        } else {
          visitStep(prevStep.prevId);
        }
        await validateForm();
      }}
      title={i18n._(t`Prompts`)}
      steps={
        isReady
          ? steps
          : [
              {
                name: i18n._(t`Content Loading`),
                component: <ContentLoading />,
              },
            ]
      }
      backButtonText={i18n._(t`Back`)}
      cancelButtonText={i18n._(t`Cancel`)}
      nextButtonText={i18n._(t`Next`)}
    />
  );
}

function LaunchPrompt({
  launchConfig,
  i18n,
  onCancel,
  onLaunch,
  resource = {},
  surveyConfig,
}) {
  return (
    <Formik initialValues={{}} onSubmit={values => onLaunch(values)}>
      <PromptModalForm
        onSubmit={values => onLaunch(values)}
        onCancel={onCancel}
        i18n={i18n}
        launchConfig={launchConfig}
        surveyConfig={surveyConfig}
        resource={resource}
      />
    </Formik>
  );
}

export { LaunchPrompt as _LaunchPrompt };
export default withI18n()(LaunchPrompt);
