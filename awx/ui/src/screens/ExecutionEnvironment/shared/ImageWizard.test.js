import React from 'react';
import { act } from 'react-dom/test-utils';
import { HubAPI } from 'api';
import {
  mountWithContexts,
  waitForElement,
} from '../../../../testUtils/enzymeHelpers';
import ImageWizard from './ImageWizard';

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

const tags = [
  {
    name: '1',
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
    name: '2',
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

describe('<ImageWizard/>', () => {
  let wrapper;
  const onSave = jest.fn();

  beforeEach(async () => {
    HubAPI.readRepositories.mockResolvedValue({
      data: {
        results: repositories,
        count: 2,
      },
    });

    HubAPI.readTags.mockResolvedValue({
      data: {
        results: tags,
        count: 2,
      },
    });

    await act(async () => {
      wrapper = mountWithContexts(
        <ImageWizard onClose={() => {}} onSave={onSave} />
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should mount properly', async () => {
    expect(wrapper.find('ImageWizard').length).toBe(1);
  });

  test('user can successfully navigate the wizard', async () => {
    await waitForElement(wrapper, 'WizardNavItem', (el) => el.length > 0);
    await waitForElement(wrapper, 'OptionsList', (el) => el.length > 0);
    expect(wrapper.find('CheckboxListItem').length).toBe(2);
    expect(wrapper.find('Button[type="submit"]').prop('isDisabled')).toBe(true);

    await act(async () => {
      wrapper
        .find('td#check-action-item-0a5a0f09-b3f1-4169-9764-e193f5c0a39b')
        .find('input')
        .simulate('click');
    });

    wrapper.update();

    expect(
      wrapper.find('CheckboxListItem[label="alpine"]').prop('isSelected')
    ).toBe(true);

    expect(wrapper.find('Button[type="submit"]').prop('isDisabled')).toBe(
      false
    );

    await act(async () =>
      wrapper.find('Button[type="submit"]').prop('onClick')()
    );

    wrapper.update();

    await waitForElement(wrapper, 'OptionsList', (el) => el.length > 0);
    expect(wrapper.find('CheckboxListItem').length).toBe(2);
    expect(wrapper.find('Button[type="submit"]').prop('isDisabled')).toBe(
      false
    );

    await act(async () => {
      wrapper.find('td#check-action-item-1').find('input').simulate('click');
    });

    wrapper.update();

    expect(wrapper.find('CheckboxListItem[label="1"]').prop('isSelected')).toBe(
      true
    );

    expect(wrapper.find('Button[type="submit"]').prop('isDisabled')).toBe(
      false
    );

    await act(async () =>
      wrapper.find('Button[type="submit"]').prop('onClick')()
    );

    wrapper.update();

    expect(onSave).toHaveBeenCalledWith({
      repository: {
        id: '0a5a0f09-b3f1-4169-9764-e193f5c0a39b',
        name: 'alpine',
      },
      tag: {
        name: '1',
        pulp_created: '2021-09-10T19:20:18.260593Z',
        pulp_last_updated: '2021-09-10T19:20:18.260632Z',
        tagged_manifest: {
          digest:
            'sha256:be9bdc0ef8e96dbc428dc189b31e2e3b05523d96d12ed627c37aa2936653258c',
          media_type: 'application/vnd.docker.distribution.manifest.v2+json',
          pulp_created: '2021-09-10T19:20:18.248274Z',
          pulp_id: '69197e2c-d124-4a3b-aaa8-b3d81bc51b95',
          schema_version: 2,
        },
      },
    });
  });
});
