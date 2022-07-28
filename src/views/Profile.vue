<template>
  <v-card flat>
    <v-card-title>Профиль игрока {{ player.nickname }}</v-card-title>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    player() {
      return this.$store.getters.player
    },
    levelGroup() {
      return this.$store.getters.levelGroup
    },
  },
}
</script>

<style scoped>

</style>
