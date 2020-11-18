<template>
  <div class="on-todays-show">
    <div class="l-grid l-grid--2up l-grid--1up--large l-grid--large-gutters">
      <h2 class="on-todays-show-title">
        On Today's Show
      </h2>
    </div>
    <div class="l-grid l-grid--2up l-grid--1up--large l-grid--large-gutters">
      <div class="on-todays-show-left l-grid--order-1-large">
        <p class="on-todays-show-headline">
          The Future of Industry City; How Do Prosecutors Decide When to Convict Cops?; How the Kennedy Campaign Used Tech and Data
        </p>
        <v-spacer size="triple" />
        <segment-list>
          <segment-list-item
            v-for="(segment, index) in segments.slice(0, segmentsToShow)"
            :key="index"
            :title="segment.title"
            :url="segment.url"
            :new-window="segment.newWindow"
          />
          <v-button
            v-if="segments.length > segmentsToShow"
            label="show more"
            class="u-space--top"
            @click="segmentsToShow=segments.length"
          />
          <v-button
            v-else
            label="show less"
            class="u-space--top"
            @click="segmentsToShow=6"
          />
        </segment-list>
      </div>
      <div class="on-todays-show-right l-grid--order-2-large">
        <image-with-caption
          alt-text="image alt text"
          image="http://placehold.it/506x327"
          caption="This is the caption lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elitlorem ipsum dolor sit amet, consectetur adipiscing elit"
          credit="( AP Photo/Carolyn Kaster )"
          credit-url="http:///www.google.com"
        />
        <div class="dots" />
        <share-tools label="Connect with the show!">
          <share-tools-item
            v-for="(socialshare, index) in social"
            :key="index"
            :service="socialshare.service"
            :username="socialshare.contact"
          />
        </share-tools>
      </div>
    </div>
  </div>
</template>

<script>
import whatsOnNow from '@/mixins/whatsOnNow'

export default {
  name: 'OnTodaysShow',
  components: {
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    SegmentList: () => import('nypr-design-system-vue/src/components/SegmentList'),
    SegmentListItem: () => import('nypr-design-system-vue/src/components/SegmentListItem'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow],

  data () {
    return {
      segments: [
        {
          title: 'A Lawsuit Demanding Reparations, 100 Years After the Tulsa Race Massacre',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item Number Two with no link!',
          url: '',
          newWindow: true
        },
        {
          title: 'Item number 3',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 4',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 5',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 6',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 7',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 8',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 9',
          url: 'http://www.google.com',
          newWindow: true
        },
        {
          title: 'Item number 10',
          url: 'http://www.google.com',
          newWindow: true
        }
      ],
      segmentsToShow: 6,
      social: [
        {
          contact: 'AllOfItWNYC',
          service: 'facebook'
        },
        {
          contact: 'AllOfItWNYC',
          service: 'twitter'
        },
        {
          contact: 'allofitwnyc',
          service: 'instagram'
        }]
    }
  }
}
</script>
<style scoped>
.o-icon {
  border: none;
  fill: RGB(var(--color-text));
  z-index: 10;
}

.o-icon:hover {
  fill: RGB(var(--color-text));
  opacity: var(--opacity-hover);
}
</style>
