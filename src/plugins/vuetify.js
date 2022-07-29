import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { Ripple } from 'vuetify/lib/directives'
import { VTextField, VBtn, VAutocomplete } from 'vuetify/lib'

Vue.use(Vuetify, {
  directives: {
    Ripple
  },
  icons: {
    iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})

// prefix "C" means custom
Vue.component('CTextField', {
  extends: VTextField,
  props: {
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
  }
})

Vue.component('CBtnSuccess', {
  extends: VBtn,
  props: {
    text: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'success',
    }
  }
})

Vue.component('CBtnError', {
  extends: VBtn,
  props: {
    text: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'error',
    }
  }
})

Vue.component('CAutocomplete', {
  extends: VAutocomplete,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
  }
})

export default new Vuetify({

});
