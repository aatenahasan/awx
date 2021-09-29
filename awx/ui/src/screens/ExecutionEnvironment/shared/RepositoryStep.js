import React, { useCallback, useEffect } from 'react';
import { t } from '@lingui/macro';
import { useField } from 'formik';
import styled from 'styled-components';
import { Alert } from '@patternfly/react-core';
import { HubAPI } from 'api';
import { getQSConfig } from 'util/qs';
import useRequest from 'hooks/useRequest';
import OptionsList from 'components/OptionsList';
import ContentLoading from 'components/ContentLoading';
import ContentError from 'components/ContentError';

const RepositoryErrorAlert = styled(Alert)`
  margin-bottom: 20px;
`;

const QS_CONFIG = getQSConfig('repository', {
  page: 1,
  page_size: 5,
  order_by: 'name',
});

function RepositoryStep() {
  const [field, meta, helpers] = useField('repository');

  const {
    isLoading,
    error,
    result: { repositories, count },
    request: fetchInventories,
  } = useRequest(
    useCallback(async () => {
      const { data } = await HubAPI.readRepositories();
      return {
        repositories: data.results,
        count: data.count,
      };
    }, []),
    {
      count: 0,
      repositories: [],
    }
  );

  useEffect(() => {
    fetchInventories();
  }, [fetchInventories]);

  if (isLoading) {
    return <ContentLoading />;
  }
  if (error) {
    return <ContentError error={error} />;
  }

  return (
    <>
      {meta.touched && meta.error && (
        <RepositoryErrorAlert variant="danger" isInline title={meta.error} />
      )}
      <OptionsList
        value={field.value ? [field.value] : []}
        options={repositories}
        optionCount={count}
        searchColumns={[]}
        sortColumns={[]}
        searchableKeys={[]}
        relatedSearchableKeys={[]}
        header={t`Repository`}
        name="repository"
        qsConfig={QS_CONFIG}
        readOnly
        selectItem={helpers.setValue}
        deselectItem={() => field.onChange(null)}
      />
    </>
  );
}

export default RepositoryStep;
