module.exports = {
  apps: [
    {
      name: 'serv00',
      script: 'app.js',
      env: {
        NODE_ENV: 'production',
      },
      instances: '2',
      watch: true,
      autorestart: true,
      exec_mode: 'cluster',
    },
  ],
};
