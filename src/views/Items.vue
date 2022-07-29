<template>
  <div>
    <v-card flat>
      <v-card-text>
        <c-autocomplete label="Список предметов"
                        hide-details
                        multiple
                        :items="allItems"
                        item-text="shortName"
                        item-value="id"
                        return-object
                        @input="addItemToTracking"
        />
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-card-title>Отслеживаемые предметы</v-card-title>
      <v-card-text>
        <v-row v-for="(item, index) in trackingItems" :key="item.id">
          <v-col cols="1">
            <v-avatar size="64">
              <v-img :src="`https://assets.tarkov.dev/${item.id}-icon.jpg`"/>
            </v-avatar>
          </v-col>
          <v-col cols="2" align-self="center">
            <p class="text-h5">{{ item.shortName }}</p>
          </v-col>
          <v-col>
            <c-text-field label="Надо" type="number" min="1" v-model.number="item.neededNumber"/>
          </v-col>
          <v-col>
            <c-text-field label="Найдено" type="number" min="1" v-model.number="item.findedNumber"/>
          </v-col>
          <v-col cols="2">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" text outlined color="success" @click="markItemComplete(item, index)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Заебись, отмучался</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" text outlined color="error" @click="removeItemFromTracking(item, index)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>Не отслеживать</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import electronStore from 'electron-store'

const eStore = new electronStore()
export default {
  name: "Items",
  watch: {
    '$store.getters.trackingItems': {
      handler: function (value) {
        eStore.set('player.trackingItems', value)
      },
      deep: true,
    }
  },
  computed: {
    allItems() {
      return Object.values(this.$store.getters.items)
    },
    trackingItems() {
      return this.$store.getters.trackingItems
    }
  },
  methods: {
    removeItemFromTracking() {

    },
    markItemComplete() {

    },
    addItemToTracking(itemsArray) {
      this.$store.commit('setTrackingItems', itemsArray)
    }
  }
}
</script>

<style scoped>

</style>
