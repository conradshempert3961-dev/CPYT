module.exports = {
  apps: [
    {
      name: "sputnik-kamchatka",
      script: "server.js",
      cwd: "/var/www/sputnik-kamchatka",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: 3000,
      },
    },
  ],
};
