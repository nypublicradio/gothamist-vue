<template>
  <div>
    <div class="l-container l-container--16col">
      <v-spacer size="quad" />
      <p>kim's test page</p>
      <v-spacer size="quad" />
      <v-banner
        tag="Breaking News"
        headline="Red Hook Tavern Is A Cozy Neighborhood Gathering Spot (With $22 Burgers)"
        description="<p>full description test with more text that <a href='http://www.google.com'>links</a> and has <i>other</i> <b>formatting.</b></p>"
      />
      <v-spacer size="quad" />
      <product-marketing-banner
        title="Support Gothamist Today"
        description="Reader support makes Gothamist’s local journalism possible. For our spring membership campaign, we’re looking for 250 new Gothamist members by the end of the month. Make a donation to support Gothamist and local news today."
        cta="donate now"
        link="https://pledge3.wnyc.org/donate/gothamist/onestep/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=prodmktgbanner"
      />
      <v-spacer size="quad" />
    </div>
    <homepage-donate-banner />
    <div class="l-container">
      <v-spacer size="quad" />
      <do-you-know-the-scoop />
      <v-spacer size="quad" />
      <Breadcrumbs :breadcrumbs="[{name: 'News', slug:'news'},{name: 'Opinion', slug:'opinion'}]" />
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
                :value="40"
                href="http://www.google.com"
              />
            </template>
          </article-metadata>
        </div>
      </div>
      <v-spacer size="quad" />
      <article-page-newsletter title="NYC news never sleeps. Get the Gothamist Daily newsletter and don't miss a moment." />
      <v-spacer size="quad" />
      <article-page-newsletter />
      <v-spacer size="quad" />
      <v-card
        show-gallery-icon
        class="gothamist mod-vertical mod-large"
        image="/images/news-tile.png"
        :image-height="150"
        :image-width="150"
        title="'What’s The Point?': A Year After COVID Shut Down NYC Schools, Many Students Struggle To Cope"
        title-link="http://www.google.com"
        subtitle="Here's what the latest Campaign Finance Board filings tell us."
        :tags="[{'name': 'news','slug': 'news'},{'name': 'sponsored','slug': ''}]"
      >
        <!--        <article-metadata-->
        <!--          publish-date="Jan 1, 2020 1:25PM"-->
        <!--          updated-date="Mar 2, 2020 10:08AM"-->
        <!--        >-->
        <!--          <template v-slot:comments>-->
        <!--            <v-counter-->
        <!--              icon="comment"-->
        <!--              :value="40"-->
        <!--              href="http://www.google.com"-->
        <!--            />-->
        <!--          </template>-->
        <!--        </article-metadata>-->
      </v-card>
      <v-spacer size="quad" />
      <v-card
        show-gallery-icon
        class="gothamist mod-small"
        image="/images/news-tile.png"
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
              :value="40"
              href="http://www.google.com"
            />
          </template>
        </article-metadata>
      </v-card>
      <v-spacer size="quad" />
      <div class="l-grid l-grid--2up l-grid--large-gutters">
        <div>
          <h2 class="o-section__heading o-bg-text-accent">
            Recent Stories
          </h2>
          <v-spacer />
          <recent-stories />
        </div>
        <div>
          <h2 class="o-section__heading o-bg-text-accent">
            Featured In News
          </h2>
          <v-spacer />
          <featured-in />
        </div>
      </div>
      <donate-banner />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'KimTestPage',
  components: {
    Breadcrumbs: () => import('../components/Breadcrumbs'),
    DoYouKnowTheScoop: () => import('../components/DoYouKnowTheScoop'),
    ArticlePageNewsletter: () => import('../components/ArticlePageNewsletter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VBanner: () => import('nypr-design-system-vue/src/components/VBanner'),
    VByline: () => import('nypr-design-system-vue/src/components/VByline'),
    HomepageDonateBanner: () => import('../components/HomepageDonateBanner'),
    DonateBanner: () => import('../components/DonateBanner'),
    RecentStories: () => import('../components/RecentStories'),
    ProductMarketingBanner: () => import('../components/ProductMarketingBanner'),
    FeaturedIn: () => import('../components/FeaturedIn'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter')
  },
  mixins: [gtm]
}
</script>
