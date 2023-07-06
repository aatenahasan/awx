import { UsersAPI } from 'api';
import bootstrapPendo from './bootstrapPendo';

function buildPendoOptions(config, pendoApiKey) {
  const towerVersion = 'mabashian-0.0.0';
  const trial = false;

  return {
    apiKey: pendoApiKey,
    visitor: {
      id: 999999999,
      role: null,
    },
    account: {
      id: 'tower.ansible.com',
      planLevel: config.license_type,
      planPrice: config.instance_count,
      creationDate: config.license_date,
      trial,
      tower_version: towerVersion,
      ansible_version: config.ansible_version,
    },
  };
}

async function buildPendoOptionsRole(options, config) {
  try {
    if (config.me.is_superuser) {
      options.visitor.role = 'admin';
    } else {
      const { data } = await UsersAPI.readAdminOfOrganizations(config.me.id);
      if (data.count > 0) {
        options.visitor.role = 'orgadmin';
      } else {
        options.visitor.role = 'user';
      }
    }
    return options;
  } catch (error) {
    throw new Error(error);
  }
}

async function issuePendoIdentity(config) {
  if (!('license_info' in config)) {
    config.license_info = {};
  }
  config.license_info.analytics_status = config.analytics_status;
  config.license_info.version = config.version;
  config.license_info.ansible_version = config.ansible_version;

  bootstrapPendo('xxxxx-xxxxx-xxxxx-xxxxx-xxxxx');
  const pendoOptions = buildPendoOptions(config, 'xxxxx-xxxxx-xxxxx-xxxxx-xxxxx');
  const pendoOptionsWithRole = await buildPendoOptionsRole(
    pendoOptions,
    config
  );
  window.pendo.initialize(pendoOptionsWithRole);
}

export default issuePendoIdentity;
