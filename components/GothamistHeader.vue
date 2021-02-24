<template>
  <div>
    <the-header
      :donate-url="$store.getters['global/donateUrl']"
      class="u-color-group-dark"
    >
      <template v-slot:logo>
        <a
          href="/"
        >
          <gothamist-logo title="Gothamist" />
          <gothamist-logo-stacked
            v-if="isHomepage"
            title="Gothamist"
          />
        </a>
      </template>
      <template v-slot:navigation>
        <div>
          <secondary-navigation
            orientation="horizontal"
            :nav-items="$store.getters['global/headerNav']"
          />
        </div>
      </template>
      <template v-slot:search>
        <search-icon class="u-icon--xs" />
        <div v-if="searchIsActive">
          <v-search />
        </div>
      </template>
      <template v-slot:menu>
        <div>
          <the-menu
            class="not-fixed u-color-group-dark"
            :primary-nav="$store.getters['global/headerNav']"
            :secondary-nav="$store.getters['global/footerNav']"
          >
            <template v-slot:logo>
              <gothamist-logo />
            </template>
            <template v-slot:button>
              <div>
                <v-button
                  href="http://www.google.com"
                  class="c-main-header__donate"
                  label="Donate"
                />
              </div>
            </template>
            <template v-slot:component>
              <v-button
                href="mailto:tips@gothamist.com"
                label="Send Us A Story Idea"
                class="send-story"
              />
            </template>
            <template v-slot:search>
              <div>
                <v-search action="/search" />
              </div>
            </template>
            <template v-slot:social>
              <div>
                <share-tools label="Follow Us">
                  <share-tools-item
                    service="facebook"
                    username="gothamist"
                  />
                  <share-tools-item
                    service="twitter"
                    username="gothamist"
                  />
                  <share-tools-item
                    service="instagram"
                    username="gothamist"
                  />
                  <share-tools-item
                    service="youtube"
                    username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
                  />
                </share-tools>
              </div>
            </template>
          </the-menu>
        </div>
      </template>
    </the-header>
  </div>
</template>

<script>
export default {
  name: 'GothamistHeader',
  components: {
    SecondaryNavigation: () => import('nypr-design-system-vue/src/components/SecondaryNavigation'),
    TheHeader: () => import('nypr-design-system-vue/src/components/TheHeader'),
    GothamistLogo: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogo'),
    GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    SearchIcon: () => import('nypr-design-system-vue/src/components/icons/SearchIcon'),
    VSearch: () => import('nypr-design-system-vue/src/components/VSearch'),
    TheMenu: () => import('nypr-design-system-vue/src/components/TheMenu'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem')
  },
  data () {
    return {
      searchIsActive: false,
      isHomepage: false
    }
  }
}
</script>

<style lang="scss">
.c-side-menu {
  margin-right: var(--space-3);
}

.c-side-menu .menu-hamburger {
  width: 16px;
}

.menu .menu-logo {
  margin: auto;
  width: 180px;
}

.menu .menu-primary-navigation .c-secondary-nav__item,
.menu .menu-secondary-navigation .c-secondary-nav__item {
  margin-bottom: var(--space-4);
  padding-left: 0;

  &::after {
    display: none;
  }

  &:last-of-type a::before {
    display: none;
  }
}

.menu .menu-primary-navigation .c-secondary-nav__link {
  border-bottom: 2px dotted RGB(var(--color-banana-yellow));
  color: RGB(var(--color-banana-yellow));
  display: inline-block;
  padding-bottom: 2px;
  font-size: var(--font-size-9);
  line-height: 1;

  &:hover {
    color: RGB(var(--color-white));
    background-color: RGB(var(--color-reddish-orange));
  }
}

.menu .menu-secondary-navigation .c-secondary-nav__link {
  color: RGB(var(--color-white));
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 2px dotted RGB(var(--color-white));
  text-transform: uppercase;
  font-family: var(--font-family-small) !important;
  letter-spacing: var(--letter-spacing-small) !important;
  line-height: var(--line-height-3);
  font-weight: var(--font-weight-small) !important;
  font-size: var(--font-size-4) !important;
  margin: 0 var(--space-3);

  &:hover {
    color: RGB(var(--color-white));
    background-color: RGB(var(--color-reddish-orange));
  }
}

.menu .menu-secondary-navigation .c-secondary-nav__item {
  display: inline-block;
}

.menu .menu-panel .menu-copyright {
  font-family: var(--font-family-small);
  letter-spacing: var(--letter-spacing-small);
  font-weight: var(--font-weight-small);
  line-height: var(--line-height-1);
  font-size: var(--font-size-2);
}

.menu .menu-panel .menu-terms-links a {
  color: RGB(var(--color-banana-yellow));
  text-decoration: none;
  text-transform: uppercase;
  padding: 8px 0;
  line-height: var(--line-height-1);
  font-size: var(--font-size-2);
  font-family: var(--font-family-small);
  letter-spacing: var(--letter-spacing-small);
  font-weight: var(--font-weight-small);
}

.menu .menu-button .button,
.menu .menu-button .send-story {
  max-width: 310px;
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.menu .menu-button .button .button-label,
.menu .menu-button .send-story .button-label {
  font-size: var(--font-size-6);
}

.menu .menu-search .search-bar {
  margin: 0 auto var(--space-4) !important;
}

.menu .menu-panel .search-bar .button {
  background-color: RGB(var(--color-banana-yellow));

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
    transform: none;

    &::before {
      display: none;
    }
  }
}

.menu .menu-button .send-story {
}
</style>
