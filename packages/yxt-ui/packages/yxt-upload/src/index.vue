<template>
  <div
    class="upload_wrapper"
    :class="{'is-paging': isPaging}"
  >
    <template
      v-if="isPaging && type === 'default' && uploadInfo.upload_default.length"
    >
      <div v-for="(item, index) in uploadInfo[key]" :key="index" class="paging-item">
        <img :src="item.url" />
        <div class="mask">
          <i
            class="to-icon-zoom-in"
            @click="handleAction('previewItem', item.url)"
          ></i>
          <i
            class="to-icon-delete"
            @click="handleAction('deleteItem', index)"
          ></i>
        </div>
      </div>
    </template>
    <div
      v-if="!isPaging && type === 'default' && uploadInfo.upload_default.length"
      class="upload_default"
    >
      <div v-for="(item, index) in uploadInfo[key]" :key="index">
        <img :src="item.url" />
        <div class="mask">
          <i
            class="to-icon-zoom-in"
            @click="handleAction('previewItem', item.url)"
          ></i>
          <i
            class="to-icon-delete"
            @click="handleAction('deleteItem', index)"
          ></i>
        </div>
      </div>
    </div>
    <div
      v-if="type === 'avatar' && uploadInfo.upload_avatar.length"
      :class="['upload_avatar', circle && 'circle']"
    >
      <img :src="uploadInfo[key][0].url" />
      <div :class="['mask', circle && 'circle']">
        <i
          class="to-icon-zoom-in"
          @click="handleAction('previewItem', uploadInfo[key][0].url)"
        ></i>
        <i class="to-icon-delete" @click="handleAction('cleanAvatar', '')"></i>
      </div>
    </div>
    <to-upload
      ref="upload"
      v-if="isShow"
      :http-request="httpRequest"
      :headers="headers"
      :action="action"
      :data="data"
      :name="name"
      :accept="accept"
      :drag="type === 'drag'"
      :multiple="type === 'avatar' ? false : multiple"
      :disabled="disabled"
      :limit="limit"
      :file-list="fileList"
      :list-type="type === 'custom' ? listType : 'text'"
      :auto-upload="autoUpload"
      :show-file-list="type === 'file' || type === 'drag' || type === 'custom'"
      :with-credentials="withCredentials"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
    >
      <template v-if="type === 'custom'">
        <slot />
      </template>
      <div v-if="type === 'default'" class="upload_default">
        <template>
          <div class="empty">
            <i class="to-icon-plus avatar-uploader-icon"></i>
            <span>上传照片</span>
          </div>
        </template>
      </div>
      <div
        v-if="type === 'avatar' && !uploadInfo.upload_avatar.length"
        :class="['upload_avatar', circle && 'circle']"
      >
        <div class="empty">
          <i class="to-icon-plus avatar-uploader-icon"></i>
          <span v-if="type === 'avatar'">上传头像</span>
        </div>
      </div>
      <div v-if="type === 'file'" class="upload_file">
        <div>
          <yxt-icon icon="Container" size="14"/>
          上传文件
        </div>
        <p>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</p>
      </div>
      <template v-if="type === 'drag'">
        <div class="upload_drag">
          <yxt-icon icon="Container" size="42"/>
          <div class="text">点击或将文件拖拽到这里上传</div>
          <div class="tip" slot="tip">
            支持扩展名：.rar .zip .doc .docx .pdf .jpg...
          </div>
        </div>
      </template>
    </to-upload>
    <to-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </to-dialog>
  </div>
</template>
<script>
import ToUpload from '../../../../element-ui/packages/upload'
import ToDialog from '../../../../element-ui/packages/dialog'

export default {
  name: 'YxtUpload',
  components: {
    ToUpload,
    ToDialog
  },
  props: {
    type: {
      type: String,
      default: () => 'default'
    },
    // 图片分页
    isPaging: {
      type: Boolean,
      default: false
    },
    payload: {
      type: [String, Array],
      default: () => ''
    },
    circle: {
      // 是否展示圆形头像 仅type为avatar有效
      type: Boolean,
      default: () => false
    },
    httpRequest: {
      // 自定义上传
      type: null
    },
    action: {
      // 上传URL
      type: String,
      default: () => ''
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    data: {
      // 上传时附带的额外参数
      type: Object,
      default: () => ({})
    },
    name: {
      // 上传的文件字段名
      type: String,
      default: () => 'file'
    },
    accept: {
      // 上传类型
      type: String,
      default: () => ''
    },
    size: {
      // 上传内容大小 单位1/MB 默认为0空代表不限制
      type: Number,
      default: () => 0
    },
    drag: {
      // 是否拖拽
      type: Boolean,
      default: () => false
    },
    limit: {
      // 上传内容个数
      type: Number,
      default: () => 4
    },
    multiple: {
      // 是否需要多选
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    fileList: {
      // 上传图片的一个数组
      type: Array,
      default: () => []
    },
    listType: {
      type: String,
      default: 'text'
    },
    autoUpload: {
      type: Boolean,
      default: () => true
    },
    showFileList: {
      // 是否显示已上传文件列表
      type: Boolean,
      default: () => false
    },
    withCredentials: {
      // 支持发送 cookie 凭证信息
      type: Boolean,
      default: () => false
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    payload: {
      handler(payload) {
        if (!payload) {
          return;
        }
        if (Array.isArray(payload)) {
          this.uploadInfo[`upload_${this.type}`] = payload;
        } else {
          this.uploadInfo[`upload_${this.type}`] = [{ url: payload }];
        }
        if (payload.length == this.limit) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      },
      deep: true,
      immediate: true
    },
    type: {
      handler(payload) {
        if (!payload) {
          return;
        }
        this.key = `upload_${payload}`;
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      uploadInfo: {
        upload_default: [],
        upload_avatar: [],
        upload_file: [],
        upload_drag: []
      },
      isShow: true,
      avatarImg: '',
      imgRegex: /\.(png|jpg|gif|jpeg|webp)$/,
      videoRegex: /\.(flv|avi|mp4|mov|mkv?rmvb)$/,
      dialogImageUrl: '',
      dialogVisible: false,
      key: ''
    };
  },
  methods: {
    handleAction(action, data) {
      this[action](data);
    },
    previewItem(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    cleanAvatar() {
      this.uploadInfo.upload_avatar = [];
    },
    deleteItem(index) {
      this.uploadInfo[this.key].splice(index, 1);
    },
    beforeUpload(file) {
      if (this.size === 0) {
        return;
      }

      const fileSize = file.size / 1024 / 1024 < this.size; // 限制小于

      return new Promise((resolve, reject) => {
        if (!fileSize && this.size !== 0) {
          if (this.events['uploadExceeds']) {
            reject(this.events['uploadExceeds'](file, this.size));
          } else {
            this.$message.error(`内容大小不可超过${this.size}MB`);
            reject();
          }
        }
        resolve(file);
      });
    },
    beforeRemove(file, fileList) {
      this.events['uploadBeforeRemove'] &&
        this.events['uploadBeforeRemove'](file, fileList);
    },
    handleExceed(files) {
      if (files.length + this.uploadInfo[this.key].length > this.limit) {
        return this.$message.error(`上传个数超过限制，最多上传${this.limit}个`);
      }
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res, file, fileList) {
      if (this.uploadInfo[this.key].length > this.limit) {
        this.$message.error(`上传个数超过限制，最多上传${this.limit}---个`);
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'to-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      const result = fileList.map(item => {
        const itemRaw = item.raw;
        let reader = new FileReader();
        reader.readAsDataURL(itemRaw);
        reader.onload = e => {
          this.$set(item, 'url', e.target.result);
          this.$set(item, 'fileType', this.fmtFileType(itemRaw.name));
          this.$set(item, 'uid', itemRaw.uid);
        };
        return item;
      });
      if (this.type === 'avatar') {
        this.uploadInfo[this.key] = result;
      }
      if (this.multiple) {
        this.uploadInfo[this.key] = [
          ...this.uploadInfo[this.key],
          ...result
        ].splice(0, this.limit);
      } else {
        this.uploadInfo[this.key].push(result[result.length - 1]);
      }

      this.events['uploadSuccess'] &&
        this.events['uploadSuccess'](
          res,
          file,
          result,
          this.uploadInfo[this.key]
        );
      if (this.type === 'default') {
        this.$refs.upload.clearFiles();
      }
      setTimeout(() => {
        loading.close();
      }, 1000);
    },
    fmtFileType(name) {
      return this.imgRegex.test(name)
        ? 'img'
        : this.videoRegex.test(name)
          ? 'video'
          : 'file';
    },
    handleError(err, file, fileList) {
      this.events['uploadError'] &&
        this.events['uploadError'](err, file, fileList);
    },
    handleRemove(file, fileList) {
      this.uploadInfo[this.key] = fileList;
      this.events['uploadRemove'] &&
        this.events['uploadRemove'](file, fileList);
    },
    handleProgress(event, file, fileList) {
      this.events['uploadProgress'] &&
        this.events['uploadProgress'](event, file, fileList);
    },
    handleChange(file, fileList) {
      this.events['uploadChange'] &&
        this.events['uploadChange'](file, fileList);
    }
  }
};
</script>
