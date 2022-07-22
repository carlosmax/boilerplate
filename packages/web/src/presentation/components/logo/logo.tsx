import React from 'react'

const Logo: React.FC = () => {
  return (
    <img
      // eslint-disable-next-line max-len
      src='data:image/png;base64,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'
      alt=''
    />
  )
}

export default Logo