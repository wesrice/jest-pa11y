module.exports = {
  auth: {
    htpasswd: {
      file: './.registry/htpasswd',
    },
  },
  logs: [
    {
      format: 'pretty',
      level: 'http',
      type: 'stdout',
    },
  ],
  packages: {
    '**': {
      access: '$all',
      publish: '$all',
    },
  },
  storage: './.registry/storage',
  uplinks: {
    npmjs: {
      url: 'https://registry.npmjs.org/',
    },
  },
};
