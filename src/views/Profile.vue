<template>
  <div>
    <v-card flat>
      <v-card-title>Профиль игрока {{ player.nickname }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col align="center" align-self="center">
            <v-icon size="50">mdi-exit-run</v-icon>
            <p class="text-h6">154 рейдов</p>
          </v-col>
          <v-col align="center" align-self="center">
            <v-icon size="50" color="success">mdi-thumb-up</v-icon>
            <p class="text-h6">34 выживаний</p>
          </v-col>
          <v-col align="center" align-self="center">
            <v-icon size="50" color="error">mdi-skull</v-icon>
            <p class="text-h6">52 смертей</p>
          </v-col>
          <v-col align="center" align-self="center">
            <v-icon size="50" color="error">mdi-account-question</v-icon>
            <p class="text-h6">23 без вести</p>
          </v-col>
          <v-col align="center" align-self="center">
            <v-icon size="50" color="orange">mdi-thumb-down</v-icon>
            <p class="text-h6">6 покинуто</p>
          </v-col>
          <v-col align="center" align-self="center">
            <v-icon size="50" color="white">mdi-skull-scan</v-icon>
            <p class="text-h6">72 убийств</p>
          </v-col>
          <v-col align="center" align-self="center">
            <v-icon size="50" color="white">mdi-clock</v-icon>
            <p class="text-h6">51ч в сети</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center" align-self="center">
            <p class="text-h4">12</p>
            <p class="text-h6">пробежек</p>
          </v-col>
          <v-col align="center" align-self="center">
            <p class="text-h4">22%</p>
            <p class="text-h6">Коэф. выживания</p>
          </v-col>
          <v-col align="center" align-self="center">
            <p class="text-h4">12:54</p>
            <p class="text-h6">Среднее время жизни</p>
          </v-col>
          <v-col align="center" align-self="center">
            <p class="text-h4">2</p>
            <p class="text-h6">Макс. выживаний подряд</p>
          </v-col>
          <v-col align="center" align-self="center">
            <p class="text-h4">3%</p>
            <p class="text-h6">Коэф. покидания</p>
          </v-col>
          <v-col align="center" align-self="center">
            <p class="text-h4">1.38</p>
            <p class="text-h6">K/D</p>
          </v-col>
          <v-col align="center" align-self="center">
            <p class="text-h4">4мес</p>
            <p class="text-h6">Общее время жизни</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card flat class="mt-3">
      <v-card-title>Опасная зона</v-card-title>
      <v-card-text>
        <c-btn-error @click="deletePlayer">Удалить всю информацию</c-btn-error>
      </v-card-text>
    </v-card>
  </div>
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
  methods: {
    deletePlayer() {
      if (confirm('Ты хорошо подумал? Функция подрозумевает удаление информации перед/после вайпа')) {
        this.$store.commit('deletePlayer')
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>

</style>
