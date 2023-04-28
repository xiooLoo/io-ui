import request from '../utils/request';

// app列表
export const fetchSystemList = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/system/listSystem`,
    method: 'get',
    headers: {
      accessToken: config.accessToken
    }
  });
};

// 常用功能列表
export const fetchCommonList = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/func/findCommonFuncByUserId/${'GW_202207131807481595'}`,
    method: 'get',
    headers: {
      accessToken: config.accessToken
    }
  });
};

// 待办事项列表
export const fetchTodoList = config => {
  return request({
    url: `${config.requestUrl}/portal/pf/pending/count2`,
    method: 'post',
    headers: {
      accessToken: config.accessToken
    }
  });
};
