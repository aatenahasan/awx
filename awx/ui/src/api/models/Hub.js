/* eslint-disable */
import Base from '../Base';

class Config extends Base {
  constructor(http) {
    super(http);
    this.baseUrl = '/api/v2/hub/';
    this.read = this.read.bind(this);
  }

  readRepositories() {
    return Promise.resolve({
      data: {
        count: 2,
        results: [
          {
            id: '42845401-0e2e-4511-936a-1b63503c1191',
            name: 'python',
            pulp: {
              repository: {
                pulp_id: 'aa2bbb25-b0f3-4f25-9570-3d1dac9a5f8a',
                pulp_type: 'container.container',
                version: 1,
                name: 'python',
                description: null,
                pulp_created: '2021-09-02T19:46:08.279878Z',
                last_sync_task: null,
                pulp_labels: {},
                remote: {
                  pulp_id: 'ba95ac4e-4cd3-4a2e-b531-b4a4d669a2ef',
                  name: 'python',
                  upstream_name: 'newswangerd/ubuntu',
                  registry: 'e538f3ae-6e37-4d77-9644-431fe9d41dde',
                  last_sync_task: {
                    task_id: '950dc0aa-f4c2-4826-8925-452df33ecbb6',
                    state: 'completed',
                    started_at: '2021-09-02T19:50:12.011078Z',
                    finished_at: '2021-09-02T19:50:15.658338Z',
                    error: null,
                  },
                },
              },
              distribution: {
                pulp_id: '42845401-0e2e-4511-936a-1b63503c1191',
                name: 'python',
                pulp_created: '2021-09-02T19:46:08.508326Z',
                base_path: 'python',
                pulp_labels: {},
              },
            },
            namespace: {
              name: 'python',
              my_permissions: [
                'container.add_containernamespace',
                'container.change_containernamespace',
                'container.delete_containernamespace',
                'container.namespace_add_containerdistribution',
                'container.namespace_change_containerdistribution',
                'container.namespace_change_containerpushrepository',
                'container.namespace_delete_containerdistribution',
                'container.namespace_modify_content_containerpushrepository',
                'container.namespace_pull_containerdistribution',
                'container.namespace_push_containerdistribution',
                'container.namespace_view_containerdistribution',
                'container.namespace_view_containerpushrepository',
                'container.view_containernamespace',
              ],
              owners: ['admin'],
            },
            description: null,
            created: '2021-09-02T19:46:08.279878Z',
            updated: '2021-09-02T19:50:15.640004Z',
          },
          {
            id: '0a5a0f09-b3f1-4169-9764-e193f5c0a39b',
            name: 'alpine',
            pulp: {
              repository: {
                pulp_id: 'd45cbef1-63f9-4d8c-8fcc-e5ea2a9d26ca',
                pulp_type: 'container.container-push',
                version: 4,
                name: 'alpine',
                description: null,
                pulp_created: '2021-09-03T17:29:01.931543Z',
                last_sync_task: null,
                pulp_labels: {},
                remote: null,
              },
              distribution: {
                pulp_id: '0a5a0f09-b3f1-4169-9764-e193f5c0a39b',
                name: 'alpine',
                pulp_created: '2021-09-03T17:29:02.088540Z',
                base_path: 'alpine',
                pulp_labels: {},
              },
            },
            namespace: {
              name: 'alpine',
              my_permissions: [
                'container.add_containernamespace',
                'container.change_containernamespace',
                'container.delete_containernamespace',
                'container.namespace_add_containerdistribution',
                'container.namespace_change_containerdistribution',
                'container.namespace_change_containerpushrepository',
                'container.namespace_delete_containerdistribution',
                'container.namespace_modify_content_containerpushrepository',
                'container.namespace_pull_containerdistribution',
                'container.namespace_push_containerdistribution',
                'container.namespace_view_containerdistribution',
                'container.namespace_view_containerpushrepository',
                'container.view_containernamespace',
              ],
              owners: ['admin'],
            },
            description: null,
            created: '2021-09-03T17:29:01.931543Z',
            updated: '2021-09-03T17:29:48.843825Z',
          },
        ],
      },
    });
  }

  readTags() {
    return Promise.resolve({
      data: {
        count: 3,
        results: [
          {
            name: 'latest',
            pulp_created: '2021-09-10T19:20:18.260593Z',
            pulp_last_updated: '2021-09-10T19:20:18.260632Z',
            tagged_manifest: {
              pulp_id: '69197e2c-d124-4a3b-aaa8-b3d81bc51b95',
              digest:
                'sha256:be9bdc0ef8e96dbc428dc189b31e2e3b05523d96d12ed627c37aa2936653258c',
              schema_version: 2,
              media_type:
                'application/vnd.docker.distribution.manifest.v2+json',
              pulp_created: '2021-09-10T19:20:18.248274Z',
            },
          },
          {
            name: '1.0',
            pulp_created: '2021-09-10T19:20:18.260593Z',
            pulp_last_updated: '2021-09-10T19:20:18.260632Z',
            tagged_manifest: {
              pulp_id: '69197e2c-d124-4a3b-aaa8-b3d81bc51b95',
              digest:
                'sha256:be9bdc0ef8e96dbc428dc189b31e2e3b05523d96d12ed627c37aa2936653258c',
              schema_version: 2,
              media_type:
                'application/vnd.docker.distribution.manifest.v2+json',
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
              media_type:
                'application/vnd.docker.distribution.manifest.v2+json',
              pulp_created: '2021-09-10T19:20:18.248274Z',
            },
          },
        ],
      },
    });
  }
}

export default Config;
