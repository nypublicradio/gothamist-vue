<template>
  <div v-if="hosts || socialLinks" class="on-todays-show">
    <v-spacer size="triple" />
    <div class="on-todays-show-person-social-wrapper">
      <ul v-if="hosts" class="on-todays-show-person-list">
        <li v-for="(host, index) in hosts" :key="index" class="on-todays-show-person-item">
          <v-person
            class="on-todays-show-person"
            :name="host['first-name'] + ' ' + host['last-name']"
            :name-link="'https://www.wnyc.org/'+host.url"
          />
        </li>
      </ul>
      <share-tools v-if="socialLinks" class="on-todays-show-social" label="Connect with the show!" layout="vertical">
        <share-tools-item
          v-for="(link, index) in socialLinks"
          :key="index"
          :link="link.href"
          :service="link.title"
        />
      </share-tools>
    </div>
  </div>
</template>

<script>
import whatsOnNow from '@/mixins/whatsOnNow'

export default {
  name: 'OnTodaysShow',
  components: {
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    VPerson: () => import('nypr-design-system-vue/src/components/VPerson'),
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
      socialLinks: this.$store.getters['onTodaysShow/social'],
      segmentsToShow: 3,
      hosts: this.$store.getters['onTodaysShow/hosts']
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
  margin: 0 auto;
  @include media(">medium") {
    flex-direction: row;
  }
}

.on-todays-show-person-social-wrapper[data-person-count="1"] {
  flex-direction: row;
}

.on-todays-show-person-social-wrapper[data-person-count="1"] .on-todays-show-social {
  height: 124px;
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
    max-width: 280px;
  }
  @include media(">860px") {
    flex-basis: 560px;
    align-self: center;
    max-width: 560px;
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

[data-person-count="1"] .on-todays-show-person-list {
  align-self: center;
  flex-basis: 160px;
  max-width: 160px;
  padding-bottom: 0;
  @include media(">medium") {
    align-self: left;
    flex-basis: 280px;
    max-width: 280px;
  }
}

[data-person-count="1"] .on-todays-show-social {
  align-self: center;
}

</style>
