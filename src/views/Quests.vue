<template>
  <div>
    <v-card flat>
      <v-card-text>
        <c-autocomplete label="Список квестов"
                        hide-details
                        multiple
                        :items="allQuests"
                        item-text="locales.ru"
                        item-value="id"
                        return-object
                        v-model="trackingQuests"
                        @input="addQuestToTracking"/>
      </v-card-text>
    </v-card>
    <v-card class="mt-3" v-if="trackingQuests.length">
      <v-card-title>Отслеживаемые квесты</v-card-title>
      <v-card-text>
        <v-expansion-panels inset multiple>
          <v-expansion-panel v-for="(quest, index) in trackingQuests" :key="quest.id">
            <v-expansion-panel-header>{{ quest.locales.ru }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="10">
                  Цели:
                  <v-list dense>
                    <v-list-item link v-for="(obj, index) in quest.objectives" :key="obj.id">
                      {{ index + 1 }}. {{ obj.type }} {{ obj.number === 1 ? '': obj.number }} {{ getItem(obj.target) }} {{ getMap(obj.location) }}
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col>
                  <v-btn text outlined color="success" @click="markQuestComplete(quest, index)">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {differenceBy} from "lodash"
export default {
  name: "Quests",
  computed: {
    allQuests() {
      return differenceBy(this.$store.getters.quests, this.$store.getters.completedQuests, 'id')
    },
    allItems() {
      return this.$store.getters.items
    },
    allMaps() {
      return this.$store.getters.maps
    },
    allTraders() {
      return this.$store.getters.traders
    },
    trackingQuests: {
      get: function () {
        return this.$store.getters.trackingQuests
      },
      set: function (value) {
        this.$store.commit('setTrackingQuests', value)
      }
    }
  },
  data: () => ({

  }),
  methods: {
    markQuestComplete(quest, index) {
      quest.completed = true
      this.$store.commit('removeQuestFromTracking', {quest, index})
    },
    addQuestToTracking(questsArray) {
      this.$store.commit('setTrackingQuests', questsArray)
    },
    getItem(id) {
      const item = this.allItems[id]
      if (item) return item.shortName
      return id
    },
    getMap(id) {
      const item = Object.values(this.allMaps).find(m => m.id === id)
      if (item) return `на карте ${item.locale.ru}`
      return `на любой локации`
    },
    getTrader(id) {
      const item = this.allTraders[id]
      if (item) return item.locale.ru
      return `любому продавцу`
    },
  }
}
</script>

<style scoped>

</style>
