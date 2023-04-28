<template>
  <transition name="to-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="to-autocomplete-suggestion to-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <to-scrollbar
        tag="ul"
        wrap-class="to-autocomplete-suggestion__wrap"
        view-class="to-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="to-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </to-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from '../../../src/utils/vue-popper';
  import Emitter from '../../../src/mixins/emitter';
  import ToScrollbar from '../../../packages/scrollbar';

  export default {
    components: { ToScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'ToAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('ToAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
      this.referenceList = this.$el.querySelector('.to-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
