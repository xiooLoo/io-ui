import ToTimelineItem from '../timeline/src/item';

/* istanbul ignore next */
ToTimelineItem.install = function(Vue) {
  Vue.component(ToTimelineItem.name, ToTimelineItem);
};

export default ToTimelineItem;
