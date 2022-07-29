<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="1" align-self="center" align="center">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-simple-checkbox v-on="on" v-model="showCompletedQuests"/>
              </template>
              <span>Показать выполненые квесты</span>
            </v-tooltip>
          </v-col>
          <v-col>
            <c-autocomplete label="Список квестов"
                            hide-details
                            multiple
                            :items="allQuests"
                            item-text="locales.ru"
                            item-value="id"
                            return-object
                            v-model="trackingQuests"
                            @input="addQuestToTracking"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-3" v-if="!showCompletedQuests">
      <v-card-title>Отслеживаемые квесты</v-card-title>
      <v-card-text>
        <v-expansion-panels :value="openedPanels" inset multiple style="overflow-y: scroll; height: 73vh">
          <v-expansion-panel v-for="(quest, index) in trackingQuests" :key="quest.id">
            <v-expansion-panel-header>{{ quest.locales.ru }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row v-if="quest.nokappa">
                <v-col cols="4">
                  <v-alert dense type="info">Не требуется для Каппы</v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="10">
                  Цели:
                  <v-list dense>
                    <v-list-item link v-for="(obj, index) in quest.objectives" :key="obj.id" :input-value="true" :color="obj.completed? 'success': 'error'" @click="toggleObjectiveComplete(obj)">
                      {{ index + 1 }}. {{ obj.type }} {{ obj.number === 1 ? '': obj.number }} {{ getItem(obj.target) }} {{ getMap(obj.location) }} {{ obj.hint ? `(${obj.hint})`: '' }}
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                      <v-btn v-on="on" text outlined color="success" @click="markQuestComplete(quest, index)">
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </template>
                    <span>Заебись, отмучался</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                      <v-btn v-on="on" text outlined color="error" @click="removeQuestFromTracking(quest, index)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Не отслеживать</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
    <v-card class="mt-3" v-else>
      <v-card-title>Выполненые квесты</v-card-title>
      <v-card-text>
        <v-expansion-panels inset multiple>
          <v-expansion-panel v-for="(quest, index) in completedQuests" :key="quest.id">
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
                  <v-btn text outlined color="error" @click="markQuestInComplete(quest, index)">
                    <v-icon>mdi-close</v-icon>
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
import electronStore from 'electron-store'

const eStore = new electronStore()
export default {
  name: "Quests",
  watch: {
    '$store.getters.trackingQuests': {
      handler: function (value) {
        eStore.set('player.trackingQuests', value)
      },
      deep: true,
    },
    '$store.getters.completedQuests': {
      handler: function (value) {
        eStore.set('player.completedQuests', value)
      },
      deep: true,
    }
  },
  computed: {
    openedPanels() {
      return Array.apply(null, Array(this.trackingQuests.length)).map(function (x, i) { return i; })
    },
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
    completedQuests() {
      return this.$store.getters.completedQuests
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
    showCompletedQuests: false,
  }),
  methods: {
    toggleObjectiveComplete(objective) {
      if (objective.completed === undefined) {
        this.$set(objective, 'completed', true)
        return
      }
      objective.completed = !objective.completed
    },
    markQuestInComplete(quest, index) {
      quest.completed = false
      this.$store.commit('removeQuestFromCompleted', {quest, index})
    },
    markQuestComplete(quest, index) {
      quest.completed = true
      this.$store.commit('removeQuestFromTracking', {quest, index})
      this.$store.commit('markQuestComplete', quest)
    },
    removeQuestFromTracking(quest, index) {
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
