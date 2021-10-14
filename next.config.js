/** @type {import('next').NextConfig} */
const withImages = require('next-images');
module.exports = withImages({
  reactStrictMode: false,
  images: {
    domains: ['kbi.sfo3.digitaloceanspaces.com', 'cdn.kerbel.in'],
  },
  webpack: (config, options) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader', // injects css into DOM
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    });
    return config;
  },
});
