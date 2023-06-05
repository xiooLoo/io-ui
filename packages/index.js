/**
 * ElementUI源
 */
// import './element-ui/packages/theme-chalk/lib/index.css';
import './element-ui/packages/theme-chalk/index.scss'; // 便于二次编辑element本身样式
import Alert from './element-ui/packages/alert';
import Aside from './element-ui/packages/aside';
import Autocomplete from './element-ui/packages/autocomplete';
import Avatar from './element-ui/packages/avatar';
import Backtop from './element-ui/packages/backtop';
import Badge from './element-ui/packages/badge';
import Breadcrumb from './element-ui/packages/breadcrumb';
import BreadcrumbItem from './element-ui/packages/breadcrumb-item';
import Button from './element-ui/packages/button';
import ButtonGroup from './element-ui/packages/button-group';
import Calendar from './element-ui/packages/calendar';
import Card from './element-ui/packages/card';
import Scrollbar from './element-ui/packages/scrollbar';
import Carousel from './element-ui/packages/carousel';
import CarouselItem from './element-ui/packages/carousel-item';
import Cascader from './element-ui/packages/cascader';
import CascaderPanel from './element-ui/packages/cascader-panel';
import Checkbox from './element-ui/packages/checkbox';
import CheckboxButton from './element-ui/packages/checkbox-button';
import CheckboxGroup from './element-ui/packages/checkbox-group';
import Radio from './element-ui/packages/radio';
import RadioGroup from './element-ui/packages/radio-group';
import RadioButton from './element-ui/packages/radio-button';
import Tag from './element-ui/packages/tag';
import Col from './element-ui/packages/col';
import Collapse from './element-ui/packages/collapse';
import CollapseItem from './element-ui/packages/collapse-item';
import Container from './element-ui/packages/container';
import DatePicker from './element-ui/packages/date-picker';
import ColorPicker from './element-ui/packages/color-picker';
import Dialog from './element-ui/packages/dialog';
import Divider from './element-ui/packages/divider';
import Drawer from './element-ui/packages/drawer';
import Dropdown from './element-ui/packages/dropdown';
import DropdownMenu from './element-ui/packages/dropdown-menu';
import DropdownItem from './element-ui/packages/dropdown-item';
import Descriptions from './element-ui/packages/descriptions';
import DescriptionsItem from './element-ui/packages/descriptions-item';
import Empty from './element-ui/packages/empty';
import Footer from './element-ui/packages/footer';
import Form from './element-ui/packages/form';
import FormItem from './element-ui/packages/form-item';
import Header from './element-ui/packages/header';
import Icon from './element-ui/packages/icon';
import Image from './element-ui/packages/image';
import InfiniteScroll from './element-ui/packages/infinite-scroll';
import Input from './element-ui/packages/input';
import InputNumber from './element-ui/packages/input-number';
import Link from './element-ui/packages/link';
import Loading from './element-ui/packages/loading';
import Main from './element-ui/packages/main';
import Menu from './element-ui/packages/menu';
import Submenu from './element-ui/packages/submenu';
import MenuItem from './element-ui/packages/menu-item';
import MenuItemGroup from './element-ui/packages/menu-item-group';
import Tooltip from './element-ui/packages/tooltip';
import Message from './element-ui/packages/message';
import MessageBox from './element-ui/packages/message-box';
import Notification from './element-ui/packages/notification';
import Option from './element-ui/packages/option';
import OptionGroup from './element-ui/packages/option-group';
import Select from './element-ui/packages/select';
import PageHeader from './element-ui/packages/page-header';
import Pagination from './element-ui/packages/pagination';
import Popconfirm from './element-ui/packages/popconfirm';
import Popover from './element-ui/packages/popover';
import Progress from './element-ui/packages/progress';
import Rate from './element-ui/packages/rate';
import Row from './element-ui/packages/row';
import Skeleton from './element-ui/packages/skeleton';
import SkeletonItem from './element-ui/packages/skeleton-item';
import Slider from './element-ui/packages/slider';
import Spinner from './element-ui/packages/spinner';
import Step from './element-ui/packages/step';
import Steps from './element-ui/packages/steps';
import Switch from './element-ui/packages/switch';
import TabPane from './element-ui/packages/tab-pane';
import Table from './element-ui/packages/table';
import TableColumn from './element-ui/packages/table-column';
import Tabs from './element-ui/packages/tabs';
import TimePicker from './element-ui/packages/time-picker';
import TimeSelect from './element-ui/packages/time-select';
import Timeline from './element-ui/packages/timeline';
import TimelineItem from './element-ui/packages/timeline-item';
import Transfer from './element-ui/packages/transfer';
import Tree from './element-ui/packages/tree';
import Upload from './element-ui/packages/upload';

/**
 * 自定义组件
 */
import { customComponents } from './yxt-index';
import YxtMessage from './yxt-ui/packages/yxt-message/index';
import { YxtGridItem, YxtGridLayout } from './yxt-ui/packages/yxt-grid-layout/index';
import YxtGridViewer from './yxt-ui/packages/yxt-grid-viewer/index';
import lodash from 'lodash'

const components = [
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Scrollbar,
  Carousel,
  CarouselItem,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Tag,
  Col,
  Collapse,
  CollapseItem,
  Container,
  DatePicker,
  ColorPicker,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Descriptions,
  DescriptionsItem,
  Empty,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  Input,
  InputNumber,
  Link,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
  Option,
  OptionGroup,
  Select,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Rate,
  Row,
  Skeleton,
  SkeletonItem,
  Slider,
  Spinner,
  Step,
  Steps,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Transfer,
  Tree,
  Upload,
  /** ********************************************/
  /*            以下为自定义组件部分                */
  /** ********************************************/
  ...customComponents
];


const install = function (Vue, opts = {}) {
  if (install.installed) {
    return
  }
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(InfiniteScroll);
  Vue.use(Loading.directive);

  Vue.component('YxtGridLayout', YxtGridLayout);
  Vue.component('YxtGridItem', YxtGridItem);
  Vue.component('YxtGridViewer', YxtGridViewer);
  Vue.prototype.$eventBus = new Vue();
  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
  Vue.prototype._ = lodash;
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
  Vue.prototype.$yxtmessage = YxtMessage;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Tag,
  Col,
  Collapse,
  CollapseItem,
  Container,
  DatePicker,
  ColorPicker,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Descriptions,
  DescriptionsItem,
  Empty,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  InfiniteScroll,
  Input,
  InputNumber,
  Link,
  Loading,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
  Message,
  MessageBox,
  Notification,
  Option,
  OptionGroup,
  Select,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Rate,
  Row,
  Skeleton,
  SkeletonItem,
  Slider,
  Spinner,
  Step,
  Steps,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Transfer,
  Tree,
  Upload,
  /** ********************************************/
  /*            以下为自定义组件部分                */
  /** ********************************************/
  ...customComponents,
  YxtMessage,
  YxtGridItem,
  YxtGridLayout,
  YxtGridViewer
};
