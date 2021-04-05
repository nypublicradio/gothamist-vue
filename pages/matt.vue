<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <gallery-preview
        variation="gothamist"
        :count="19"
        :images="
          [
            {url:'http://placehold.it/640x500?text=1', thumbnail:'http://placehold.it/150x150?text=1', alt:'alt 1',caption:'caption 1',credit:'1 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'},
            {url:'http://placehold.it/640x500?text=2', thumbnail:'http://placehold.it/150x150?text=2', alt:'alt 2',caption:'caption 2',credit:'2 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'},
            {url:'http://placehold.it/640x500?text=3', thumbnail:'http://placehold.it/150x150?text=3', alt:'alt 3',caption:'caption 3',credit:'3 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'},
            {url:'http://placehold.it/640x500?text=4', thumbnail:'http://placehold.it/150x150?text=4', alt:'alt 4',caption:'caption 4',credit:'4 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'}
          ]
        "
      />
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    GalleryPreview: () => import('nypr-design-system-vue/src/components/GalleryPreview'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  }
}
</script>
