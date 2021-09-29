import React from 'react';
import { act } from 'react-dom/test-utils';
import { Formik } from 'formik';
import { HubAPI } from 'api';
import { mountWithContexts } from '../../../../testUtils/enzymeHelpers';
import RepositoryStep from './RepositoryStep';

jest.mock('../../../api/models/Hub');

const repositories = [
  {
    id: '42845401-0e2e-4511-936a-1b63503c1191',
    name: 'python',
  },
  {
    id: '0a5a0f09-b3f1-4169-9764-e193f5c0a39b',
    name: 'alpine',
  },
];

describe('RepositoryStep', () => {
  beforeEach(() => {
    HubAPI.readRepositories.mockResolvedValue({
      data: {
        results: repositories,
        count: 2,
      },
    });
  });

  test('should load repositories', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mountWithContexts(
        <Formik>
          <RepositoryStep />
        </Formik>
      );
    });
    wrapper.update();

    expect(HubAPI.readRepositories).toHaveBeenCalled();
    expect(wrapper.find('OptionsList').prop('options')).toEqual(repositories);
  });
});
