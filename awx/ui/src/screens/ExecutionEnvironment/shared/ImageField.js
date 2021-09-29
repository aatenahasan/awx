import React, { useEffect, useRef, useState } from 'react';
import { bool } from 'prop-types';
import { t } from '@lingui/macro';
import { useField } from 'formik';
import { MagicIcon } from '@patternfly/react-icons';
import {
  Button,
  ButtonVariant,
  InputGroup,
  FormGroup,
  Popover,
  TextInput,
  Tooltip,
} from '@patternfly/react-core';
import { required } from 'util/validators';
import ImageWizard from './ImageWizard';

function ImageField({ hubCredSelected, isDisabled }) {
  const isFirstRender = useRef(true);
  const textInputRef = useRef(null);
  const [showWizard, setShowWizard] = useState(false);
  const [imageField, imageMeta, imageHelpers] = useField({
    name: 'image',
    validate: required(null),
  });
  const [credentialField] = useField({
    name: 'credential',
  });

  const isValid = !(imageMeta.touched && imageMeta.error);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!showWizard) {
      textInputRef.current.focus();
    }
  }, [showWizard]);

  const handleWizardSave = (values) => {
    let hostName = credentialField?.value?.inputs?.host || '';

    if (hostName && !hostName.endsWith('/')) {
      hostName += '/';
    }

    imageHelpers.setValue(
      values?.tag?.name
        ? `${hostName}${values.repository.name}:${values.tag.name}`
        : `${hostName}${values.repository.name}`
    );
    setShowWizard(false);
  };

  return (
    <>
      <FormGroup
        fieldId="execution-environment-image"
        helperTextInvalid={imageMeta.error}
        isRequired
        validated={
          !(imageMeta.touched && imageMeta.error) ? 'default' : 'error'
        }
        label={t`Image`}
        labelIcon={
          <Popover
            content={
              <span>
                {t`The full image location, including the container registry, image name, and version tag.`}
                <br />
                <br />
                {t`Examples:`}
                <ul css="margin: 10px 0 10px 20px">
                  <li>
                    <code>quay.io/ansible/awx-ee:latest</code>
                  </li>
                  <li>
                    <code>repo/project/image-name:tag</code>
                  </li>
                </ul>
              </span>
            }
          />
        }
        helperText={
          hubCredSelected
            ? t`Use the wizard to select an image from Automation Hub.`
            : null
        }
      >
        <InputGroup>
          {hubCredSelected && (
            <Tooltip
              content={<div>{t`Select an image from Automation Hub`}</div>}
            >
              <Button
                aria-label={t`Select image from Automation Hub`}
                id="execution-environment-image-wizard-button"
                onClick={() => setShowWizard(true)}
                variant={ButtonVariant.control}
                isDisabled={isDisabled}
              >
                <MagicIcon />
              </Button>
            </Tooltip>
          )}
          <TextInput
            id="execution-environment-image"
            ref={textInputRef}
            value={imageField.value}
            onChange={(value) => {
              imageHelpers.setValue(value);
            }}
            isDisabled={isDisabled}
            validated={isValid ? 'default' : 'error'}
          />
        </InputGroup>
      </FormGroup>

      {showWizard && (
        <ImageWizard
          onSave={handleWizardSave}
          onClose={() => setShowWizard(false)}
        />
      )}
    </>
  );
}
ImageField.propTypes = {
  hubCredSelected: bool.isRequired,
  isDisabled: bool.isRequired,
};
ImageField.defaultProps = {};

export default ImageField;
