<template>
  <div>
    <div class="l-container l-wrap l-container--14col">
      <v-spacer size="quad" />
      <header class="c-basic__header u-spacing">
        <h1 class="c-basic__heading o-3d-heading">
          Staff
        </h1>
      </header>
      <v-spacer size="quad" />
      <staff-card
        v-for="(person, index) in staff"
        :key="index"
        :name="person.name"
        :title="person.title"
        :article-link="'/staff/' + person.slug"
        :image="person.image"
        :description="person.bio"
        class="u-space--double--bottom"
      >
        <share-tools>
          <share-tools-item
            v-for="(value, key, shareToolsIndex) in person.contact"
            :key="shareToolsIndex"
            :service="key"
            :username="value"
          />
        </share-tools>
      </staff-card>
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'
import staffData from '@/scripts/staff.json'

export default {
  name: 'StaffPage', // this is the template name which is used for GTM
  components: {
    StaffCard: () => import('../components/StaffCard'),
    ShareTools: () =>
      import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () =>
      import('nypr-design-system-vue/src/components/ShareToolsItem'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [gtm],
  data () {
    return {
      staff: staffData
    }
  }
}
</script>
