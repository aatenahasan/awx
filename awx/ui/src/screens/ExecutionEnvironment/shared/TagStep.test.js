import React from 'react';
import { act } from 'react-dom/test-utils';
import { Formik } from 'formik';
import { HubAPI } from 'api';
import { mountWithContexts } from '../../../../testUtils/enzymeHelpers';
import TagStep from './TagStep';

jest.mock('../../../api/models/Hub');

const tags = [
  {
    name: '1.0',
    pulp_created: '2021-09-10T19:20:18.260593Z',
    pulp_last_updated: '2021-09-10T19:20:18.260632Z',
    tagged_manifest: {
      pulp_id: '69197e2c-d124-4a3b-aaa8-b3d81bc51b95',
      digest:
        'sha256:be9bdc0ef8e96dbc428dc189b31e2e3b05523d96d12ed627c37aa2936653258c',
      schema_version: 2,
      media_type: 'application/vnd.docker.distribution.manifest.v2+json',
      pulp_created: '2021-09-10T19:20:18.248274Z',
    },
  },
  {
    name: '2.0',
    pulp_created: '2021-09-10T19:20:18.260593Z',
    pulp_last_updated: '2021-09-10T19:20:18.260632Z',
    tagged_manifest: {
      pulp_id: '69197e2c-d124-4a3b-aaa8-b3d81bc51b95',
      digest:
        'sha256:be9bdc0ef8e96dbc428dc189b31e2e3b05523d96d12ed627c37aa2936653258c',
      schema_version: 2,
      media_type: 'application/vnd.docker.distribution.manifest.v2+json',
      pulp_created: '2021-09-10T19:20:18.248274Z',
    },
  },
];

describe('TagStep', () => {
  beforeEach(() => {
    HubAPI.readTags.mockResolvedValue({
      data: {
        results: tags,
        count: 2,
      },
    });
  });

  test('should load tags', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mountWithContexts(
        <Formik>
          <TagStep />
        </Formik>
      );
    });
    wrapper.update();

    expect(HubAPI.readTags).toHaveBeenCalled();
    expect(wrapper.find('OptionsList').prop('options')).toEqual(tags);
  });
});
