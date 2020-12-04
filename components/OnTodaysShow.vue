<template>
  <div class="on-todays-show">
    <div class="l-grid l-grid--2up l-grid--1up--large l-grid--large-gutters">
      <lazy-hydrate ssr-only>
        <h2 class="on-todays-show-title">
          On Today's Show
        </h2>
      </lazy-hydrate>
    </div>
    <div class="l-grid l-grid--2up l-grid--1up--large l-grid--large-gutters">
      <div class="on-todays-show-left l-grid--order-1-large">
        <lazy-hydrate ssr-only>
          <p class="on-todays-show-headline">
            <a href="http://www.google.com" target="_blank" rel="noopener">The Future of Industry City; How Do Prosecutors Decide When to Convict Cops?; How the Kennedy Campaign Used Tech and Data</a>
          </p>
        </lazy-hydrate>
        <v-spacer size="triple" />
        <client-only>
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
              @click="collapseSegments"
            />
          </segment-list>
        </client-only>
      </div>
      <div class="on-todays-show-right l-grid--order-2-large">
        <lazy-hydrate ssr-only>
          <image-with-caption
            alt-text="image alt text"
            image="https://placehold.it/506x327"
            width="506"
            height="327"
            caption="This is the caption lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elitlorem ipsum dolor sit amet, consectetur adipiscing elit"
            credit="( AP Photo/Carolyn Kaster )"
            credit-url="http:///www.google.com"
          />
        </lazy-hydrate>
        <div class="dots" />
      </div>
    </div>
    <v-spacer size="triple" />
    <lazy-hydrate ssr-only>
      <div class="on-todays-show-person-social-wrapper">
        <ul class="on-todays-show-person-list" :data-count="people.length">
          <li v-for="person in people" :key="person.name" class="on-todays-show-person-item">
            <v-person
              class="on-todays-show-person"
              :image="person.image"
              :name="person.name"
              :name-link="person.nameLink"
              :role="person.role"
            />
          </li>
        </ul>
        <share-tools class="on-todays-show-social" label="Connect with the show!" layout="vertical">
          <share-tools-item
            v-for="(socialshare, index) in social"
            :key="index"
            :service="socialshare.service"
            :username="socialshare.contact"
          />
        </share-tools>
      </div>
    </lazy-hydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import whatsOnNow from '@/mixins/whatsOnNow'

export default {
  name: 'OnTodaysShow',
  components: {
    LazyHydrate,
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
        }],
      segmentsToShow: 3,
      people: [
        {
          image: 'http://placehold.it/120x120',
          name: 'Alison Stewart',
          'name-link': 'http://example.com',
          role: 'Host'
        },
        {
          image: 'http://placehold.it/120x120',
          name: 'Andrew Cuomo',
          role: 'Guest'
        },
        {
          image: 'http://placehold.it/120x120',
          name: 'Andrew Cuomo',
          role: 'Guest'
        }
      ]
    }
  },
  mounted () {
    if (window.innerWidth > 850) {
      this.segmentsToShow = 6
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
  width: 100%;
  @include media(">medium") {
    flex-direction: row;
  }
}

.on-todays-show-person-list {
  position: relative;
  flex: 1 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  justify-items: center;
  @include media(">medium") {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    margin-right: 24px;
    flex-basis: 328px;
    max-width: 328px;
  }
  @include media(">860px") {
    flex-basis: 560px;
    align-self: center;
    max-width: 560px;
    margin-right: 48px;
  }
}

.on-todays-show-person-list:after {
  display: none;
  @include media(">medium") {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    opacity: 0.5;
    border: 1px solid #EAEFF0;
    height: 100%;
  }
}

.on-todays-show-social {
  flex: 1 0 180px;
  width: 180px;
  margin-top: 36px;
  align-self: center;
  @include media(">medium") {
    margin: 0;
  }
}

.on-todays-show-person-item {
  display: inline-block;
  list-style: none;
  margin-bottom: 24px;
  width: 180px;
  @include media(">medium") {
    width: 280px;
  }
}

.on-todays-show-person.card.person-card {
  list-style: none;
  width: 180px;
  max-width: 180px;
  @include media(">medium") {
    width: 280px;
    max-width: 280px;
  }
}

.on-todays-show-person-list[data-count="1"] {
  flex-basis: 204px;
  max-width: 204px;
  @include media(">medium") {
    flex-basis: 328px;
    max-width: 328px;
  }
}
</style>
