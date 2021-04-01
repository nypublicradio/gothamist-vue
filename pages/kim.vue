<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <p>kim's test page</p>
      <v-spacer size="quad" />
      <Breadcrumbs :breadcrumbs="[{title: 'News', url:'/news'},{title: 'Opinion', url:'/opinion'}]" />
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
            <template v-slot:authors>
              <v-byline :authors="[{firstName: 'Brian',lastName: 'Lehrer',url: 'http://www.google.com'}]" />
            </template>
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
          <v-spacer size="quad" />
          <do-you-know-the-scoop />
        </div>
      </div>
      <v-spacer size="quad" />
      <article-page-newsletter />
      <v-spacer size="quad" />
      <v-card
        show-gallery-icon
        class="gothamist mod-vertical mod-large"
        image="http://placehold.it/640x430"
        :image-height="150"
        :image-width="150"
        title="'What’s The Point?': A Year After COVID Shut Down NYC Schools, Many Students Struggle To Cope"
        title-link="http://www.google.com"
        subtitle="Here's what the latest Campaign Finance Board filings tell us."
        :tags="[{'name': 'news','slug': 'news'},{'name': 'sponsored','slug': ''}]"
      >
        <article-metadata
          publish-date="Jan 1, 2020 1:25PM"
          updated-date="Mar 2, 2020 10:08AM"
        >
          <template v-slot:comments>
            <v-counter
              icon="comment"
              value="40"
              href="http://www.google.com"
            />
          </template>
        </article-metadata>
      </v-card>
      <v-spacer size="quad" />
      <v-card
        show-gallery-icon
        class="gothamist mod-small"
        image="http://placehold.it/150x150"
        :image-height="150"
        :image-width="150"
        title="'What’s The Point?': A Year After COVID Shut Down NYC Schools, Many Students Struggle To Cope"
        title-link="http://www.google.com"
        :tags="[{'name': 'news','slug': 'news'},{'name': 'sponsored','slug': ''}]"
      >
        <article-metadata
          publish-date="Jan 1, 2020 1:25PM"
          updated-date="Mar 2, 2020 10:08AM"
        >
          <template v-slot:comments>
            <v-counter
              icon="comment"
              value="40"
              href="http://www.google.com"
            />
          </template>
        </article-metadata>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KimTestPage',
  components: {
    Breadcrumbs: () => import('../components/Breadcrumbs'),
    DoYouKnowTheScoop: () => import('../components/DoYouKnowTheScoop'),
    ArticlePageNewsletter: () => import('../components/ArticlePageNewsletter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VByline: () => import('nypr-design-system-vue/src/components/VByline'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    GalleryPreview: () => import('nypr-design-system-vue/src/components/GalleryPreview'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter')
  }
}
</script>
