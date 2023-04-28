<template>
  <div>
    <codemirror
      ref="myCm"
      :options="cmOptions"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      @changes="onCmCodeChanges"
      @keydown.native="onKeyDown"
      @mousedown.native="onMouseDown"
    ></codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/idea.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
export default {
  name: 'YxtCodemirror',
  components: {
    codemirror
  },
  props: ['value'],
  data() {
    return {
      editor: null,
      codemirror: '',
      timer: null,
      cmOptions: {
        theme: 'idea',
        mode: 'text/x-mysql',
        readOnly: false,
        line: true,
        tabSize: 4, // 制表符
        indentUnit: 2, // 缩进位数
        lineNumbers: true,
        lineWiseCopyCut: true,
        viewportMargin: 1000,
        autofocus: true,
        autocorrect: true,
        spellcheck: true,
        specialChars: /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,
        extraKeys: { Tab: 'autocomplete' },
        lint: false,
        maxHighlightLength: Infinity,
        // 代码折叠
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        lineWrapping: false,
        foldGutter: true, // 启用行槽中的代码折叠
        autoCloseBrackets: true, // 自动闭合符号
        autoCloseTags: true,
        matchTags: { bothTags: true },
        matchBrackets: true, // 在光标点击紧挨{、]括号左、右侧时，自动突出显示匹配的括号 }、]
        styleSelectedText: true,
        styleActiveLine: true, // 当前背景行高亮
        autoRefresh: true,
        highlightSelectionMatches: {
          minChars: 2,
          trim: true,
          style: 'matchhighlight',
          showToken: false
        },
        hintOptions: {
          completeSingle: false
        }
      }
    }
  },
  methods: {
    resetLint() {
      if (!this.$refs.myCm.codemirror.getValue()) {
        this.$nextTick(() => {
          this.$refs.myCm.codemirror.setOption('lint', false)
        })
        return
      }
      this.$refs.myCm.codemirror.setOption('lint', false)
      this.$nextTick(() => {
        this.$refs.myCm.codemirror.setOption('lint', true)
      })
    },
    // 按下键盘事件处理函数
    onKeyDown(event) {
      const keyCode = event.keyCode || event.which || event.charCode
      const keyCombination = event.ctrlKey || event.altKey || event.metaKey
      if (!keyCombination && keyCode > 64 && keyCode < 123) {
        this.$refs.myCm.codemirror.showHint({ completeSingle: false })
      }
    },
    // 按下鼠标时事件处理函数
    onMouseDown() {
      this.$refs.myCm.codemirror.closeHint()
    },
    // 向父级组件发送事件
    sendsql() {
      this.timer = setTimeout(() => {
        let cm = this.$refs.myCm.codemirror
        this.$emit('onchangecode', cm.getValue())
      }, 500)
    },
    onCmCodeChanges(cm) {
      this.editorValue = cm.getValue()
      this.resetLint()
      if (!this.timer) {
        this.sendsql()
      } else {
        clearTimeout(this.timer)
        this.sendsql()
      }
    }
  },
  created() {
    try {
      if (!this.value) {
        this.cmOptions.lint = false
      }
    } catch (e) {
      // console.log(`初始化codemirror出错${e}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.CodeMirror-hints {
  z-index: 9999 !important;
}
</style>
