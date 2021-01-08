<template>
  <div class="on-todays-show">
    <v-spacer v-if="$store.getters['whatsOnNow/onTodaysShowHeadline']" size="triple" />
    <div v-if="$store.getters['whatsOnNow/onTodaysShowHeadline']" class="l-grid l-grid--2up l-grid--1up--large l-grid--large-gutters">
      <h2 class="on-todays-show-title">
        On Today's Show
      </h2>
    </div>
    <div class="l-grid l-grid--2up l-grid--1up--large l-grid--large-gutters">
      <div v-if="$store.getters['whatsOnNow/onTodaysShowHeadline']" class="on-todays-show-left l-grid--order-1-large">
        <p class="on-todays-show-headline">
          <a :href="$store.getters['whatsOnNow/onTodaysShowHeadlineLink']" target="_blank" rel="noopener" v-html="$store.getters['whatsOnNow/onTodaysShowHeadline']" />
        </p>
        <template v-if="$store.getters['whatsOnNow/onTodaysShowSegments']">
          <v-spacer size="triple" />
          <segment-list>
            <segment-list-item
              v-for="(segment, index) in $store.getters['whatsOnNow/onTodaysShowSegments'].slice(0, segmentsToShow)"
              :key="index"
              :title="segment.title"
              :url="segment.url"
              :new-window="segment.newWindow"
            />
            <v-button
              v-if="$store.getters['whatsOnNow/onTodaysShowSegments'].length > segmentsToShow"
              label="show more"
              class="u-space--top"
              @click="segmentsToShow=$store.getters['whatsOnNow/onTodaysShowSegments'].length"
            />
          </segment-list>
        </template>
      </div>
      <div v-if="$store.getters['whatsOnNow/onTodaysShowImage']" class="on-todays-show-right l-grid--order-2-large">
        <image-with-caption
          :alt-text="$store.getters['whatsOnNow/onTodaysShowImageAltText']"
          :image="$store.getters['whatsOnNow/onTodaysShowImage']"
          width="506"
          height="327"
          :caption="$store.getters['whatsOnNow/onTodaysShowImageCaption']"
          :credit="$store.getters['whatsOnNow/onTodaysShowImageCredits']"
          :credit-url="$store.getters['whatsOnNow/onTodaysShowImageCreditsUrl']"
        />
        <div class="dots" />
      </div>
    </div>
    <div v-if="$store.getters['whatsOnNow/onTodaysShowHosts'] || $store.getters['whatsOnNow/onTodaysShowSocial']" class="on-todays-show">
      <v-spacer size="triple" />
      <div class="on-todays-show-person-social-wrapper">
        <ul v-if="$store.getters['whatsOnNow/onTodaysShowHosts']" class="on-todays-show-person-list">
          <li v-for="(host, index) in $store.getters['whatsOnNow/onTodaysShowHosts']" :key="index" class="on-todays-show-person-item">
            <a :href="'https://www.wnyc.org'+host.url" target="_blank" class="on-todays-show-person-link">
              <v-person
                class="on-todays-show-person"
                role="host"
                :name="host['first-name'] + ' ' + host['last-name']"
                :image="host.image ? host.image : 'https://media.wnyc.org/i/raw/2021/01/radio_avatar.png'"
              />
            </a>
          </li>
        </ul>
        <share-tools v-if="$store.getters['whatsOnNow/onTodaysShowSocial']" class="on-todays-show-social" label="Connect with the show!" layout="vertical">
          <share-tools-item
            v-if="twitter"
            :username="twitter"
            service="twitter"
          />
          <share-tools-item
            v-if="instagram"
            :username="instagram"
            service="instagram"
          />
          <share-tools-item
            v-if="facebook"
            :username="facebook"
            service="facebook"
          />
        </share-tools>
      </div>
    </div>
  </div>
</template>

<script>
import whatsOnNow from '@/mixins/whatsOnNow'

export default {
  name: 'whatsOnNow',
  components: {
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    SegmentList: () => import('nypr-design-system-vue/src/components/SegmentList'),
    SegmentListItem: () => import('nypr-design-system-vue/src/components/SegmentListItem'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    VPerson: () => import('nypr-design-system-vue/src/components/VPerson')
  },
  mixins: [whatsOnNow],
  data () {
    return {
      segmentsToShow: 3,
      twitter: null,
      instagram: null,
      facebook: null
    }
  },
  mounted () {
    if (window.innerWidth > 850) {
      this.segmentsToShow = 6
    }
    if (this.$store.getters['whatsOnNow/onTodaysShowSocial']) {
      this.twitter = this.$store.getters['whatsOnNow/onTodaysShowSocial'].twitter
      this.instagram = this.$store.getters['whatsOnNow/onTodaysShowSocial'].instagram
      this.facebook = this.$store.getters['whatsOnNow/onTodaysShowSocial'].facebook
    }
  },
  methods: {
    collapseSegments () {
      if (window.innerWidth > 850) {
        this.segmentsToShow = 6
      } else {
        this.segmentsToShow = 3
      }
    }
  }
}
</script>

<style lang="scss">
.o-icon {
  border: none;
  fill: RGB(var(--color-text));
  z-index: 10;
}

.o-icon:hover {
  fill: RGB(var(--color-text));
  opacity: var(--opacity-hover);
}

.on-todays-show-person-social-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @include media(">medium") {
    flex-direction: row;
  }
}

.on-todays-show-person-list {
  position: relative;
  flex: 1 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  row-gap: 24px;
  justify-items: center;
  padding-bottom: 48px;
  @include media(">medium") {
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    flex-basis: 280px;
  }
  @include media(">860px") {
    align-self: center;
  }
}

.on-todays-show-person-social-wrapper .on-todays-show-social {
  border-left: 1px solid rgba(234, 239, 240, 0.5);
  padding-left: 24px;
  width: 200px;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  @include media(">medium") {
    height: 124px;
    align-self: center;
    flex: 1 0 200px;
    padding-left: 48px;
    margin-top: 0;
  }

  .c-share-tools__label {
    flex-basis: auto;
  }
}

.on-todays-show-person-item {
  display: inline-block;
  list-style: none;
  width: 160px;
  @include media(">medium") {
    width: 280px;
  }
}

.on-todays-show-person.card.person-card {
  list-style: none;
  width: 160px;
  max-width: 160px;
  @include media(">medium") {
    width: 280px;
    max-width: 280px;
  }
}

.on-todays-show-person-link {
  border: none;
}
</style>
