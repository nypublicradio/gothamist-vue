export default {
  methods: {
    updateWhatsOnNow () {
      // set the persistent player to auto play
      this.$store.commit(
        'global/setAutoPlay', true
      )
      // update what's on now in the store
      this.$store.commit(
        'whatsOnNow/set',
        {
          image: 'https://media.wnyc.org/i/258/258/l/85/2020/06/AllOfIt.png',
          title: 'All Of It 2222',
          titleLink: 'http://www.google.com',
          details: 'This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.',
          detailsLink: 'http://www.bing.com',
          time: '3:00 PM - 4:00 PM',
          station: 'WNYC 93.9 FM',
          file: 'https://www.liberliber.it/mediateca/musica/g/gershwin/rhapsody_in_blue/mp3/gershwin_rhapsody_in_blue_bl_01.mp3'
        }
      )
    }
  }
}
