/**
 * @type {import('next').NextConfig}
 */
export default {
  images: {
    domains: [
      'tryspace-prod-assets.tryspace-internal.com'
    ]
  },

  compiler: {
    styledComponents: true
  },

  reactStrictMode: true,

  transpilePackages: [
    '@space-metaverse-ag/space-ui'
  ]
}
