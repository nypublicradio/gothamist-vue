import { compareAsc, format, differenceInMinutes, differenceInHours, getYear, isValid, subHours } from 'date-fns'

// formats tags into the correct format for radial (for article listing pages)
// name = the article's ancestry's title 'ancestry[0].title' from the CMS API
// slug = the article's ancestry's slug 'ancestry[0].slug' from the CMS API
// sponsored = boolean 'sponsored_content' from the CMS API
// tags = 'tags' array from the CMS API
export const formatTags = function (name, slug, sponsored, tags) {
  const tagArray = [{
    name,
    slug: '/' + slug
  }]
  if (sponsored) {
    return [{ name: 'sponsored' }]
  }
  if (tags.find(x => x.name === 'opinion')) {
    tagArray.push({
      name: 'opinion',
      slug: '/tags/opinion'
    })
  }
  return tagArray
}

// returns the article image
// asset = the article's 'lead_asset' from the CMS API
// slug = the article's ancestry's slug 'ancestry[0].slug' from the CMS API
// listingImage = the article's 'listing_image' from the CMS API
export const getArticleImage = function (asset, thisSlug, listingImage, quality) {
  const qual = quality || 75
  const slug = thisSlug || ''
  if (listingImage !== undefined && listingImage !== null) {
    return `${this.$config.imageBase}${listingImage.id}/fill-%width%x%height%|format-jpeg|jpegquality-${qual}/`
  }
  if (asset !== undefined && asset.length > 0) {
    if (asset[0].value.image) {
      return `${this.$config.imageBase}${asset[0].value.image.id}/fill-%width%x%height%|format-jpeg|jpegquality-${qual}/`
    }
    if (asset[0].value.defaultImage) {
      return `${this.$config.imageBase}${asset[0].value.defaultImage.id}/fill-%width%x%height%|format-jpeg|jpegquality-${qual}/`
    }
  }
  switch (slug) {
    case 'arts-entertainment':
      return this.defaultImageArts
    case 'food':
      return this.defaultImageFood
    case 'news':
      return this.defaultImageNews
    default:
      return this.defaultImage
  }
}

// get the image object from an article
export const getImageFromStory = function (story) {
  if (!story) {
    return null
  }
  const image = story.listingImage ||
    story.leadAsset[0]?.value.image ||
    story.leadAsset[0]?.value.defaultImage
  if (image) {
    return image
  }
  return null
}

// returns the image height based on the current dimensions and the desired width
// currentWidth = the image's current width
// currentHeight = the image's current height
// desiredWidth = the image's desired width
export const getHeightFromWidth = function (currentWidth, currentHeight, desiredWidth) {
  return Math.round(currentHeight * desiredWidth / currentWidth)
}

// returns an article image height
// asset = the article's 'lead_asset' from the CMS API
// listingImage = the article's 'listing_image' from the CMS API
export const getArticleImageHeight = function (asset, listingImage) {
  if (listingImage !== undefined && listingImage !== null) {
    return listingImage.height
  }
  if (asset !== undefined && asset.length > 0) {
    if (asset[0].value.image) {
      return asset[0].value.image.height
    }
    if (asset[0].value.defaultImage) {
      return asset[0].value.defaultImage.height
    }
  }
  return null
}

// returns an article image width
// asset = the article's 'lead_asset' from the CMS API
// listingImage = the article's 'listing_image' from the CMS API
export const getArticleImageWidth = function (asset, listingImage) {
  if (listingImage !== undefined && listingImage !== null) {
    return listingImage.width
  }
  if (asset !== undefined && asset.length > 0) {
    if (asset[0].value.image) {
      return asset[0].value.image.width
    }
    if (asset[0].value.defaultImage) {
      return asset[0].value.defaultImage.width
    }
  }
  return null
}

// returns the percent scrolled of any given element
export const getScrollDepth = function (target) {
  if (!target) {
    target = document.body
  }
  let distanceToTargetBottom = target.offsetHeight + target.offsetTop
  let parent = target.offsetParent
  while (parent) {
    distanceToTargetBottom += parent.offsetTop
    parent = parent.offsetParent
  }
  const scrolled = window.pageYOffset
  const windowHeight = window.innerHeight
  const progress = scrolled / (distanceToTargetBottom - windowHeight)
  return Math.min(Math.max(0, progress * 100), 100)
}

// checks if the asset has a gallery or not and return true/false
// asset = the story's 'lead_asset' from the CMS API
export const hasGallery = function (asset) {
  if (asset !== undefined && asset.length > 0) {
    if (asset[0].type === 'lead_gallery') {
      return true
    }
  }
  return false
}

export const amountScrolled = function () {
  const h = document.documentElement
  const b = document.body
  const st = 'scrollTop'
  const sh = 'scrollHeight'
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
}

// capitalize the first letter of a string
export const capitalize = function (string) {
  return string[0].toUpperCase() + string.substring(1)
}

// formats an ISO date to display the time e.g. 6:00pm
export const formatTime = function (time) {
  if (time !== undefined && time !== null) {
    return format(new Date(time), 'h:mm a')
  }
  return null
}

// formats a slug and returns a title by removing dashes and capitalizing the given string
export const formatTitle = function (string) {
  return capitalize(string.replace(/-/g, ' '))
}

export const fuzzyDateTime = function (utcTimestamp) {
  const JUST_NOW = 'Just now'
  const TIMESTAMP_FORMAT = 'MMM d, yyyy h:mm a'
  const TIMESTAMP_FORMAT_NO_YEAR = 'MMM d, h:mm a'
  const time = new Date(utcTimestamp)
  if (!isValid(time)) {
    return null
  }
  const now = new Date()
  const minutes = differenceInMinutes(now, time)
  const hours = differenceInHours(now, time)
  if (minutes <= 5) {
    return JUST_NOW
  } else if (minutes > 5 && hours < 1) {
    return `${minutes} mins ago`
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (getYear(time) === getYear(now)) {
    return format(time, TIMESTAMP_FORMAT_NO_YEAR)
  } else {
    return format(time, TIMESTAMP_FORMAT)
  }
}

// returns true if UTC date is less than 24 hours old
export const isLessThan24Hours = function (utcStartTime) {
  const now = new Date()
  const then = subHours(now, 24)
  const startTime = new Date(utcStartTime)
  if (isValid(startTime)) {
    return compareAsc(startTime, then) === 1 && compareAsc(now, startTime) === 1
  }
  return false
}

// returns true if UTC date is more than 24 hours old
export const isMoreThan24Hours = function (utcStartTime) {
  const now = new Date()
  const then = subHours(now, 24)
  const startTime = new Date(utcStartTime)
  if (isValid(startTime)) {
    return compareAsc(startTime, then) === -1
  }
  return false
}

// returns true if UTC date is less than 48 hours old
export const isLessThan48Hours = function (utcStartTime) {
  const now = new Date()
  const then = subHours(now, 48)
  const startTime = new Date(utcStartTime)
  if (isValid(startTime)) {
    return compareAsc(startTime, then) === 1 && compareAsc(now, startTime) === 1
  }
  return false
}

// returns true if UTC date is more than 48 hours old
export const isMoreThan48Hours = function (utcStartTime) {
  const now = new Date()
  const then = subHours(now, 48)
  const startTime = new Date(utcStartTime)
  if (isValid(startTime)) {
    return compareAsc(startTime, then) === -1
  }
  return false
}

export default {
  methods: {
    amountScrolled,
    capitalize,
    formatTags,
    formatTime,
    formatTitle,
    fuzzyDateTime,
    getArticleImage,
    getArticleImageHeight,
    getArticleImageWidth,
    getHeightFromWidth,
    getImageFromStory,
    getScrollDepth,
    hasGallery,
    isLessThan24Hours,
    isMoreThan24Hours,
    isLessThan48Hours,
    isMoreThan48Hours
  }
}
