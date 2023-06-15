/**
 * 自定义组件
 */
import './yxt-ui/packages/theme-default/index.scss';
import './assets/iconfont/iconfont.css';
import '@yxtui/src/utils/array-next.js'
// 基础组件
import YxtTable from './yxt-ui/packages/yxt-table/index';
import YxtPagination from './yxt-ui/packages/yxt-pagination/index';
import YxtTabs from './yxt-ui/packages/yxt-tabs/index';
import YxtDialog from './yxt-ui/packages/yxt-dialog/index';
import YxtDrawer from './yxt-ui/packages/yxt-drawer/index';
import YxtTimeLine from './yxt-ui/packages/yxt-time-line/index';
import YxtSearch from './yxt-ui/packages/yxt-search/index';
import YxtDateTimePicker from './yxt-ui/packages/yxt-dateTimePicker/index';
import YxtTree from './yxt-ui/packages/yxt-tree';
import YxtRate from './yxt-ui/packages/yxt-rate';
import YxtCarousel from './yxt-ui/packages/yxt-carousel/index';
import YxtMeetingTime from './yxt-ui/packages/yxt-meeting-time/index';
import YxtCard from './yxt-ui/packages/yxt-card/index';
import YxtProgress from './yxt-ui/packages/yxt-progress/index';
import YxtCascader from './yxt-ui/packages/yxt-cascader/index';
import YxtTransfer from './yxt-ui/packages/yxt-transfer/index';
import YxtBreadCrumb from './yxt-ui/packages/yxt-breadCrumb/index';
import YxtCollapse from './yxt-ui/packages/yxt-collapse/index';
import YxtUpload from './yxt-ui/packages/yxt-upload/index';
import YxtPageTitle from './yxt-ui/packages/yxt-page-title/index';
import YxtEmpty from './yxt-ui/packages/yxt-empty/index';
import YxtSteps from './yxt-ui/packages/yxt-steps/index';
import YxtStep from './yxt-ui/packages/yxt-step/index';
import YxtImageView from './yxt-ui/packages/yxt-image-view/index';
import YxtIcon from './yxt-ui/packages/yxt-icon/index';
import YxtResult from './yxt-ui/packages/yxt-result/index';
import YxtForm from './yxt-ui/packages/yxt-form/index';
import YxtPageHeader from './yxt-ui/packages/yxt-pageHeader/index';
import YxtPageFooter from './yxt-ui/packages/yxt-page-footer/index';
import YxtBissInlineBtns from './yxt-ui/packages/biss/yxt-biss-inlineBtns/index';
import YxtRowBtns from './yxt-ui/packages/yxt-rowBtns/index';
import YxtCodemirror from './yxt-ui/packages/yxt-codemirror/index';
import YxtSvgIcon from './yxt-ui/packages/yxt-svg-icon/index';

// 业务模块组件
import YxtBissBaseTable from './yxt-ui/packages/biss/yxt-biss-baseTable/index';
import YxtBissItemTitle from './yxt-ui/packages/biss/yxt-biss-itemTitle/index';

// 门户业务组件
import YxtBissApps from './yxt-ui/packages/biss-portals/yxt-biss-apps/index';
// [biss]-轮播图
import FuncCarousel from './yxt-ui/packages/biss-portals/yxt-func-carousel/index';
const YxtFuncCarousel = FuncCarousel.YxtFuncCarousel
const YxtFuncCarouselPanelContent = FuncCarousel.YxtFuncCarouselPanelContent
const YxtFuncCarouselPanelExtyle = FuncCarousel.YxtFuncCarouselPanelExtyle
// [biss]-应用
import YxtBissApp from './yxt-ui/packages/biss-portals/yxt-biss-app/index';
const YxtImmovableApp = YxtBissApp.YxtImmovableApp
const YxtVehicleApp = YxtBissApp.YxtVehicleApp
const YxtEnergyApp = YxtBissApp.YxtEnergyApp
const YxtStandardApp = YxtBissApp.YxtStandardApp
const YxtSuperviseApp = YxtBissApp.YxtSuperviseApp
const YxtBissAppPanelContent = YxtBissApp.YxtBissAppPanelContent
const YxtBissAppPanelExtyle = YxtBissApp.YxtBissAppPanelExtyle
// [biss]-常用功能
import BissCommons from './yxt-ui/packages/biss-portals/yxt-biss-commons/index';
const YxtBissCommons = BissCommons.YxtBissCommons
const YxtBissCommonsPanelContent = BissCommons.YxtBissCommonsPanelContent
const YxtBissCommonsPanelExtyle = BissCommons.YxtBissCommonsPanelExtyle
// [biss]-通知公告
import BissNotices from './yxt-ui/packages/biss-portals/yxt-biss-notices/index';
const YxtBissNotices = BissNotices.YxtBissNotices
const YxtBissNoticesPanelContent = BissNotices.YxtBissNoticesPanelContent
const YxtBissNoticesPanelExtyle = BissNotices.YxtBissNoticesPanelExtyle
// [biss]-资料中心
import BissDataCenter from './yxt-ui/packages/biss-portals/yxt-biss-datacenter/index';
const YxtBissDataCenter = BissDataCenter.YxtBissDataCenter
const YxtBissDataCenterPanelContent = BissDataCenter.YxtBissDataCenterPanelContent
const YxtBissDataCenterPanelExtyle = BissDataCenter.YxtBissDataCenterPanelExtyle
// [biss]-备忘清单
import BissForgets from './yxt-ui/packages/biss-portals/yxt-biss-forgets/index';
const YxtBissForgets = BissForgets.YxtBissForgets
const YxtBissForgetsPanelContent = BissForgets.YxtBissForgetsPanelContent
const YxtBissForgetsPanelExtyle = BissForgets.YxtBissForgetsPanelExtyle
// [biss]-待办事项
import BissTodos from './yxt-ui/packages/biss-portals/yxt-biss-todos/index';
const YxtBissTodos = BissTodos.YxtBissTodos
const YxtBissTodosPanelContent = BissTodos.YxtBissTodosPanelContent
const YxtBissTodosPanelExtyle = BissTodos.YxtBissTodosPanelExtyle

// 典型页面
import YxtBissPage from './yxt-ui/packages/biss-pages/yxt-biss-page/index';
import YxtBissDetails from './yxt-ui/packages/biss-pages/yxt-biss-details/index';
import YxtBissForm from './yxt-ui/packages/biss-pages/yxt-biss-form/index';
import YxtBissLogin from './yxt-ui/packages/biss-pages/yxt-biss-login/index';


export const customComponents = [
  YxtTable,
  YxtPagination,
  YxtTabs,
  YxtDialog,
  YxtDrawer,
  YxtTimeLine,
  YxtSearch,
  YxtDateTimePicker,
  YxtTree,
  YxtRate,
  YxtCarousel,
  YxtMeetingTime,
  YxtCard,
  YxtProgress,
  YxtBreadCrumb,
  YxtCascader,
  YxtTransfer,
  YxtCollapse,
  YxtUpload,
  YxtPageTitle,
  YxtEmpty,
  YxtSteps,
  YxtStep,
  YxtImageView,
  YxtIcon,
  YxtResult,
  YxtForm,
  YxtPageHeader,
  YxtPageFooter,
  YxtBissInlineBtns,
  YxtRowBtns,
  YxtCodemirror,
  YxtSvgIcon,
  YxtBissBaseTable,
  YxtBissItemTitle,
  YxtBissPage,
  YxtBissForm,
  YxtBissLogin,
  YxtBissDetails,
  YxtBissApps,
  YxtFuncCarousel,
  YxtFuncCarouselPanelContent,
  YxtFuncCarouselPanelExtyle,
  YxtImmovableApp,
  YxtVehicleApp,
  YxtEnergyApp,
  YxtStandardApp,
  YxtSuperviseApp,
  YxtBissAppPanelContent,
  YxtBissAppPanelExtyle,
  YxtBissCommons,
  YxtBissCommonsPanelContent,
  YxtBissCommonsPanelExtyle,
  YxtBissNotices,
  YxtBissNoticesPanelContent,
  YxtBissNoticesPanelExtyle,
  YxtBissDataCenter,
  YxtBissDataCenterPanelContent,
  YxtBissDataCenterPanelExtyle,
  YxtBissForgets,
  YxtBissForgetsPanelContent,
  YxtBissForgetsPanelExtyle,
  YxtBissTodos,
  YxtBissTodosPanelContent,
  YxtBissTodosPanelExtyle
];
