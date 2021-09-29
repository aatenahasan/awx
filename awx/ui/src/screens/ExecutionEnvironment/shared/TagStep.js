import React, { useCallback, useEffect } from 'react';
import { t } from '@lingui/macro';
import { useField } from 'formik';
import { HubAPI } from 'api';
import { getQSConfig } from 'util/qs';
import useRequest from 'hooks/useRequest';
import OptionsList from 'components/OptionsList';
import ContentLoading from 'components/ContentLoading';
import ContentError from 'components/ContentError';

const QS_CONFIG = getQSConfig('tag', {
  page: 1,
  page_size: 5,
  order_by: 'name',
});

const tagUniqueKey = 'name';

function TagStep() {
  const [field, , helpers] = useField('tag');

  const {
    isLoading,
    error,
    result: { tags, count },
    request: fetchInventories,
  } = useRequest(
    useCallback(async () => {
      const { data } = await HubAPI.readTags();
      return {
        tags: data.results,
        count: data.count,
      };
    }, []),
    {
      count: 0,
      tags: [],
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
      <p>{t`Select a tag from the list of available tags below.  If no tag is selected, the latest version will be used.`}</p>
      <OptionsList
        value={field.value ? [field.value] : []}
        options={tags}
        optionCount={count}
        searchColumns={[]}
        sortColumns={[]}
        searchableKeys={[]}
        relatedSearchableKeys={[]}
        header={t`Tag`}
        name="tag"
        qsConfig={QS_CONFIG}
        readOnly={false}
        selectItem={helpers.setValue}
        deselectItem={() => helpers.setValue(null)}
        uniqueKey={tagUniqueKey}
      />
    </>
  );
}

export default TagStep;
