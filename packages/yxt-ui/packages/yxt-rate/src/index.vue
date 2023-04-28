<template>
    <div class="yxt-rate-box">
        <to-rate
            v-model="rateValue"
            :colors="colors"
            :text-color="textColor"
            :score-template="scoreTemplate"
            :icon-classes="iconClasses"
            v-bind="$attrs"
        >
        </to-rate>
    </div>
</template>
<script>
import ToRate from '../../../../element-ui/packages/rate'

export default {
  name: 'YxtRate',
  components: {
    ToRate
  },
  props: {
    colors: {
      type: [Object, Array],
      default: () => {
        return { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' } || ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    iconClasses: {
      type: [Object, Array],
      default: () => {
        return { 2: 'to-icon-star-off', 4: { value: 'to-icon-star-on', excluded: true }, 5: 'to-icon-star-on' } || ['to-icon-star-off', 'to-icon-star-on', 'to-icon-star-on']
      }
    },
    textColor: {
      type: String,
      default: '#14203BB3'
    },
    scoreTemplate: {
      type: String,
      default: '{value}'
    }
  },
  data() {
    return {
      rateValue: 0.0
    }
  },
  methods: {
    setRateValue(rateValue) {
      this.rateValue = rateValue
    }
  }
}
</script>
