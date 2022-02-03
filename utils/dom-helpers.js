// const INLINE_TAGS = ['a', 'b', 'i', 'em', 'strong']
// const HEADER_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5']
const EMBED_TAGS = ['iframe', 'embed', 'video',
  'twitter-widget', 'center', 'div']
const TEXT_CLASS = 'o-rte-text'
// a `div` tag in MT article markup is probably from an embed
const EMBED_WEIGHT = 50

function _isNotWhitespaceOnly (node) {
  return !(['#text', 'P'].includes(node.nodeName) &&
  node.textContent.replace(/\s/g, '').length === 0)
}

function _countWords (node) {
  const text = node.textContent
  return text.replace(/[^\w ]/g, '').split(/\s+/).length
}

function _getWordWeight (node) {
  const tagType = node.nodeName.toLowerCase()
  let wordWeight = _countWords(node)
  if (EMBED_TAGS.includes(tagType)) {
    wordWeight = Math.max(wordWeight, EMBED_WEIGHT)
  }
  return wordWeight
}

const _getTextFieldLandmarks = function (rootElement, wordWeight) {
  const landmarks = []
  const nodes = [...rootElement.childNodes].filter(_isNotWhitespaceOnly)
  for (const node of nodes) {
    if (node.nextSibling) {
      wordWeight += _getWordWeight(node)
      landmarks.push({
        node,
        wordWeight,
        type: node.nodeName.toLowerCase(),
        nextType: node.nextSibling?.nodeName.toLowerCase()
      })
    } else {
      wordWeight += _getWordWeight(node)
      landmarks.push({
        node: rootElement,
        wordWeight,
        type: rootElement.nodeName.toLowerCase(),
        nextType: rootElement.nextSibling?.nodeName.toLowerCase()
      })
    }
  }
  return landmarks
}

// Insert next to insertLocation, or append the end.
const insertAfterElement = function (element, target) {
  const parent = target.parentNode
  if (target && target.nextSibling) {
    parent.insertBefore(element, target.nextSibling)
  } else {
    parent.appendChild(element)
  }
}

const getStreamfieldLandmarks = function (rootElement) {
  let wordWeight = 0
  const landmarks = []
  const nodes = [...rootElement.childNodes].filter(_isNotWhitespaceOnly)
  for (const node of nodes) {
    if ([...node.classList].includes(TEXT_CLASS)) {
      const childLandmarks = _getTextFieldLandmarks(node, wordWeight)
      landmarks.push(...childLandmarks)
      wordWeight = landmarks.lastItem.wordWeight
    } else {
      wordWeight += _getWordWeight(node)
      landmarks.push({
        node,
        wordWeight,
        type: node.nodeName.toLowerCase(),
        nextType: node.nextSibling?.nodeName.toLowerCase()
      })
    }
  }
  return landmarks
}

export {
  getStreamfieldLandmarks,
  insertAfterElement
}
