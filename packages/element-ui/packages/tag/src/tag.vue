<script>
  export default {
    name: 'ToTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String,
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1;
        }
      }
    },
    methods: {
      handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },
    render(h) {
      const { type, tagSize, hit, effect } = this;
      const classes = [
        'to-tag',
        type ? `to-tag--${type}` : '',
        tagSize ? `to-tag--${tagSize}` : '',
        effect ? `to-tag--${effect}` : '',
        hit && 'is-hit'
      ];
      const tagTo = (
        <span
          class={ classes }
          style={{ backgroundColor: this.color }}
          on-click={ this.handleClick }>
          { this.$slots.default }
          {
            this.closable && <i class="to-tag__close to-icon-close" on-click={ this.handleClose }></i>
          }
        </span>
      );

      return this.disableTransitions ? tagTo : <transition name="to-zoom-in-center">{ tagTo }</transition>;
    }
  };
</script>
