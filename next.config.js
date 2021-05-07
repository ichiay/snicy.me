/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const withPlugins = require('next-compose-plugins')
const PWA = require('next-pwa')
const optimizedImages = require('next-optimized-images')
const path = require('path')

const nextConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.join(__dirname, 'src/'),
    }
    return config
  },
}

module.exports = withPlugins([PWA, optimizedImages], nextConfig)
