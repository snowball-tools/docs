import * as Docs from './lib/docs'

export default {
  name: 'Snowballtools Docs',
  origin: 'https://docs.snowball.build',
  locales: ['en'],

  static: true,
  locals: {
    Docs,
  },
  templateTypes: {
    'docs-page'(content) {
      return Docs.renderDocsContent(content)
    },
  },
}
