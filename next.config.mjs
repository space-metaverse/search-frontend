/**
 * @type {import('next').NextConfig}
 */
export default {
  compiler: {
    styledComponents: true
  },

  experimental: {
    transpilePackages: [
      '@algolia/autocomplete-shared',
      '@space-metaverse-ag/space-ui'
    ]
  },

  reactStrictMode: true
}
