import { AxiosResponse } from 'axios'

import { request } from '~/axios/index'
type res<T> = Promise<AxiosResponse<T>['data']>

/**
 * 请求示例
 */
type Login = (data: { userName: string; passWord: string }) => ReqLogin
type ReqLogin = res<{ name: string }>
export const reqLogin: Login = (data) => {
  return <ReqLogin>(<unknown>request({
    url: '/api/login',
    method: 'post',
    data,
  }))
}
reqLogin({ userName: '1', passWord: '2' }).then((res) => res.name)
