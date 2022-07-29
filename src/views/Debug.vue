<template>
  <v-card flat>
    <v-card-title>Debug</v-card-title>
    <v-card-text>
      <v-row>
        <v-col style="overflow-y: scroll; height: 87vh">
          <p class="text-h5">Отслеживаемые квесты</p>
          <pre>
{{ trackingQuestsInElectronStore }}
          </pre>
        </v-col>
        <v-divider vertical/>
        <v-col style="overflow-y: scroll; height: 87vh">
          <p class="text-h5">Выполненые квесты</p>
          <pre>
{{ completedQuestsInElectronStore }}
          </pre>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import electronStore from 'electron-store'

const eStore = new electronStore()
export default {
  name: "Debug",
  computed: {
    trackingQuestsInElectronStore() {
      return JSON.stringify(eStore.get('player.trackingQuests'), null, 2)
    },
    completedQuestsInElectronStore() {
      return JSON.stringify(eStore.get('player.completedQuests'), null, 2)
    }
  }
}
</script>

<style scoped>

</style>
