import YxtSvgIcon from './src/index.vue';

YxtSvgIcon.install = function(Vue) {
  Vue.component(YxtSvgIcon.name, YxtSvgIcon);
};
const req = require.context('./svgs', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

export default YxtSvgIcon;
