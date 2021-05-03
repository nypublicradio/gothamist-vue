<template>
  <div v-if="homepageData">
    <div class="l-container l-container--xl">
      <v-spacer size="quad" />
      <div class="c-home__content-top u-section-spacing--wide l-container l-container--xl l-wrap">
        <section class="c-featured-blocks o-section u-breakout">
          <h2 class="c-featured-blocks__heading">
            <span class="c-featured-blocks__heading-icon o-icon u-icon--s u-path-fill--quaternary">
              <svg
                role="img"
                class="o-arrow-stylish-arrow-icon"
                viewBox="3 3 18 18"
                width="40"
                height="40"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>arrow</title>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.236 5L19.836 7.736L21 8.906L14.772 15.128L16.884 17.24L6.174 19.04L5.01 17.894L3 10.232L6.552 11.702L13.236 5ZM5.898 17L13.416 15.71L11.214 14.792L17.886 8.126L13.5 6.326L6.816 12.986L4.614 12.062L5.898 17.006V17Z" fill="black" />
              </svg>
            </span>
            Featured
          </h2>
          <!-- big feature -->
          <div class="l-grid l-grid--2up l-grid--large-gutters u-space--bottom">
            <v-card
              show-gallery-icon
              class="gothamist mod-vertical mod-large"
              :image="featuredShows[0].lead_asset[0].value.image.file"
              :image-height="150"
              :image-width="150"
              :title="featuredShows[0].title"
              :title-link="`/${featuredShows[0].ancestry[0].slug}/${featuredShows[0].meta.slug}`"
              :subtitle="featuredShows[0].description"
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
            <!--- small featureds -->
            <ul>
              <li v-for="(feature, index) in featuredShows.slice(1,featuredShows.length)" :key="index">
                <br>
                <v-card
                  show-gallery-icon
                  class="gothamist mod-small"
                  :image="feature.lead_asset[0].value.image.file"
                  :image-height="150"
                  :image-width="150"
                  :title="feature.title"
                  :title-link="`/${feature.ancestry[0].slug}/${feature.meta.slug}`"
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
              </li>
            </ul>
          </div>
        </section>
        <!-- sponsored -->
        <div v-if="sponsoredData">
          <div class="l-grid l-grid--2up l-grid--large-gutters u-space--bottom">
            <div class="c-sponsored-tout u-breakout o-border-accent">
              <h2 class="c-sponsored-tout__heading">
                Sponsored
              </h2>

              <div class="c-block">
                <div class="c-block__object u-spacing--half" />
                <v-card
                  show-gallery-icon
                  class="gothamist mod-vertical mod-large"
                  :image="sponsoredData.items[0].lead_asset[0].value.image.file"
                  :image-height="150"
                  :image-width="150"
                  :title="sponsoredData.items[0].title"
                  :subtitle="sponsoredData.items[0].description"
                  :tags="[{'name': 'sponsored','slug': ''}]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- news river -->
      <ul>
        <li v-for="(story, index) in nonFeaturedShows" :key="index">
          <br>
          <v-card
            show-gallery-icon
            class="gothamist mod-small"
            :image="story.listing_image.file"
            :image-height="150"
            :image-width="150"
            :title="story.title"
            :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
            :subtitle="story.description"
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
        </li>
      </ul>
      <v-spacer size="quad" />
      <read-more-in />
      <v-spacer size="quad" />
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    ReadMoreIn: () => import('../components/ReadMoreIn'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter')
  },
  data () {
    return {
      homepageData: null,
      sponsoredData: null
    }
  },
  computed: {
    featuredShows () {
      if (this.homepageData) {
        return this.homepageData.items.filter((feature) => {
          return feature.show_as_feature
        }).slice(0, 4)
      } else {
        return null
      }
    },
    nonFeaturedShows () {
      if (this.homepageData) {
        return this.homepageData.items.filter((feature) => {
          return !feature.show_as_feature
        })
      } else {
        return null
      }
    }
  },
  async mounted () {
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=ancestry%2Cdescription%2Clead_asset%2Clegacy_id%2Clisting_image%2Cpublication_date%2Cshow_as_feature%2Csponsored_content%2Ctags%2Cupdated_date%2Curl%2Cuuid')
      .then(response => (
        this.homepageData = response.data
      ))
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1&sponsored_content=true')
      .then(response => (
        this.sponsoredData = response.data
      ))
  }
}
</script>

<style lang="scss">
.c-featured-blocks {
  padding: var(--space-7) var(--space-5);
}

.c-sponsored-tout {
  // background-color: rgb(var(--color-background-muted));
  background-color: var(--color-dirty-salmon);
  padding: var(--space-7) var(--space-9);
}

.o-border-accent, .card-details {
  background-color: RGB(var(--color-background-muted));
}
</style>
