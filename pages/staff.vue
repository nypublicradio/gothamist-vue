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
      <div class="o-rte-text u-spacing l-container">
        <h3>
          Contributors
        </h3>
        <ul>
          <li>Scott Lynch</li>
          <li>Claire Lampen</li>
          <li>Tod Seelie</li>
          <li>Sai Mokhtari</li>
          <li>David “Dee” Delgado</li>
          <li>Gretchen Robinette</li>
          <li>Navid Baraty</li>
          <li>Neil de Mause</li>
          <li>Ross Barkan</li>
          <li>Caroline Lewis</li>
        </ul>
        <h3>
          Alumni
        </h3>
        <p>
          Gothamist owes its existence to the dozens of dedicated reporters, bloggers, editors, programmers, designers, and sales and operations staff who have worked on the site since 2003, including: Neil Epstein, David Jacobs, Brooke Storm, Tien Mao, Garth Johnston, and Nell Casey.
        </p>
        <h3>
          Digital Team
        </h3>
        <p>
          Many people on the digital team at New York Public Radio are thrilled to have the chance to work on the next generation of Gothamist, including Kate Statton, Laura Galbraith, Brian Whitton, Mike Hearn, Brad Kammin, Kelly Suitor, Matt Walsh, Sean Zimmer, Nicolas Castro, Valentina Powers, Chris Hardtman, Jim Jazweicki, Freyja Balmer, and Nate Landau.
        </p>
        <h3>
          Animals
        </h3>
        <ul>
          <li><a href="https://instagram.com/goosetheblacklab">Goose Stern</a></li>
          <li><a href="https://www.instagram.com/p/BrvMKN0ltdc/">Madison Wilkins</a></li>
          <li><a href="https://www.instagram.com/p/BvlSiaxJEAz/">Claire Wilkins</a></li>
          <li><a href="https://www.instagram.com/p/Bxa3b7QJsLi/">Sadie Wilkins</a></li>
          <li><a href="https://www.instagram.com/p/Bn1YExFFNfQ/">Teekay Clayman-Yakas</a></li>
          <li>Honorable Mention: <a href="https://www.instagram.com/p/BhzEd6fB9lK/">Fozzie Chung</a></li>
          <li>RIP: Travis Wilkins, Thompson Dobkin, Curtis Wilkins, Bodie Whitton</li>
        </ul>
      </div>
      <div
        class="u-space--double--bottom"
      />
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
