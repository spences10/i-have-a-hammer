import React from 'react'
import { Callout } from './components/callout'
import CodeHighlight from './components/code'
import { Tweet as MDXTweet, CodePen as MDXCodePen } from 'mdx-embed'

// set the width on the tweet
const Tweet = props => {
  return (
    <div style={{ width: '100%' }}>
      <MDXTweet {...props} />
    </div>
  )
}
// set the width
const CodePen = props => {
  return (
    <div style={{ width: '70%' }}>
      <MDXCodePen {...props} />
    </div>
  )
}

export default {
  CodeHighlight,
  Callout,
  Tweet,
  CodePen,
}
