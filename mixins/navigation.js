export default {
  methods: {
    formatNavigationArray (array) {
      const formattedArray = []
      array.forEach(function (item) {
        let newWindow = false
        if (item.type === 'external_link') {
          newWindow = true
        }
        formattedArray.push(
          {
            type: item.type,
            text: item.value.title,
            url: item.value.url,
            newWindow
          }
        )
      })
      return formattedArray
    }
  }
}
