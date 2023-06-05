<template>
  <to-dialog
    :title="noticeTitle"
    :visible.sync="visible"
    append-to-body
    width="60%"
    @close="close"
    z-index="1001"
  >
    <div v-if="pageShow=='detail' && form" class="notice-dialog">
      <div class="public-title">
        <p>{{ form.noticeName }}</p>
      </div>
      <div class="notice-tip">
        <div class="notice-info">发布人员：<span>{{ form.createUserName }}</span></div>
        <div class="notice-info">发布时间：{{ form.createAt }}</div>
        <div class="notice-info">浏览次数：{{ form.visitsNum }}</div>
        <div v-if="form.isCurrentUser" class="notice-btn">
          <YxtIcon class="notice-btn-ic" size="14" icon="common_line_edit" />
          <to-button type="text" @click="goEdit">编辑</to-button>
        </div>
        <div v-if="form.isCurrentUser" class="notice-btn">
          <YxtIcon class="notice-btn-ic" size="14" icon="common_line_delete" />
          <to-button type="text" @click="goDelete(form.id)">删除</to-button>
        </div>
      </div>
      <div class="notice-text">
        <div class="ql-editor" v-html="form.notice">
          {{ form.notice }}
        </div>
        <div v-if="fileList.length" class="notice-file-box">
          <div class="public-title">
            <p>公告附件：</p>
          </div>
          <div v-for="(item, index) of fileList" :key="index" class="sub_file">
            <a :href="item.url" :download="item.name">{{ item.name }}</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pageShow=='edit'" class="notice-edit">
      <div class="notice-form">
        <to-form ref="form" :model="form" label-width="95px" :rules="rules">
          <to-form-item label="公告栏目:" prop="noticeType">
            <to-select v-model="form.noticeType" placeholder="请选择公告栏目" style="width:400px">
              <to-option
                v-for="item in noticeTypeList"
                :key="item.dictCode"
                :label="item.dictKey"
                :value="item.dictCode"
              />
            </to-select>
          </to-form-item>
          <to-form-item label="公告标题:" prop="noticeName">
            <to-input v-model="form.noticeName" placeholder="不能超过100个字" style="width:400px" />
          </to-form-item>
          <to-form-item label="接收范围:" prop="receiveRange">
            <to-radio-group v-model="form.receiveRange">
              <to-radio :label="0">全平台</to-radio>
              <to-radio :label="1">本单位</to-radio>
            </to-radio-group>
          </to-form-item>
          <to-form-item label="公告正文:" prop="notice">
            <template>
              <quill-editor
                ref="myQuilEditor"
                v-model="form.notice"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              />

            </template>
          </to-form-item>
          <to-form-item label="附件上传:">
            <to-upload
              class="upload-demo"
              :action="uploadUrl"
              :headers="myHeaders"
              :data="uploadParam"
              :before-upload="beforeAttachUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="5"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              show-file-list
              :file-list="fileList"
            >
              <to-button size="small" type="primary">点击上传</to-button>
              <div slot="tip" class="to-upload__tip">支持格式：.rar .zip .pdf .doc .docx .xls .xlsx .ppt .pptx .png .jpg .bmp，单个文件不能超过20MB</div>
            </to-upload>
          </to-form-item>
          <to-form-item label="消息提醒:">
            <to-checkbox-group v-model="form.messageRemind">
              <to-checkbox label="system">系统消息</to-checkbox>
              <to-checkbox label="sms">短信通知</to-checkbox>
            </to-checkbox-group>
          </to-form-item>
          <to-form-item label="公告置顶:">
            <to-switch
              v-model="form.topNotice"
              active-color="#409EFF"
              inactive-color="#dddddd"
            />
          </to-form-item>
        </to-form>
      </div>
    </div>
    <div v-if="pageShow=='look'" class="notice-browser">
      <template>
        <to-tabs v-model="activeName" @tab-click="handleClick">
          <to-tab-pane label="浏览记录" name="first">
            <template>
              <to-table :data="tableData" border style="width: 100%">
                <to-table-column prop="orgName" label="单位" />
                <to-table-column prop="person" label="人员" />
                <to-table-column prop="time" label="浏览时间" />
              </to-table>
              <div class="notice_browser_pageBox">
                <pagination :total="Total" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />

              </div>
              <div class="notice_browser_btn">
                <to-button type="primary" @click="goDetailPage">返回</to-button>
              </div>

            </template>

          </to-tab-pane>
          <to-tab-pane label="未浏览名单" name="second">
            <template>
              <to-table :data="tableData" border style="width: 100%">
                <to-table-column prop="orgName" label="单位" />
                <to-table-column prop="person" label="人员" />
              </to-table>
              <div class="notice_browser_pageBox">
                <pagination :total="Total" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />

              </div>
              <div class="notice_browser_btn">
                <to-button type="primary" plain @click="goRemind">提醒浏览</to-button>
                <to-button type="primary" @click="goDetailPage">返回</to-button>
              </div>
            </template>

          </to-tab-pane>
        </to-tabs>
      </template>
    </div>
    <span v-if="pageShow=='edit'" slot="footer" class="dialog-footer">
      <to-button @click="goDetailPage">取 消</to-button>
      <to-button type="primary" @click="submit('form')">发 布</to-button>
    </span>
  </to-dialog>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' // 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Pagination from './Pagination'
import { apiNoticeDetail, apiUpdateNotice, apiDeleteNotice, urlNoticeUpload, apiGetByType } from '@/api/index'
export default {
  components: {
    quillEditor,
    Pagination
  },
  props: {
    requestConfig: Object,
    dialogVisible: Boolean,
    id: [Number, String],
    noticeVal: Object
  },
  data() {
    const { enterpriseCode, roleId = -1, tenantId = -1 } = JSON.parse(localStorage.getItem('tenantInfo')) || {}
    return {
      uploadUrl: urlNoticeUpload({ ...this.requestConfig }),
      myHeaders: {
        accessToken: this.requestConfig.accessToken,
        enterpriseCode: enterpriseCode ? enterpriseCode : null,
        roleId: roleId ? roleId : null,
        tenantId: tenantId ? tenantId : null
      },
      noticeTitle: '公告详情',
      edit: false,
      text: `开发的公司就看到收件付过款觉得粉色十来块感觉梵蒂冈看见了会给对方加管理层是感觉
        范德萨了克己奉公来看就发的公房的数据关联可见的市房管局是塑料袋交房的就是个老师大家分分感
        哦if就告诉的觉都历史地看。
        发个放得开是 SDK`,
      pageShow: 'detail',
      form: {
        noticeName: '',
        notice: '',
        noticeType: '',
        receiveRange: 0, // 接收范围 0全平台 1本单位
        messageRemind: [], // 消息提醒默认 0不通知 1系统消息 2短信通知
        topNotice: false // 是否置顶 默认不置顶
      },
      tempForm: {}, // 用来暂存获取到的详情，用来正确回显用户修改内容未提交未刷新时数据
      editorOption: {},
      noticeTypeList: [],
      str: '<p>测试大声讲话公房的可是机构辅导机构</p>',
      fileList: [],
      checked1: true,
      checked2: false,
      rules: {
        noticeName: [
          { required: true, message: '请输入公告标题', trigger: 'blur' },
          { max: 100, message: '长度不得超过 100 个字符', trigger: 'blur' }
        ],
        noticeType: [
          { required: true, message: '请选择公告栏目', trigger: 'change' }
        ],
        radio: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        notice: [
          { required: true, message: '请输入公告正文', trigger: 'blur' }
        ]
      },
      activeName: 'first',
      tableData: [
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        },
        {
          orgName: '西安市机关事务管理服务中心',
          person: '王军',
          time: '2020-11-06 11:39'
        }
      ],
      Total: 50,
      page: 0,
      pageSize: 10,
      browserName: '王军',
      browserNum: 18,
      uploadParam: {
        type: 1
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    visible: {
      get() {
        return this.dialogVisible
      },
      set() {
        this.$emit('close')
      }
    }
  },
  watch: {
    // 监听传入noticeVal的变化
    noticeVal: {
      handler(newVal) {
        if (newVal && Object.keys(newVal).length) {
          this.getDetail()
        }
      },
      immediate: true, // 为处理bug PT-63 做以上修改
      // 目的组件加载即运行 getDetail() 除刚进入门户页面的情况
      deep: true // 对象内部属性的监听，关键。
    }
  },

  mounted() {
    // this.str = this.escapeStringHTML(this.form.notice);
  },
  methods: {
    getDetail() {
      const config = { ...this.requestConfig }
      this.fileList = []
      apiNoticeDetail(config, this.noticeVal.id).then(res => {
        this.form = res.data
        this.tempForm = res.data
        if (res.data.fileRecordIds) {
          this.fileList = [...res.data.fileRecordIds.map(item => ({
            name: item.fileName,
            url: item.filePath,
            item: item
          }))]
        }

        this.form.fileRecordIds = this.fileList.map(x => x.item.fileSign)
        if (this.form.topNotice == 1) {
          this.form.topNotice = true
        } else {
          this.form.topNotice = false
        }
        // if (!this.form.messageRemind) {
        //   this.form.messageRemind = []
        // }
      })
    },
    // 获取公告栏目下拉选项
    getDict() {
      const config = { ...this.requestConfig }
      apiGetByType(config, 'notice_type').then(res => {
        this.noticeTypeList = res.data
      })
    },
    close() {
      this.$refs['form'] && this.$refs['form'].resetFields()
      this.$emit('close')
      this.pageShow = 'detail'
    },
    goEdit() {
      this.noticeTitle = '编辑公告'
      this.pageShow = 'edit'
      this.getDict()
    },
    onEditorReady() { // 准备编辑器

    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    // 附件列表
    fileEvent(data) {
      console.log('data', data)
    },
    beforeAttachUpload(file) {
      let names = file.name.split('.')
      names = names[names.length - 1].toLocaleLowerCase()
      const formats = ['jpeg', 'bmp', 'zip', 'rar', 'pdf', 'doc', 'png', 'docx',
        'jpg',
        'ppt',
        'pptx',
        'xls',
        'xlsx'
      ]

      const isJPG = formats.indexOf(names) > -1
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error(`上传只能是${formats.join(',')}格式!`)

        return false
      }
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 20MB!')
        return false
      }
      return isJPG && isLt2M
    },
    beforeRemove() {
      console.log('删除前')
    },
    handleRemove(file, fileList) {
      console.log('删除后fileList', fileList)
      const tempArray = []
      fileList.forEach(item => {
        if (item.item) {
          tempArray.push({
            name: item.fileName,
            url: item.filePath,
            item: item.item,
            id: item.item.fileSign
          })
        }
        if (item.response) {
          tempArray.push({
            name: item.name,
            url: item.response.data.filePath,
            item: item.response.data,
            id: item.response.data.fileSign
          })
        }
      })
      this.form.fileRecordIds = tempArray.map(x => x.id)
    },
    handlePreview() {
      console.log('删除前')
    },
    goDetailPage() {
      this.pageShow = 'detail'
      this.$refs['form'].resetFields()
      this.noticeTitle = '公告详情'
      // this.getDetail()
    },
    goLookPage() {
      this.pageShow = 'look'
    },
    handleExceed() {
      this.$message.error('最多上传5个附件')
    },
    handleSuccess(response, file, fileList) {
      const tempArray = []
      fileList.forEach(item => {
        if (item.item) {
          tempArray.push({
            name: item.fileName,
            url: item.filePath,
            item: item.item,
            id: item.item.fileSign
          })
        }
        if (item.response) {
          tempArray.push({
            name: item.name,
            url: item.response.data.filePath,
            item: item.response.data,
            id: item.response.data.fileSign
          })
        }
      })
      this.form.fileRecordIds = tempArray.map(x => x.id)
    },
    // 编辑公告提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const config = { ...this.requestConfig }
          this.form.topNotice = this.form.topNotice ? 1 : 0
          apiUpdateNotice(config, this.form).then(res => {
            if (res && res.code == '0') {
              this.$message({ type: 'success', message: '提交成功!' })
              this.close()
              this.$emit('refresh')
            } else {
              this.$message({ type: 'error', message: '操作异常' })
            }
          })
        } else {
          return false
        }
      })
    },
    goRemind() {
      const h = this.$createElement
      this.$msgbox({
        title: '操作确认',
        message: h('p', null, [
          h('h3', null, '确认发送提醒浏览消息吗？ '),
          h('p', {
            style: 'color: #666666'
          }, `${this.browserName}等${this.browserNum}人将收到系统消息通知`)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('提醒发送成功')
      }).catch(() => {
        this.$message.info('取消')
      })
    },
    goDelete(id) {
      const h = this.$createElement
      this.$msgbox({
        title: '操作确认',
        message: h('p', null, [
          h('h3', null, '确认删除该公告吗？'),
          h('p', {
            style: 'color: #666666'
          }, '该操作不可恢复')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const config = { ...this.requestConfig }
        apiDeleteNotice(config, id).then(res => {
          if (res && res.code == '0') {
            this.$message({ type: 'success', message: '已删除' })
            this.close()
            this.$emit('refresh')
          } else {
            this.$message({ type: 'error', message: '操作异常' })
          }
        })
      })
    },
    downloadFile(item) {
      let a = document.createElement('a')
      a.href = item.url
      a.download = item.name
      a.click()
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.to-dialog__header{
  background: #D8DCE3;
}
.to-dialog__footer{
  border-top: 1px solid #dddddd;
}
//查看页面
.notice-dialog{
  padding:0 15px;
  .notice-tip{
    // margin-left: 15px;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    background: rgba($color: #EBEEF3, $alpha: 0.47);
    border: 1px solid #D8DCE3;
    // opacity: 0.47;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    .notice-info{
      line-height: 40px;
      margin-right: 20px;
      color: #666666;
      span{
        color: #333333;
      }
    }
    .notice-btn{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
      color: #409EFF;
      margin-right: 20px;
      .notice-btn-ic {
        width: 8px;
        height: 8px;
      }
      img{
        margin-top: 12px;
        width: 16px;
        height: 16px;
      }
    }
  }
  .ql-editor{
    min-height: 100px;
    max-height: 400px;
    overflow-y: auto;
  }
  .ql-editor::-webkit-scrollbar{
    width: 10px;
    height: 2px;
  }
  .ql-editor::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: #dddee0;
  }
  .ql-editor::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    // border-radius: 10px;
  }
  .notice-file-box{
    .sub_file{
      line-height: 1.5;
    }
    .sub_file:hover{
      a {
        color: #409EFF;
      }
    }
  }

}
//编辑页面
.notice-edit{
  display: flex;
  flex-direction: column;
  height: 500px;
  .notice-form{
    flex: 1;
    overflow-y: auto;
  }
  .notice-form::-webkit-scrollbar{
    width: 10px;
    height: 2px;
  }
  .notice-form::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: #dddee0;
  }
  .notice-form::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    // border-radius: 10px;
  }
  .notice-form-btn{
    height: 80px;
    background: pink;
  }
}
//浏览页面
.notice-browser{
  .notice_browser_pageBox{
    display: flex;
    justify-content: flex-end;
  }
  .notice_browser_btn{
    display: flex;
    justify-content: center;
  }
}

// 公共头部
.public-title{
  font-size: 16px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;

  p {
    font-weight: 700;
    border-left: 4px solid $yxt-color-primary;
    padding-left: 8px;
  }
  .public-title_right {
    display: flex;
    color: #409EFF;
    cursor: pointer;
    img{
      width: 19px;
      height: 17px;
      margin-right: 10px;
    }
  }
}
.pageBox_center{
  display: flex;
  justify-content: center;
}
.detail-container {
  * {
    font-size: 16px;
  }
  background: #EBEEF3;

  p {
    margin: 0;
  }
  .detail_hd_container {
    background: #ffffff;
  }

  .detail_bd_container {
    margin-top: 20px;
    background: #fff;
    // 文件夹层级
    .file_jump_box{
      height: 60px;
      line-height: 60px;
      padding: 0px 20px;
      display: flex;
      color: #999999;
      border-bottom: 1px solid #EBEEF3;
      .child_box{
        cursor: pointer;
      }
      .hignColor{
        color: #666666;
      }
    }
    .detail_bd_title_box{
      display: flex;
      padding: 20px;
      justify-content: space-between;
      .detail_bd_title_left {
        display: flex;
        .upload-demo{
          margin-right: 10px;
        }
        .to-button{
          // margin-right: 20px;
        }
      }
      .detail_bd_title_right {
        display: flex;

        .to-input {
          width: 268px;
          margin-left: 10px;
        }
      }
    }
    .detail_bd_container_main{
      padding: 10px 20px;
      .table_box{
        border: 1px solid #dedede;
      }
    }


  }


  // 操作按钮
  .listof-center-right {
    display: flex;

    .listof-center-right-right {
      margin-right: 22px;
    }

    .to-button {
      border: 1px solid $yxt-color-primary;
      color: $yxt-color-primary;
    }
  }

  // 分页器
  .pager-size {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }

  // 滑过
  .listof-center:hover {
    box-shadow: 1px 2px 11px $yxt-color-white-50;
  }
}

</style>
