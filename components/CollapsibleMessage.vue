<template>
  <div class="collapsible-message-container">
    <div
      v-show="isOpen"
      class="collapsible-message is-open"
    >
      <div class="collapsible-message-message">
        <slot />
      </div>
      <v-button class="toggle-button button" @click="collapse">
        <dropdown-icon />
      </v-button>
    </div>
    <div
      v-show="!isOpen"
      class="collapsible-message is-collapsed"
    >
      <v-button class="toggle-button button" @click="open">
        ?
      </v-button>
    </div>
  </div>
</template>
<script>
const messageCookie = '__message'
const oneMonth = 60 * 60 * 24 * 31
export default {
  name: 'CollapsibleMessage',
  props: {
    prefix: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isOpen: true
    }
  },
  computed: {
    collapsedCookie () {
      return this.prefix + messageCookie
    }
  },
  beforeMount () {
    this.wasDismissed = this.$cookies.get(this.collapsedCookie)
    if (this.wasDismissed) {
      this.isOpen = false
      this.$cookies.set(this.collapsedCookie, 'true', { path: '/', maxAge: oneMonth })
    }
  },
  methods: {
    collapse () {
      this.$emit('collapse')
      this.isOpen = false
      this.$cookies.set(this.collapsedCookie, 'true', { path: '/', maxAge: oneMonth })
    },
    open () {
      this.$emit('open')
      this.isOpen = true
      this.$cookies.remove(this.collapsedCookie, { path: '/' })
    }
  }
}

</script>
<style lang="scss">
  .collapsible-message-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
  .collapsible-message {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    min-height: 48px;
    width: 100%
    background: RGB(var(--color-banana-yellow));
    padding: 12px 12px;
    font-size: var(--font-size-2);
    line-height:  var(--line-height-2);
  }

  .collapsible-message-container .collapsible-message .button {
    min-width: 32px;
    color: RGB(var(--color-dark-grey));
    background: RGB(var(--color-banana-yellow));
    padding: 0;
    font-size: 12px;
    & svg > path {
      fill: RGB(var(--color-dark-gray));
    }
  }

  .collapsible-message-container .collapsible-message.is-collapsed {
    padding: 0;
    min-height: 32px;
    width: 32px;
    .button {
      height: 32px;
    }
  }

</style>
