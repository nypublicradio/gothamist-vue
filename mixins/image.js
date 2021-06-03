export const getImagePath = function (image, width, height) {
  // image is an object with an id, and potentially a width and height
  // image.id - id of the image in the cms
  // image.width - width of the original image in the cms
  // image.height - height of the original image in the cms

  // the image resizer has more options but this basic url
  // is all we need to suppport for now
  const imageSizing = 'fill'
  return `${image.id}/${imageSizing}-${width}x${height}/`
}

export default {
  methods: {
    getImagePath
  }
}
