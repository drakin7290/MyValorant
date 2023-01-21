const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
});

const config = require('./config.json');

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const nodeEnv = (() => {
    if (isProd) return 'production';
    return 'development';
  })();

  console.log('🚀🚀 ENV: ', nodeEnv);

  const env = {
    PRODUCTION_VERSION: config.PRODUCTION_VERSION,
    SERVER_URI: config.SERVER_URI,
    WEB_URI: config.WEB_URI,
  };

  console.log('env_log', env);

  // next.config.js object
  return bundleAnalyzer({
    env,
    sassOptions: {
      // includePaths: ['./styles'],
      prependData: `@import "./public/styles/base.scss";`,
    },
    images: {
      domains: ['localhost', 'myvalorant.xyz', 'myvalorant.xyz'],
    },
    experimental: {
      outputStandalone: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  });
};
