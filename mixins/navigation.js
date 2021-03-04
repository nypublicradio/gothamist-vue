export default {
  methods: {
    formatNavigationArray (array) {
      const formattedArray = []
      array.forEach(function (item) {
        formattedArray.push(
          {
            type: item.type,
            text: item.value.title,
            url: item.value.url,
            newWindow: false
          }
        )
      })
      return formattedArray
    }
  }
}
