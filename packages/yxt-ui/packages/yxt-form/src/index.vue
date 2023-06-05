
<template>
  <div :class="['yxt-form', cardStyle? 'card-style':'']" >
  <!-- <div :class="['yxt-form', cardStyle? 'card-style':'']" :style="{minWidth:  CONST_MIN_WIDTH }"> -->
    <to-form
      ref="ruleForm"
      :model="formKey"
      status-icon
      :label-width="labelWidth"
      class="yxt-rule-form"
      :label-position="labelPosition"
      :disabled="isFormDisabled"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <to-row
        :gutter="gutter"
        class="my-form-upload-row"
        :class="{ 'form-diy-setting': !isInline, 'my-form-upload-row-cardStyle': !cardStyle }"
        justify="end"
      >
        <to-col v-for="(item, index) in formItems" :key="index + 'item.type'" :span="cmpSpan(item)" :style="{ display: item.hidden ? 'none' : index < count ? 'block' : item.isAlwaysShow ? 'block' : 'none' }">
          <template v-if="item.isscope">
            <to-form-item :prop="item.id" :rules="item.rules">
              <span slot="label">{{ (item.type==='divider' || item.type === 'divider-noborder' || item.isSurfixLabel) ? item.label : (item.label + '：') }}</span>
              <slot :name="item.id"></slot>
            </to-form-item>
          </template>
          <template v-else>
            <template v-if="item.type === 'divider'">
              <!-- <p :id="item.id" class="divider-line" :style="{ color: item.style && item.style.color || '#606266', fontSize: item.style && item.style.fontSize || '16px' }">{{ item.prefixContent }}</p> -->
            </template>
            <template v-if="item.type === 'divider-noborder'">
              <p :id="item.id" class="divider-line-noborder" :style="{ color: item.style && item.style.color || '#606266', fontSize: item.style && item.style.fontSize || '16px' }">{{ item.prefixContent }}</p>
            </template>
            <to-form-item :prop="item.id" :rules="item.rules" :label="(item.type==='divider' || item.type === 'divider-noborder' || item.isSurfixLabel) ? item.label : (item.label + '：')" :class="item.type==''?'line-after':''">
              <!-- 给label添加to-tooltip提示框，label后线条展示type为空展示line-after类 -->
              <span slot="label">{{ (item.type==='divider' || item.type === 'divider-noborder' || item.isSurfixLabel) ? item.label : (item.label + '：') }}<to-tooltip v-if="item.tipsContent && item.tipsIcon" :content="item.tipsContent" placement="top">
                <yxt-icon :icon="item.tipsIcon"></yxt-icon>
                    </to-tooltip>
              </span>
              <to-input
                v-if="item.type === 'input'"
                v-model.trim="formKey[item.id]"
                :type="item.inputType"
                :rows="item.rows"
                :maxlength="item.maxlength"
                :clearable="item.clearable"
                :show-password="item.inputType === 'password'"
                auto-complete="new-password"
                :placeholder="item.placeholder || `请输入${item.label}`"
                :disabled="item.disabled"
                :readonly="item.readonly"
              >
                <template slot="append">
                  <to-button v-if="item.appendIcon"  :icon="item.appendIcon" @click="handleAppendIcon(item)"></to-button>
                  <span v-if="item.appendText">{{item.appendText}}</span>
                </template>
              </to-input>
              <to-input
                v-else-if="item.type === 'textarea'"
                v-model="formKey[item.id]"
                :autosize="{
                  minRows: item.minRows,
                  maxRows: item.maxRows || 9,
                }"
                :type="item.inputType"
                :rows="item.rows"
                :maxlength="item.maxlength"
                :clearable="item.clearable"
                show-word-limit
                :placeholder="
                item.placeholder ? item.placeholder : `请输入${item.label}`
                "
                :disabled="item.disabled"
              />
              <to-select
                v-else-if="item.type === 'select'"
                v-model="formKey[item.id]"
                :type="item.inputType"
                :filterable="item.filterable"
                :filter-method="item.filterType == 'custom' ? filterMethod : null"
                :remote="item.remote || false"
                :remote-method="(query) => remoteMethod(query, item, index)"
                :clearable="item.clearable"
                :multiple="item.multiple"
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                :disabled="item.disabled"
                v-bind="$attrs"
                @change="e => handleSelectChange(e, item)"
              >
                <to-option
                v-for="itm in item.arr"
                :key="itm.value"
                :label="itm.label"
                :value="itm.value"
                :disabled="itm.disabled">{{ itm.label }}</to-option>
              </to-select>
              <to-date-picker
                v-else-if="['date', 'datetime', 'dates', 'year', 'month', 'week', 'daterange', 'monthrange', 'datetimerange'].includes(item.type)"
                v-model="formKey[item.id]"
                :clearable="item.clearable"
                :type="item.type"
                :value-format="item.valueFormat"
                :format="item.format"
                :range-separator="item.rangeSeparator"
                :placeholder="item.placeholder"
                :start-placeholder="item.startPlc"
                :end-placeholder="item.endPlc"
                :default-time="item.defaultTime"
                :default-value="item.defaultValue"
                :default-date="item.defaultDate"
                :picker-options="item.pickerOptions"
                :editable="item.editable"
                :disabled="item.disabled"
                style="width: 100%"
                @change="changeDatePicker(item)"
              />
              <to-time-picker
                v-else-if="item.type === 'timeRange'"
                v-model="formKey[item.id]"
                :picker-options="item.options"
                placeholder="请在范围内选择时间"
                style="width: 100%"
                :disabled="item.disabled"
              />
              <DateShortcut  v-if="item.type === 'dateShortcut'" :isDefault="item.isDefault" :dateArry="item.dateArry" @callBack="handleDateShortCutChange"/>
              <div v-else-if="item.type === 'switch'" style="position: absolute;">
                <to-switch v-model="formKey[item.id]" :disabled="item.disabled" />
              </div>
              <to-checkbox-group
                v-else-if="item.type === 'checkbox'"
                v-model="formKey[item.id]"
                style="display:flex;flex-flow: row wrap;"
                @change="changeCheckBox(item.id, item)"
                :disabled="item.disabled"
              >
                <to-checkbox
                  v-for="itm in item.arr"
                  :key="itm.value"
                  :label="itm.value"
                  :value="itm.value"
                  :disabled="itm.disabled"
                >{{ itm.label }}</to-checkbox>
              </to-checkbox-group>
              <to-radio-group
                v-else-if="item.type === 'radio'"
                v-model="formKey[item.id]"
                @change="v => handleRadioChange(v, item)"
                style="display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center;height:40px;line-height:40px"
                :disabled="item.disabled"
              >
                <to-radio v-for="itm in item.arr" :key="itm.value" :label="itm.value">{{ itm.label }}</to-radio>
              </to-radio-group>
              <to-radio-group
                v-else-if="item.type === 'radioButton'"
                v-model="formKey[item.id]"
                @change="v => handleRadioChange(v, item)"
                style="display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center;height:40px;line-height:40px"
                :disabled="item.disabled"
              >
                <to-radio-button v-for="itm in item.arr" :key="itm.value" :label="itm.value">{{ itm.label }}</to-radio-button>
              </to-radio-group>
              <to-input-number
                v-else-if="item.type === 'inputNumber'"
                v-model="formKey[item.id]"
                :min="item.min || 1"
                :max="item.max || 10"
                label="描述文字"
                :disabled="item.disabled"
                :controls-position="item.position || 'left'"
                v-bind="item"
                :placeholder="item.placeholder"
              />
              <to-form-item class="betwItem-form" v-else-if="item.type === 'betwItem'" :prop="item.betws[0].id + '/' + item.betws[1].id">
                <to-col :span="item.betws[0].span" class="betw-input-cola">
                  <to-select
                    v-if="item.betws[0].type === 'select'"
                    v-model="formKey[item.betws[0].id]"
                    :multiple="item.betws[0].multiple"
                    :clearable="item.clearable"
                    :placeholder="item.betws[0].placeholder"
                    :style="{width: item.betws[0].width || '100%'}"
                    :filterable="item.betws[0].filterable"
                    :filter-method="item.betws[0].filterType == 'custom' ? filterMethod : null"
                    :disabled="item.betws[0].disabled"
                    @change="e => handleSelectChange(e, item.betws[0])"
                  >
                    <to-option v-for="itm in item.betws[0].arr" :key="itm.value" :label="itm.label" :value="itm.value">{{ itm.label }}</to-option>
                  </to-select>
                </to-col>
                <to-col class="split-v" :span="1">&nbsp;</to-col>
                <to-col :span="item.betws[1].span" class="betw-input-colb">
                  <to-select
                    v-if="item.betws[1].type === 'select'"
                    v-model="formKey[item.betws[1].id]"
                    :multiple="item.betws[1].multiple"
                    :clearable="item.clearable"
                    :placeholder="item.betws[1].placeholder"
                    :style="{width: item.betws[1].width || '100%'}"
                    :filterable="item.betws[1].filterable"
                    :filter-method="item.betws[1].filterType == 'custom' ? filterMethod : null"
                    :disabled="item.betws[1].disabled"
                    @change="e => handleSelectChange(e, item.betws[1])"
                  >
                    <to-option v-for="itm in item.betws[1].arr" :key="itm.value" :label="itm.label" :value="itm.value">{{ itm.label }}</to-option>
                  </to-select>
                </to-col>
              </to-form-item>
              <to-form-item class="betwItem-form" v-else-if="item.type === 'betwInput'" :prop="item.betws[0].id + '/' + item.betws[1].id">
                  <to-col :span="item.betws[0].span" class="betw-input-cola">
                    <to-input
                      v-if="item.betws[0].type === 'input'"
                      v-model.trim="formKey[item.betws[0].id]"
                      size="small"
                      :type="item.betws[0].inputType"
                      :show-password="item.betws[0].inputType === 'password'"
                      :placeholder="item.betws[0].placeholder"
                      class="betw-input-sp"
                    />
                  </to-col>
                  <to-col class="line" :span="1" style="text-align:center;padding:0;">-</to-col>
                  <to-col :span="item.betws[1].span" class="betw-input-colb">
                    <to-input
                      v-if="item.betws[1].type === 'input'"
                      v-model.trim="formKey[item.betws[1].id]"
                      size="small"
                      :type="item.betws[1].inputType"
                      :show-password="item.betws[1].inputType === 'password'"
                      :placeholder="item.betws[1].placeholder"
                      class="betw-input-sp"
                    />
                  </to-col>
                  <to-col class="line sufix" :span="2">{{ item.sufix }}</to-col>
              </to-form-item>
              <to-form-item class="betwItem-form" v-else-if="item.type === 'surfixBtn'" :prop="item.betws[0].id + '/' + item.betws[1].id">
                <to-col :span="item.betws[0].span" :class="item.betws[0].type === 'upload'?'betw-input-cola-upload':'betw-input-cola'">
                  <to-select
                    v-if="item.betws[0].type === 'select'"
                    v-model="formKey[item.betws[0].id]"
                    :multiple="item.betws[0].multiple"
                    :placeholder="item.betws[0].placeholder"
                    :style="{width: item.betws[0].width || '100%'}"
                    :filterable="item.betws[0].filterable"
                    :filter-method="item.betws[0].filterType == 'custom' ? filterMethod : null"
                    :disabled="item.betws[0].disabled"
                    @change="e => handleSelectChange(e, item.betws[0])"
                  >
                    <to-option v-for="itm in item.betws[0].arr" :key="itm.value" :label="itm.label" :value="itm.value">{{ itm.label }}</to-option>
                  </to-select>
                  <to-input
                    v-else-if="item.betws[0].type === 'input'"
                    v-model.trim="formKey[item.betws[0].id]"
                    :type="item.betws[0].inputType"
                    :rows="item.betws[0].rows"
                    :maxlength="item.betws[0].maxlength"
                    :clearable="item.betws[0].clearable"
                    :show-password="item.betws[0].inputType === 'password'"
                    :placeholder="item.betws[0].placeholder?item.betws[0].placeholder:`请输入${item.betws[0].label}`"
                    :disabled="item.betws[0].disabled"
                    :readonly="item.betws[0].readonly"
                  />
                  <!-- surfixBtn类型扩展文件上传组件和button组件显示 -->
                  <YxtUpload
                  v-else-if="item.betws[0].type === 'upload'"
                  :action="item.betws[0].uploadPath"
                  :payload="item.betws[0].uploadList"
                  :events="uploadEvents"
                  :limit="item.betws[0].limit || 1"
                  :multiple="item.betws[0].multiple || false"
                  :headers="item.betws[0].headers"
                  :type="item.betws[0].uptype"
                  :showFileList="item.betws[0].showFileList"
                  :fileList="item.betws[0].fileList"
                >
                <to-button
                @click="handleBtnAction(item.betws[0])"
                    :type="item.betws[0].btn.type"
                    :size="item.betws[0].btn.size || 'mini'"
                    :class="item.betws[0].btn.type === 'primary' ? 'global_button_i' : item.betws[0].btn.type === 'second' ? 'global_button_ii': item.betws[0].btn.type === 'normal' ? 'global_button_iii' : item.betws[0].btn.type === 'text' ? '' : ''"
                    :disabled="item.betws[0].btn.disabled"
                  >
                    {{ item.betws[0].btn.label }}
                  </to-button>
                </YxtUpload>
                <to-button
                @click="handleBtnAction(item.betws[0])"
                v-else-if="item.betws[0].type === 'organization'"
                    :type="item.betws[0].btn.type"
                    :size="item.betws[0].btn.size || 'mini'"
                    :class="item.betws[0].btn.type === 'primary' ? 'global_button_i' : item.betws[0].btn.type === 'second' ? 'global_button_ii': item.betws[0].btn.type === 'normal' ? 'global_button_iii' : item.betws[0].btn.type === 'text' ? '' : ''"
                    :disabled="item.betws[0].btn.disabled"
                  >
                    {{ item.betws[0].btn.label }}
                  </to-button>
                </to-col>
                <to-col class="split-v" :span="1" v-if="item.betws[0].type != 'upload' && item.betws[0].type != 'organization'">&nbsp;</to-col>
                <to-col :span="item.betws[1].span" class="betw-input-colb">
                  <to-button
                    :type="item.betws[1].btn.type"
                    :size="item.betws[1].btn.size || 'mini'"
                    :class="item.betws[1].btn.type === 'primary' ? 'global_button_i' : item.betws[1].btn.type === 'normal' ? 'global_button_iii' : item.betws[1].btn.type === 'text' ? '' : 'global_button_ii'"
                    :disabled="item.betws[1].btn.disabled"
                    @click="handleBtnAction(item.betws[1])"
                  >
                    {{ item.betws[1].btn.label }}
                  </to-button>
                </to-col>
              </to-form-item>
              <to-form-item class="betwItem-form" v-else-if="item.type === 'betwDate'" :prop="item.betws[0].id + '/' + item.betws[1].id" >
                <to-col :span="item.betws[0].span" class="betw-input-cola">
                  <to-date-picker
                    v-model="formKey[item.betws[0].id]"
                    :type="item.betws[0].type"
                    :placeholder="item.betws[0].placeholder"
                    :start-placeholder="item.betws[0].startPlc"
                    :end-placeholder="item.betws[0].endPlc"
                    :value-format="item.betws[0].valueFormat"
                    :default-time="item.betws[0].defaultTime"
                    :picker-options="item.betws[0].pickerOptions"
                    :editable="item.betws[0].editable"
                    style="width: 100%"
                    :disabled="item.betws[0].disabled"
                  />
                </to-col>
                <to-col class="split-v" :span="1">-</to-col>
                <to-col :span="item.betws[1].span" class="betw-input-colb">
                  <to-date-picker
                    v-model="formKey[item.betws[1].id]"
                    :type="item.betws[1].type"
                    :placeholder="item.betws[1].placeholder"
                    :start-placeholder="item.betws[1].startPlc"
                    :end-placeholder="item.betws[1].endPlc"
                    :default-time="item.betws[1].defaultTime"
                    :picker-options="item.betws[1].pickerOptions"
                    :value-format="item.betws[1].valueFormat"
                    :editable="item.betws[1].editable"
                    style="width: 100%"
                    :disabled="item.betws[1].disabled"
                  />
                </to-col>
              </to-form-item>
              <to-form-item v-else-if="item.type === 'upload'" :prop="item.id">
                <!-- TODO：再行完善：此处传入外部 <YxtUpload /> 组件 -->
                <!-- <slot name="upload" /> -->
                <yxt-upload
                  :action="item.uploadPath"
                  :payload="item.uploadList"
                  :events="uploadEvents"
                  :limit="item.limit || 1"
                  :multiple="item.multiple || false"
                  :headers="item.headers"
                  :type="item.uptype"
                  :showFileList="item.showFileList"
                  :fileList="item.fileList"
                />
                <!-- <template slot="upload">
                </template> -->
              </to-form-item>
              <to-form-item v-else-if="item.type === 'subtags'" :prop="item.id">
                <to-button
                  v-if="item.btn.isNext"
                  :type="item.btn.type"
                  :size="item.btn.size || 'mini'"
                  :class="item.btn.type === 'primary' ? 'global_button_i' : item.btn.type === 'normal' ? 'global_button_iii' : item.btn.type === 'text' ? '' : 'global_button_ii'"
                  :disabled="item.btn.disabled"
                  @click="handleBtnAction(item)"
                >
                  {{ item.btn.label }}
                </to-button>
                <slot :name="item.id" :item="item" />
              </to-form-item>
              <to-form-item v-else-if="item.type === 'cascader'" :prop="item.id">
                <to-cascader
                  :ref="item.id"
                  :key="item.id"
                  v-model="formKey[item.id]"
                  :options="item.options"
                  :props="item.props"
                  :show-all-levels="item.showAllLevels"
                  :filterable="item.filterable"
                  :clearable="item.clearable"
                  :placeholder="item.placeholder"
                  :collapse-tags="item.collapseTags"
                  :disabled="item.disabled"
                  @change="handleCascaderChange(item.id)"
                  @visible-change="(e) => handleCascaderVisibleChange(e, item.id)"
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data[item.props['label']] || data.label }}</span>
                    <!-- item.hideLength不传值或者传flase显示 -->
                    <span v-if="!item.hideLength && !node.isLeaf"> ({{ data.children.length }}) </span>
                  </template>
                </to-cascader>
              </to-form-item>
              <to-form-item v-else-if="item.type === 'splitCascader'" :prop="item.id">
                <slot :name="item.id"/>
              </to-form-item>
            </to-form-item>
          </template>
        </to-col>
        <to-col v-if="isShowBtns" :span="24/cmpRowSpan" :offset="rowSpan > 2 && this.formItems.length === 1? 0 : cmpOffset()">
          <to-form-item label-width="-1" :class="formBtnsFlex == 'left' ? 'offset-btnbox-left' : 'offset-btnbox'">
            <to-button
              v-for="btn in formBtns"
              :key="btn.value"
              :type="btn.type"
              :disabled="btn.disabled"
              @click="handleTransferAction(btn)"
            >
              {{ btn.label }}
            </to-button>
            <to-button
              v-if=" this.formItems.length > this.cmpRowSpan &&showExpand"
              type="text"
              :style="{ marginLeft: '8px', fontSize: '12px' }"
              :icon="expand ? 'to-icon-arrow-up' : 'to-icon-arrow-down'"
              @click="toggle"
            >
              {{ expand ? '收起' : '展开' }}
            </to-button>
          </to-form-item>
        </to-col>
      </to-row>
    </to-form>
  </div>
</template>
<script>
import ToForm from '../../../../element-ui/packages/form'
import ToFormItem from '../../../../element-ui/packages/form-item'
import ToRow from '../../../../element-ui/packages/row'
import ToCol from '../../../../element-ui/packages/col'
import ToTooltip from '../../../../element-ui/packages/tooltip'
import ToButton from '../../../../element-ui/packages/button'
import ToInput from '../../../../element-ui/packages/input'
import ToInputNumber from '../../../../element-ui/packages/input-number'
import ToSelect from '../../../../element-ui/packages/select'
import ToOption from '../../../../element-ui/packages/option'
import ToDatePicker from '../../../../element-ui/packages/date-picker'
import ToTimePicker from '../../../../element-ui/packages/time-picker'
import ToSwitch from '../../../../element-ui/packages/switch'
import ToCheckboxGroup from '../../../../element-ui/packages/checkbox-group'
import ToCheckbox from '../../../../element-ui/packages/checkbox'
import ToRadioGroup from '../../../../element-ui/packages/radio-group'
import ToRadioButton from '../../../../element-ui/packages/radio-button'
import ToRadio from '../../../../element-ui/packages/radio'
import ToCascader from '../../../../element-ui/packages/cascader'

import YxtIcon from '../../yxt-icon'
import YxtUpload from '../../yxt-upload'
import config from '../../../src/utils/config'
import DateShortcut from '../comp/dateShortcut.vue'

export default {
  name: 'YxtForm',
  components: {
    ToForm,
    ToFormItem,
    ToRow,
    ToCol,
    ToTooltip,
    ToButton,
    YxtIcon,
    ToInput,
    ToInputNumber,
    ToSelect,
    ToOption,
    ToDatePicker,
    ToTimePicker,
    ToSwitch,
    ToCheckboxGroup,
    ToCheckbox,
    ToRadioGroup,
    ToRadioButton,
    ToRadio,
    ToCascader,
    YxtUpload,
    DateShortcut
  },
  props: {
    CONST_MIN_WIDTH: {
      type: String,
      default: config['CONST_MIN_WIDTH']
    },
    isFormDisabled: {
      type: Boolean,
      default: false
    },
    /**
     * upgrade是否使用改版后样式
     */
    cardStyle: {
      type: Boolean,
      default: false
    },
    /**
     * label宽度
     */
    labelWidth: {
      type: String,
      default: '160px'
    },
    /*
     * label是否同行
     */
    isInline: {
      type: Boolean,
      default: true
    },
    /**
     * 左侧提示文字对齐方式
     * 默认 right
     */
    labelPosition: {
      type: String,
      default: 'right'
    },
    /**
     * 列与列之间的间距
     */
    gutter: {
      type: Number,
      default: 24
    },
    /**
     * 表单keys
     * [必传]
     */
    formKey: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formKeyByUploads: {
      type: String,
      default: 'url'
    },
    /**
     * 表单数组
     * [必传]
     */
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 一行默认显示3个Input
     * [非必传]
     */
    rowSpan: {
      type: Number,
      default: 3
    },
    /**
     * 是否显示展开/折叠按钮
     */
    showExpand: {
      type: Boolean,
      default: false
    },
    formBtnsFlex: {
      type: String,
      default: 'right'
    },
    formBtns: {
      type: Array,
      default: () => [
        { label: '重置', value: 'reset', type: 'normal' },
        { label: '查询', value: 'fetch', type: 'primary' }

      ]
    },
    /**
     *  限制格式
     * 【非必传】
     */
    typeLimit: {
      type: Array,
      default: () => {
        return ['png', 'jpg', 'jpeg', 'gif']
      }
    },
    isAutoFix: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示【查询】【重置】...等自定义按钮
     * 默认值：显示
     */
    isShowBtns: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      expand: false,
      apkFileList: [],
      apkFileListSign: [],
      uploadEvents: {
        uploadSuccess: this.uploadSuccess,
        uploadError: this.uploadError,
        uploadBeforeRemove: this.uploadBeforeRemove,
        uploadRemove: this.uploadRemove
      }
    }
  },
  computed: {
    count() {
      return this.expand ? this.formItems.length : this.cmpRowSpan;
    },
    cmpRowSpan: {
      get() {
        return this.isAutoFix ? config.computedRowSpanByWidth() : this.rowSpan
      },
      set(nval) {
        return nval
      }
    }
  },
  mounted() {
    let that = this; // 匿名函数的执行环境具有全局性，为防止this丢失这里用that变量保存一下
    window.onresize = () => {
      if (!this.timer) { // 使用节流机制，降低函数被触发的频率
        this.timer = true;
        setTimeout(function() {
          that.cmpRowSpan = config.computedRowSpanByWidth();
          that.timer = false;
        }, 400)
      }
    }
  },
  updated() {
    let self = this;
    document.onkeydown = function() {
      let key = window.event.keyCode;
      if (key == 13) {
        self.submitForm('ruleForm');
      }
    }
  },
  created() {
    this.apkFileList = []
    this.apkFileListSign = []
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    cmpOffset() {
      let span_x = (24 - (this.formItems.length * (24 / this.cmpRowSpan))) / (24 / this.cmpRowSpan)
      let span_last = this.count % this.cmpRowSpan
      let ceil_span = 24 / this.cmpRowSpan
      if (this.formItems.length < this.cmpRowSpan) {
        if (span_x > 4) {
          return (this.formItems.length * ceil_span) + (ceil_span * (span_x - 1))
        } else {
          return (24 - (this.formItems.length * ceil_span)) - ceil_span
        }
      } else {
        return (this.cmpRowSpan - span_last - 1) * ceil_span
      }
    },
    cmpSpan(item) {
      if (item && (item.type === 'divider' || item.type === 'divider-noborder')) {
        return 24
      } else if (item && item.type === 'betwData') {
        return item.span
      } else {
        return 24 / this.cmpRowSpan
      }
    },
    remoteMethod(query, item, index) {
      if (query !== '') {
        item.loading = true;
        this.actions('remoteMethod', {
          query: query.trim(),
          id: item.id,
          index
        });
      } else {
        item.arr = [];
      }
    },
    filterMethod(val) {
      this.actions('filterMethod', { obj: val })
    },
    handleTransferAction(btn) {
      if (btn.value === 'fetch') {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.$emit('getFormValues', this.formKey)
          } else {
            this.$emit('getFormValuesNext', this.formKey)
            return false;
          }
        });
      } else if (btn.value === 'reset') {
        this.$refs['ruleForm'].resetFields();
        this.$emit('resetForm')
      } else {
        this.actions(btn)
      }
    },
    toggle() {
      this.expand = !this.expand;
    },
    changeCheckBox(id, item) {
      this.actions('changeCheckBox', item)
    },
    changeDatePicker(item) {
      this.actions('changeDatePicker', item)
    },
    handleSuccess(resdata) {
      this.$message({ type: 'success', message: '上传成功' });
      resdata.name = `${resdata.fileName}.${resdata.fileSuffix}`;
      resdata.url = resdata.filePath;
      this.formKey['url'] = resdata.filePath
      this.apkFileList.push(resdata)
      this.apkFileListSign.push(resdata.fileSign)
    },
    handleRemove(file) {
      this.$delete(this.apkFileList, file);
      this.apkFileList.shift();
      this.apkFileListSign.shift();
    },
    submitForm(formName = 'ruleForm') {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('getFormValues', this.formKey)
        } else {
          return false;
        }
      });
    },
    resetForm(ruleForm = 'ruleForm') {
      this.$refs[ruleForm].resetFields();
      this.$emit('resetForm')
    },
    handleCascaderChange(id) {
      const list = this.$refs[id][0].getCheckedNodes()
      this.formKey[`${id}_Labels`] = this.$refs[id][0].getCheckedNodes().map(node => node.label)
      this.formKey[`${id}_Values`] = this.$refs[id][0].getCheckedNodes().map(node => node.value)
      this.actions('handleCascaderChange', { id, topCode: this.formKey[`${id}`] || this.formKey[`${id}_Values`][0], labels: this.formKey[`${id}_Labels`], checkData: list })
    },
    handleCascaderVisibleChange(show, id) {
      this.actions('handleCascaderVisibleChange', { id, show })
    },
    handleRadioChange(value, item) {
      this.actions('handleRadioChange', { value, item })
    },
    handleDateShortCutChange(value) {
      this.actions('handleDateShortCutChange', { value })
    },
    handleSelectChange(value, item) {
      this.actions('handleSelectChange', { value, item })
    },
    handleBtnAction(item) {
      this.actions('handleBtnAction', { item })
    },
    uploadSuccess(res, file, fileList) {
      this.actions('uploadSuccess', { res, file, fileList })
    },
    uploadError(err, file, fileList) {
      this.actions('uploadError', { err, file, fileList })
    },
    uploadBeforeRemove(file, fileList) {
      // eslint-disable-next-line
      // console.log('上传移除前事事件：', fileList)
      this.actions('uploadBeforeRemove', { file, fileList })
    },
    uploadRemove(file, fileList) {
      // eslint-disable-next-line
      console.log('上传移除事件：', fileList)
      this.actions('uploadRemove', { file, fileList })
    },
    handleAppendIcon(item) {
      this.actions('handleAppendIcon', { item })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/yxt-variable.scss';
@import '../../../../assets/scss/mixin.scss';
@include card-wrraper-sylte-com(24px,2px);
.line-after{
  position: relative;
  display: inline-block;
}

.line-after{
  width: 100%;
  .to-form-item__content{
    width: 100%;
  }
  /deep/ .to-form-item__content::after{
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 1px;
    background: $yxt-color-border-hex-EBECEE;
}

}
.yxt-form {
  .to-form-item {
    white-space: nowrap;
  }

  .my-form-upload-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .my-form-upload-row-cardStyle {
    margin: 12px 0 !important;
  }

  .divider-line {
    margin: 14px 0 4px 14px;
    padding-bottom: 6px;
    border-bottom: 1px solid $yxt-color-border-hex-EBECEE;
  }
  .divider-line-noborder {
    margin: 14px 0 4px 14px;
    padding-bottom: 6px;
  }

  .to-cascader {
    width: 100%;
  }

  .betw-input-cola,
  .betw-input-colb {
    width: 46%;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .betw-input-cola-upload{
    width: unset;
    padding-left: 0!important;
  }
  /deep/ .betw-input-sp > .to-input__inner {
    padding: 0 !important;
    text-align: center;
  }
  .split-v {
    text-align: center;
    margin: 0 5px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .offset-btnbox-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .offset-btnbox {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .form-diy-setting {
    /deep/ .to-form-item__label {
      float: none;
    }
  }
  /deep/ .to-input-group__prepend{
    background: unset;
    border: unset;
    padding: unset;
  }
}
</style>
