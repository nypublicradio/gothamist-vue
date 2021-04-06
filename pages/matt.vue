<template>
  <div>
    <v-spacer size="quad" />
    <div class="l-container l-container--12col">
      <h1 class="c-article__headline o-headline">
        Three Hundred Gallons Of Diesel Fuel Spilled In Times Square Hotel
      </h1>
      <v-spacer size="double" />
      <div class="l-container l-container--10col">
        <article-metadata
          publish-date="Jan 1, 2020 1:25PM"
          updated-date="Mar 2, 2020 10:08AM"
        >
          <!--            <template v-slot:authors>-->
          <!--              <v-byline :authors="[{firstName: 'Brian',lastName: 'Lehrer',url: 'http://www.google.com'}]" />-->
          <!--            </template>-->
          <template v-slot:comments>
            <v-counter
              text="comments"
              value="40"
              href="http://www.google.com"
            />
          </template>
        </article-metadata>
        <v-spacer size="double" />
        <div class="l-container">
          <share-tools
            layout="column"
            class="c-article__share u-border-accent u-border-accent--right"
          >
            <share-tools-item
              service="email"
              link="mailto:test@test.com"
            />
            <share-tools-item
              service="facebook"
              link="https://www.facebook.com/npratc/"
            />
            <share-tools-item
              service="twitter"
              link="https://twitter.com/npratc/"
            />
            <share-tools-item
              service="instagram"
              link="https://www.instagram.com/npratc/"
            />
            <share-tools-item
              service="newsletter"
              link="https://www.mailchimp.com"
            />
          </share-tools>
          <gallery-preview
            variation="gothamist"
            :count="19"
            gallery-url="http://www.google.com"
            :images="
              [
                {url:'http://placehold.it/640x500?text=1', thumbnail:'http://placehold.it/150x150?text=1', alt:'alt 1',caption:'caption 1',credit:'1 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'},
                {url:'http://placehold.it/640x500?text=2', thumbnail:'http://placehold.it/150x150?text=2', alt:'alt 2',caption:'caption 2',credit:'2 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'},
                {url:'http://placehold.it/640x500?text=3', thumbnail:'http://placehold.it/150x150?text=3', alt:'alt 3',caption:'caption 3',credit:'3 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'},
                {url:'http://placehold.it/640x500?text=4', thumbnail:'http://placehold.it/150x150?text=4', alt:'alt 4',caption:'caption 4',credit:'4 ( AP Photo/Carolyn Kaster )',creditUrl: 'http:///www.google.com'}
              ]
            "
          />
        </div>
      </div>
    </div>
    <v-spacer size="quad" />
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
