import request from '../utils/request';

// app列表
export const fetchSystemList = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/system/listSystem`,
    method: 'get',
    headers: { ...config }
  });
};

// 用户常用所有功能
export const getAllCommonFunc = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/func/getAllCommonFunc`,
    method: 'get',
    headers: { ...config }
  });
};

// 用户常用功能列表
export const findCommonFuncByUserId = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/func/findCommonFuncByUserId/${config.enterpriseCode}`,
    method: 'get',
    headers: { ...config }
  })
}

// 添加用户常用功能
export const addUserCommonFunc = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/func/addUserCommonFunc/${config.enterpriseCode}`,
    method: 'post',
    data,
    headers: { ...config }
  })
}

// 待办事项列表
export const fetchTodoList = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/pending/count2`,
    method: 'post',
    headers: { ...config }
  });
};

// 通知公告列表
export const fetchNoticeList = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/notice/pageNotice?page=${data.page}&size=${data.size}`,
    method: 'get',
    headers: { ...config }
  });
};

// 通知公告列表
export const fetchDataCenterList = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/resourceFileFolder/file/page?page=${data.page}&size=${data.size}`,
    method: 'get',
    headers: { ...config }
  });
};

// 备忘清单列表
export function fetchRemarkList(config) {
  return request({
    url: `${config.requestUrl}/portal/pf/memorandum/list`,
    method: 'get',
    headers: { ...config }
  })
}

// [A]-备忘清单-完成
export const apiFinishRemark = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/memorandum/updateMemorandumStatus`,
    method: 'post',
    headers: { ...config },
    data
  })
}

// [A]-备忘清单-提醒模式-字典
export const apiGetByType = (config, type) => {
  return request({
    url: `${config.requestUrl}/portal/pf/dict/data/getByType/${type}`,
    method: 'get',
    headers: { ...config }
  })
}

// 备忘清单-新增
export const apiAddRemark = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/memorandum/addMemorandum`,
    method: 'post',
    headers: { ...config },
    data
  })
}

// 备忘清单-编辑
export const apiUpdateRemark = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/memorandum/updateMemorandum`,
    method: 'post',
    headers: { ...config },
    data
  })
}

// [A]-备忘清单-提醒模式-字典
export const apiDetailRemark = (config, id) => {
  return request({
    url: `${config.requestUrl}/portal/pf/memorandum/memorandumDetail/${id}`,
    method: 'get',
    headers: { ...config }
  })
}

// 备忘清单-删除
export const apiDeleteRemark = (config, id) => {
  return request({
    url: `${config.requestUrl}/portal/pf/memorandum/memorandumDelete/${id}`,
    method: 'get',
    headers: { ...config }
  })
}

// 查询公告详情
export const apiNoticeDetail = (config, id) => {
  return request({
    url: `${config.requestUrl}/portal/pf/notice/notice/${id}`,
    method: 'get',
    headers: { ...config }
  })
}

// 通知公告-编辑公告
export const apiUpdateNotice = (config, data) => {
  return request({
    url: `${config.requestUrl}/portal/pf/notice/updateNotice`,
    method: 'post',
    headers: { ...config },
    data
  })
}

// 通知公告-删除公告
export const apiDeleteNotice = (config, id) => {
  return request({
    url: `${config.requestUrl}/portal/pf/notice/deleteNotice/${id}`,
    method: 'post',
    headers: { ...config }
  })
}

// 通知公告 附件上传地址
export const urlNoticeUpload = config => {
  return `${config.requestUrl}/oss/upload/notice`
}
