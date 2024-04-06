import * as LearnEVM from './lib/learnevm'

export default {
  name: "LearnEVM.com – A free, advanced course for Solidity Developers",
  origin: 'https://learnevm.com',
  locales: ['en'],

  static: true,
  locals: {
    LearnEVM,
  },
  templateTypes: {
    markdown(content) {
      return LearnEVM.renderChapterContent(content)
    }
  },
}
