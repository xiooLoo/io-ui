<!--详情-->
<template>
  <div class="yxt-meeting-hours">
    <div class="hours-day-tab">
      <ul class="flex-row ul days">
        <li
          :class="tabActive == '0' ? 'active' : ''"
          @click="tabClick"
          data-index="0"
          style="cursor: pointer"
        >
          今天
        </li>
        <li
          :class="tabActive == '1' ? 'active' : ''"
          @click="tabClick"
          data-index="1"
          style="cursor: pointer"
        >
          明天
        </li>
        <li
          :class="tabActive == '2' ? 'active' : ''"
          @click="tabClick"
          data-index="2"
          style="cursor: pointer"
        >
          后天
        </li>
        <li
          :class="
            tabActive == '3'
              ? 'active custom-datepicker-input'
              : 'custom-datepicker-input'
          "
          style="padding: 7px 0px; width: 150px; cursor: pointer"
        >
          <to-date-picker
            @click.native="tabClick"
            popper-class="picker-custom"
            :editable="false"
            :clearable="false"
            :picker-options="pickerOptions"
            v-model="currentDate"
            type="date"
            @change="dateChange"
            prefix-icon="custom-hide"
            clear-icon="custom-hide"
            placeholder="选择日期"
            style="width: 100%"
          ></to-date-picker>
        </li>
        <li class="flex1" style="padding: 10px 0">
          <div
            class="flex-row flex-end"
            style="padding-right: 20px"
            v-if="pickSelectedHour.length">
            <div style="padding-right: 10px">已选时间段：{{ pickSelectedHour }}</div>
            <to-button size="small" type="primary" plain @click="cancel">取消</to-button>
            <to-button size="small" type="primary" @click="confirm">确定</to-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="hours-hours">
      <div v-for="(itemRow, indexRow) in times" :key="indexRow" class="flex-row">
        <div
          v-for="(item, index) in itemRow"
          :data-label="item.label"
          :data-indexrow="indexRow"
          :data-checked="item.checked"
          :data-disable="item.disable"
          :data-busy="item.busy"
          :data-index="index"
          :key="index"
          :class="item | filterRenderClass(indexRow, index, item)"
          @click="click"
        >
          <div v-if="indexRow == 0 || indexRow == 5">
            {{ item.label }}
          </div>
          <div v-else class="item-cell-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToDatePicker from '../../../../element-ui/packages/date-picker'
import ToButton from '../../../../element-ui/packages/button'

export default {
  name: 'YxtMeetingTime',
  components: {
    ToDatePicker,
    ToButton
  },
  props: {
    queryValidTimeCell: Function,
    disableTimeRangeTips: Function,
    busyFn: Function,
    book: Function,
    item: {
      type: Object,
      default: function () {
        return {};
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  /* eslint-disable */
  data() {
    return {
      selectedList: [], //已设置的会议列表
      selected: this.formatTime(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() + 1000 * 60 * 60 * 24 * 2;
        },
      },
      tabActive: "0",
      currentDate: this.formatTime(Date.now() + 1000 * 60 * 60 * 24 * 3),
      range: {
        start: "",
        end: "",
      },
      times: [],
    };
  },
  created() {
    let selectedList = this.formatSelectedList(this.item.meetRecordVos || []);
    this.selectedList = selectedList;
    let times = this.initTimes();
    this.times = times; //
  },
  computed: {},
  beforeDestroy() {},
  filters: {
    /* eslint-disable */
    filterRenderClass(item, indexRow, index) {
      let self = this || {};
      let classStr =
        indexRow == 0 || indexRow == 5
          ? 'hours-item hours-item-side'
          : indexRow == 4
          ? index == 16
            ? 'hours-item border-bottom border-right'
            : 'hours-item border-bottom'
          : index == 16
          ? 'hours-item border-right'
          : 'flex-column hours-item';
      if (item.checked) {
        //选中
        classStr += ' checked';
      }
      if (item.busy) {
        //已占用
        classStr += ' busy';
      }
      if (item.disable) {
        //不可用-
        classStr += ' disable';
      }
      return classStr;
    },
  },
  computed: {
    /**
     * 选择勾选时间区间
     * @returns {[]}
     */
    /* eslint-disable */
    pickSelectedHour() {
      let usedHours = [],
        self = this;
      this.times.map((item) => {
        usedHours = usedHours.concat(
          item.filter((el) => !el.busy && !el.disable && el.checked)
        );
      });
      // if (usedHours.length < 2) return ''//不存在时间区间
      if (!self.range.start && !self.range.end) return "";
      let start = self.range.start.split(":");
      if (start[1] == "00") {
        //
        start[0] = parseInt(start[0]) - 1;
        start[0] = start[0] >= 10 ? start[0] : "0" + start[0];
        start[1] = "45";
      } else {
        start[1] = parseInt(start[1]) - 15;
      }
      if (start[1] < 10) {
        start[1] = "0" + start[1];
      }
      return start.join(":") + "-" + (this.range.end || "");
    },
  },
  watch: {
    item(val, oldval) {
      const self = this;
      let selectedDay = self.formatTime();
      if (this.tabActive == "0") {
        let selectedList = this.formatSelectedList(val.meetRecordVos || []);
        this.selectedList = selectedList;
        let times = this.initTimes();
        this.times = times; //
      } else if (self.selected) {
        // let selectedDay = this.formatTime(Date.now() + 1000 * 60 * 60 * 24 * parseInt(this.tabActive));
        self.initByDay(self.selected);
      }
    },
  },
  methods: {
    /* eslint-disable */
    formatSelectedList(list) {
      //格式化已设置会议时间区间
      return list.filter((item) => {
          return item.status != 3;
        })
        .map((item) => {
          return {
            start: item.startTime
              .split(" ")[1]
              .split(":")
              .slice(0, 2)
              .join(":"),
            end: item.endTime.split(" ")[1].split(":").slice(0, 2).join(":"),
            date: item.startTime.split(" ")[0],
            item: item,
          };
        });
    },
    /**
     * 获取已选用、并可用时间
     * @returns {[]}
     */
    pickUsedHour() {
      let usedHours = [];
      this.times.map((item) => {
        usedHours = usedHours.concat(
          item.filter((el) => el.busy && !el.disable)
        );
      });
      return usedHours;
    },
    /**
     * 双字符小时数据
     * @param hour
     * @returns {*}
     */
    /* eslint-disable */
    formatHour(hour) {
      return hour >= 10 ? hour : "0" + hour;
    },
    /**
     * 当前日期：年月日
     * @param data
     * @returns {string}
     */
    formatTime(data) {
      if (!data) {
        data = new Date();
      }
      var date = data instanceof Date ? data : new Date(data);
      return (
        date.getFullYear() +"-" +(date.getMonth() + 1 > 9? date.getMonth() + 1: "0" + (date.getMonth() + 1)) + "-" +(date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
      );
    },
    /**
     * 当前小时
     * @param delay
     * @returns {string}
     */
    nowTime(delay = 0) {
      var date = new Date();
      let nowHour = date.getHours();
      nowHour += delay;
      return (nowHour > 9 ? nowHour : "0" + nowHour) + "";
    },
    /* eslint-disable */
    nowTime1() {
      //最近可以设置会议的时间
      var date = new Date();
      let nowHour = date.getHours(),
        mins = new Date().getMinutes();
      if (mins >= 45) {
        nowHour += 1;
        mins = 15;
      } else if (mins >= 30) {
        nowHour += 1;
        mins = 0;
      } else if (mins >= 15) {
        mins = 45;
      } else {
        mins = 30;
      }
      return (
        (nowHour > 9 ? nowHour : "0" + nowHour) +
        ":" +
        (mins > 9 ? mins : "0" + mins)
      );
    },
    //跨已用时间区间判断
    /* eslint-disable */
    withBusyTime(range) {
      //判断是否为连续时间段  被占用时间
      let usedHours = this.pickUsedHour(); 
      //在所占区hour
      let inHours = usedHours.filter(item => item.label <= range.end && item.label >= range.start);
      if (inHours.length > 0){
        return true;
      }
      return false;
    },
    /**
     * 点击单元格
     * @param e
     */
    /* eslint-disable */
    click(e) {
      var dataset = e.currentTarget.dataset,
        self = this,
        range = self.range;
      if (dataset.disable) return;
      //选用被占用时间
      if (!!dataset['busy']) { 
        self.busyFn && self.busyFn(dataset['busy']);
        return;
      }
      if (range.start && !range.end) {
        if (range.start > dataset.label) {
          //小于被占用时间,取时间戳
          range.end = range.start;
          range.start = dataset.label;
        } else {
          //判断是否为连续时间段
          // let usedHours = this.pickUsedHour()//被占用时间
          // let inHours = usedHours.filter(item => item.label <= dataset.label && item.label >= range.start)//在所占区hour
          // if (inHours.length > 0) return
          if (
            self.withBusyTime({
              start: range.start,
              end: dataset.label,
            })
          ) {
            self.disableTimeRangeTips && self.disableTimeRangeTips();
            return;
          }
          range.end = dataset.label;
        }
      } else if (!range.start && !range.end) {
        range.start = dataset.label;
        range.end = dataset.label;
      } else {
        if (range.start == range.end && range.start == dataset.label) {
          //选择一个时间框 @todo 代码优化
          range.start = "";
          range.end = ""; //
        } else if (range.start == range.end && range.start != dataset.label) {
          if (range.start > dataset.label) {
            if (
              self.withBusyTime({
                start: dataset.label,
                end: range.start,
              })
            ) {
              return self.disableTimeRangeTips && self.disableTimeRangeTips();
            }
            range.end = range.start;
            range.start = dataset.label;
          } else {
            if (
              self.withBusyTime({
                end: dataset.label,
                start: range.start,
              })
            ) {
              self.disableTimeRangeTips && self.disableTimeRangeTips();
              return;
            }
            range.end = dataset.label;
          }
        } else if (range.start != range.end) {
          range.start = dataset.label;
          range.end = dataset.label;
        } else {
          range.start = dataset.label;
          range.end = "";
        }
      }
      if (range.start && range.end) {
        //选中区间内时间
        self.times = self.times.map((rowItem, rowIndex) => {
          if (rowIndex == 0 || rowIndex == 5) return rowItem;
          return rowItem.map((item, index) => {
            item.checked = range.start <= item.label && range.end >= item.label;
            return item;
          });
        });
      } else if (range.start && !range.end) {
        self.times = self.times.map((rowItem, rowIndex) => {
          if (rowIndex == 0 || rowIndex == 5) return rowItem;
          return rowItem.map((item, index) => {
            item.checked = range.start == item.label;
            return item;
          });
        });
      } else {
        self.times[dataset["indexrow"]][dataset["index"]]["checked"] =
          !dataset.checked;
      }
      self.range = range;
    },
    tabClick(e) {
      // debugger;
      const dataset = e.currentTarget.dataset,
        self = this;
      if (dataset["index"] != undefined) {
        let selectedDay = this.formatTime(
          Date.now() + 1000 * 60 * 60 * 24 * parseInt(dataset["index"])
        );
        if (!self.queryValidTimeCell) {
          self.times = self.initTimes(selectedDay); //今天，明天、后天
        } else {
          self.initByDay(selectedDay);
        }
      }
      this.tabActive = dataset["index"] || "3";
    },
    //按天格式化时间格数据
    initByDay(selectedDay) {
      const self = this;
      self.queryValidTimeCell({
          startTime: selectedDay + " 07:00:00",
          endTime: selectedDay + " 24:00:00",
          meetingRoomId: self.item.id,
        })
        .then((list) => {
          // console.log(list);
          let selectedList = self.formatSelectedList(list || []);
          self.selectedList = selectedList;
          self.times = self.initTimes(selectedDay);
        });
    },
    dateChange(val) {
      let selectedDay = this.formatTime(val),
        self = this;
      if (!self.queryValidTimeCell) {
        self.times = this.initTimes(selectedDay); //自定义日期
      } else {
        self.initByDay(selectedDay);
      }
    },
    isBusy(time) {
      //是否被占用
      let flag = false;
      this.selectedList.map((item) => {
        if (
          (item.date + " " + item.start < time &&
            time <= item.date + " " + item.end) ||
          (item.date + " " + item.start == time &&
            time == item.date + " " + item.end)
        ) {
          flag = JSON.stringify(item);
        }
      });
      return flag;
    },
    initTimes(initDay) {
      let initArr = Array(17).fill(0),
        times = Array(6)
          .fill(0)
          .map((item) => {
            return Array(17).fill(0);
          }),
        self = this,
        today = self.formatTime(),
        nowHour = this.nowTime1(); //+ ':00'
      let selected = initDay || today;
      //console.log(nowHour)
      initArr.map(function (item, index) {
        times[0][index] = {
          checked: false,
          disable: false,
          busy: false,
          label: index + 7 + ":00",
        };
        let time1 = self.formatHour(index + 7) + ":15";
        // if(selectedList)
        times[1][index] = {
          label: time1,
          disable:
            today == selected ? (time1 >= nowHour ? false : true) : false,
          busy: self.isBusy(selected + " " + time1),
          checked: false,
        };
        let time2 = self.formatHour(index + 7) + ":30";
        times[2][index] = {
          label: time2,
          disable:
            today == selected ? (time2 >= nowHour ? false : true) : false,
          busy: self.isBusy(selected + " " + time2),
          checked: false,
        };
        let time3 = self.formatHour(index + 7) + ":45";
        times[3][index] = {
          label: time3,
          disable:
            today == selected ? (time3 >= nowHour ? false : true) : false,
          busy: self.isBusy(selected + " " + time3),
          checked: false,
        };
        let time4 = self.formatHour(index + 8) + ":00";
        times[4][index] = {
          label: time4,
          disable:
            today == selected ? (time4 >= nowHour ? false : true) : false,
          busy: self.isBusy(selected + " " + time4),
          checked: false,
        };
        times[5][index] = {
          label: self.formatHour(index + 8) + ":00",
          disable: false,
          busy: false,
          checked: false,
        };
      });
      this.selected = selected;
      this.range = { start: "", end: "" };
      // console.log(times);
      if (initDay) {
        this.times = times;
        return times;
      }
      return times;
    },
    //确认设置时间
    confirm() {
      const self = this;
      let start = self.range.start.split(":");
      if (start[1] == "00") {
        start[0] = parseInt(start[0]) - 1;
        start[0] = start[0] >= 10 ? start[0] : "0" + start[0];
        start[1] = "45";
      } else {
        start[1] = parseInt(start[1]) - 15;
      }
      this.book &&
        this.book({
          start: this.selected + " " + start.join(":"), //
          end: this.selected + " " + this.range.end,
          item: this.item,
        });
    },
    //取消是设置时间
    cancel() {
      this.range = { start: "", end: "" };
      let times = this.initTimes(this.selected);
      this.times = times;
    },
  },
};
</script>

<style scoped>
.ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.flex1 {
    flex: 1;
}

.flex-row {
  display: flex;
  flex-direction: row;
}
 .days{
    width: 100%;
  }

.days li {
  padding: 18px 0;
  font-size: 14px;
  text-align: center;
  width: 96px;
  border-bottom: 3px solid #f6f7f9;
}

.days .active {
  color: #409eff;
  border-bottom: 3px solid #409eff;
}

.to-date-editor--date input.to-input__inner {
  border: none !important;
  cursor: pointer;
  font-weight: bold;
}

.yxt-meeting-hours {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hours-day-tab{
    width: 1071px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hours-item {
  width: 63px;
  border-top: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  text-align: center;
  height: 38px;
  border: 0;
  position: relative;
}

.border-right {
  /*border-right: 1px solid #E6E6E6;*/
}

.border-bottom {
  /*border-bottom: 1px solid #E6E6E6;*/
}

.hours-item.hours-item-side:hover {
  background: #fff;
}

.hours-item-side {
  color: #666666;
  font-size: 13px;
  /*border: 1px solid #fff;*/
  height: auto;
  padding: 14px 0;
}
.item-cell-border {
  border: 1px solid #e6e6e6;
  position: absolute;
  top: -1px;
  right: -1px;
  left: 0;
  bottom: 0;
}
.hours-item.checked,
.hours-item:hover {
  background: #d2e6fb;
  cursor: pointer;
}
.hours-item.busy {
  background: #5cdbd3;
  background-image: url("./images/hour-used.png");
  background-position: center;
  background-repeat: no-repeat;
}

.hours-item.disable {
  background: #e6e6e6;
  background-image: url("./images/hour-disable.png");
  background-position: center;
  background-repeat: no-repeat;
}
.hours-item:hover .item-cell-border {
  border: 1px solid #409eff;
  z-index: 99;
  left: 0px;
  z-index: 1;
  bottom: 0px;
}
.hours-item.disable .item-cell-border {
  border: 1px solid #fff;
}
.hours-item.checked .item-cell-border {
  border: 1px solid #409eff;
  z-index: 1;
}
</style>


