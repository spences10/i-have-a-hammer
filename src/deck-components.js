import React from 'react'
import { Callout } from './components/callout'
import CodeHighlight from './components/code'
import { Tweet as MDXTweet } from 'mdx-embed'

const Tweet = props => {
  return (
    <div style={{ width: '100%' }}>
      <MDXTweet {...props} />
    </div>
  )
}

export default {
  CodeHighlight,
  Callout,
  Tweet,
}
