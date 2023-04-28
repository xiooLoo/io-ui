<template>
  <div class="to-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`to-collapse-content-${id}`"
      :aria-describedby ="`to-collapse-content-${id}`"
    >
      <div
        class="to-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`to-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="to-collapse-item__arrow to-icon-arrow-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <to-collapse-transition>
      <div
        class="to-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`to-collapse-head-${id}`"
        :id="`to-collapse-content-${id}`"
      >
        <div class="to-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </to-collapse-transition>
  </div>
</template>
<script>
  import ToCollapseTransition from '../../../src/transitions/collapse-transition';
  import Emitter from '../../../src/mixins/emitter';
  import { generateId } from '../../../src/utils/util';

  export default {
    name: 'ToCollapseItem',

    componentName: 'ToCollapseItem',

    mixins: [Emitter],

    components: { ToCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false,
        id: generateId()
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      },
      disabled: Boolean
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      }
    },

    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        if (this.disabled) return;
        this.dispatch('ToCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('ToCollapse', 'item-click', this);
      }
    }
  };
</script>
