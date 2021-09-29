import React from 'react';
import { t } from '@lingui/macro';
import { withFormik, useFormikContext } from 'formik';
import Wizard from 'components/Wizard';
import useImageWizardSteps from './useImageWizardSteps';

function ImageWizard({ onSave, onClose }) {
  const { setFieldTouched, values } = useFormikContext();
  const { steps, validateStep, visitStep } = useImageWizardSteps();

  return (
    <Wizard
      style={{ overflow: 'scroll' }}
      isOpen
      onBack={async (nextStep) => {
        validateStep(nextStep.id);
      }}
      onNext={(nextStep, prevStep) => {
        visitStep(prevStep.prevId, setFieldTouched);
        validateStep(nextStep.id);
      }}
      onClose={() => onClose()}
      onSave={() => {
        onSave(values);
      }}
      onGoToStep={(nextStep, prevStep) => {
        visitStep(prevStep.prevId, setFieldTouched);
        validateStep(nextStep.id);
      }}
      steps={steps}
      title={t`Select an image from Automation Hub`}
      backButtonText={t`Back`}
      cancelButtonText={t`Cancel`}
      nextButtonText={t`Next`}
    />
  );
}

const ImageWizardForm = withFormik({
  mapPropsToValues() {
    return {
      repository: null,
      tag: null,
    };
  },
})(ImageWizard);

ImageWizardForm.propTypes = {};

export default ImageWizardForm;
