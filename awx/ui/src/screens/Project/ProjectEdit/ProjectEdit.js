import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '@patternfly/react-core';
import { CardBody } from 'components/Card';
import { ProjectsAPI } from 'api';
import ProjectForm from '../shared/ProjectForm';

function ProjectEdit({ project }) {
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

    try {
      const {
        data: { id },
      } = await ProjectsAPI.update(project.id, {
        ...values,
        organization: values.organization.id,
        default_environment: values.default_environment?.id || null,
      });
      history.push(`/projects/${id}/details`);
    } catch (error) {
      setFormSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/projects/${project.id}/details`);
  };

  return (
    <Card>
      <CardBody>
        <ProjectForm
          project={project}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          submitError={formSubmitError}
        />
      </CardBody>
    </Card>
  );
}

export default ProjectEdit;
