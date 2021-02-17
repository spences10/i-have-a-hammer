import { MDXProvider } from '@mdx-js/react'
import { MDXPTypes, setMDXPType } from '@mdxp/core'
import { preToCodeBlock } from 'mdx-utils'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import React from 'react'
import { Box } from 'theme-ui'

function getParams(className = ``) {
  const [lang = ``, params = ``] = className.split(`:`)

  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`)
      merged[key] = value
      return merged
    }, {})
  )
}

const RE = /{([\d,-]+)}/

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))
    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end
          ? lineNumber >= start && lineNumber <= end
          : lineNumber === start
      )
      return inRange
    }
  } else {
    return () => false
  }
}

export const Code = ({
  codeString,
  noLineNumbers = false,
  className: blockClassName,
  metastring = ``,
  ...props
}) => {
  const showLineNumbers = true

  const [language, { title = `` }] = getParams(blockClassName)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const hasLineNumbers =
    !noLineNumbers && language !== `noLineNumbers` && showLineNumbers

  return (
    <div>
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <>
            {title && (
              <div className="code-title">
                <div>{title}</div>
              </div>
            )}
            <div className="deck-highlight" data-language={language}>
              <Box
                as="pre"
                variant="styles.pre"
                className={className}
                style={style}
                data-linenumber={hasLineNumbers}
              >
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`
                  }

                  return (
                    <div {...lineProps}>
                      {hasLineNumbers && (
                        <span className="line-number-style">
                          {i + 1}
                        </span>
                      )}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </Box>
            </div>
          </>
        )}
      </Highlight>
    </div>
  )
}

const mdComponents = {
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    if (props) {
      return <Code {...props} />
    }
    return <pre {...preProps} />
  },
}

const CodeHighlight = ({ children }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <MDXProvider components={mdComponents}>{children}</MDXProvider>
    </div>
  )
}

export default setMDXPType(
  CodeHighlight,
  MDXPTypes.WRAPPER,
  MDXPTypes.LAYOUT
)
