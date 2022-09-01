import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, PageSection } from '@patternfly/react-core';
import { CardBody } from 'components/Card';
import { ProjectsAPI } from 'api';
import ProjectForm from '../shared/ProjectForm';

function ProjectAdd() {
  const [formSubmitError, setFormSubmitError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (values) => {
    if (values.scm_type === 'manual') {
      values.scm_type = '';
    }
    if (!values.credential) {
      values.credential = null;
    } else if (values?.credential?.id) {
      values.credential = values.credential.id;
    }

    setFormSubmitError(null);
    try {
      const {
        data: { id },
      } = await ProjectsAPI.create({
        ...values,
        organization: values.organization.id,
        default_environment: values.default_environment?.id,
      });
      history.push(`/projects/${id}/details`);
    } catch (error) {
      setFormSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/projects`);
  };

  return (
    <PageSection>
      <Card>
        <CardBody>
          <ProjectForm
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            submitError={formSubmitError}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default ProjectAdd;
