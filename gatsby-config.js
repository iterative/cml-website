/* eslint-env node */

require('dotenv').config()
const path = require('path')

require('./config/prismjs/usage')

const apiMiddleware = require('./src/server/middleware/api')
const redirectsMiddleware = require('./src/server/middleware/redirects')

const title = 'CML · Continuous Machine Learning'
const description =
  'Bring DevOps practices to your projects for automatic, reproducible, and fast machine learning.'

const keywords = [
  'continuous machine learning',
  'machine learning',
  'continuous integration',
  'continuous delivery',
  'devops',
  'deployment',
  'provisioning'
]

const plugins = [
  {
    resolve: '@dvcorg/gatsby-theme-iterative',
    options: {
      remark: true,
      cssBase: path.join('src', 'components', 'organisms', 'Page', 'base.css')
    }
  },
  {
    resolve: `gatsby-plugin-alias-imports`,
    options: {
      alias: {
        '@media': 'src/media'
      }
    }
  },
  `gatsby-plugin-theme-ui`,
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: path.join(__dirname, 'static', 'img')
    }
  },
  'gatsby-plugin-catch-links',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      background_color: '#663399',
      display: 'minimal-ui',
      icon: 'static/favicon-512x512.png',
      name: 'CML',
      short_name: 'CML',
      start_url: '/',
      theme_color: '#663399',
      icons: [
        {
          src: '/apple-touch-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },
  {
    resolve: 'gatsby-plugin-sentry',
    options: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.SOURCE_VERSION,
      enabled: process.env.NODE_ENV === 'production',
      ignoreErrors: [
        /* When we deploy new version we delete assets which were generated for
        the previous deployed version, but users can have opened old version in 
        their browsers. If they hover some link on the page Gatsby.js will try
        fetch old chunks and will get ChunkLoadError, but then will load static
        page from the new deployed version and all will be ok. So we can just
        ignore these type of errors */
        'ChunkLoadError'
      ],
      /* There are some common urls which recomment to ignore. It's even 
      mentioned in the official documentation: https://docs.sentry.io/platforms/javascript/#decluttering-sentry
      In our case we just ignore all errors from the browser's extensions,
      because we can't influence on then somehow. */
      blacklistUrls: [/extensions\//i, /^chrome:\/\//i]
    }
  }
]

if (process.env.GITHUB_TOKEN) {
  plugins.push({
    resolve: `gatsby-source-github-api`,
    options: {
      // token: required by the GitHub API
      token: process.env.GITHUB_TOKEN,

      // GraphQLquery: defaults to a search query
      graphQLQuery: `
          {
            repository(owner: "iterative", name: "cml") {
              stargazers {
                totalCount
              }
            }
          }
        `,
      variables: {}
    }
  })
}

if (process.env.ANALYZE) {
  plugins.push({
    resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    options: {
      analyzerPort: 4000,
      production: process.env.NODE_ENV === 'production'
    }
  })
}

module.exports = {
  plugins,
  siteMetadata: {
    description,
    author: 'Iterative',
    keywords,
    title,
    siteUrl: process.env.HEROKU_APP_NAME
      ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
      : 'https://cml.dev',
    twitterUsername: '@DVCorg',
    titleTemplate: '%s | CML'
  },
  developMiddleware: app => {
    app.use(redirectsMiddleware)
    app.use('/api', apiMiddleware)
  }
}
