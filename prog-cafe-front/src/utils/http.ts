/* eslint-disable @typescript-eslint/camelcase */
import { endpoint } from '@/utils/constants';

const paths = {
  signin: '/signup',
  follow: '/follow',
  search: '/search',
  getUserInfo: '/user',
};

const post = (
  url: string,
  body: Record<string, unknown>,
  options: RequestInit = {},
) => fetch(url, {
  method: 'POST',
  headers: { 'content-type': 'text/plain' },
  body: JSON.stringify(body),
  ...options,
});

export const signin = (id: string) => post(`${endpoint}${paths.signin}`, { id })
  .then((res) => {
    if (!res.ok) throw new Error('Failed signin');
    return res.json();
  })
  .then((json: SignInResponse) => json);

export const follow = (self: string, target: string, following: boolean) => post(`${endpoint}${paths.follow}`, {
  id: self,
  to: target,
  type: following ? 'follow' : 'unfollow',
}).then(async (res) => {
  if (!res.ok) throw new Error(await res.text());
});

export const getUserInfo = (self: string, target: string, getFollowing: boolean) => post(`${endpoint}${paths.getUserInfo}`, {
  id: self,
  to: target,
  show_follow: getFollowing,
}).then(async (res) => {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}).then((json: UserInfo) => json);

export const search = (self: string, searchText: string) => {
  const url = new URL(`${endpoint}${paths.search}`);
  url.searchParams.append('userId', self);
  url.searchParams.append('q', searchText);

  return fetch(url.href).then((res) => res.json()).then((json: SearchResult) => json);
};
