import { groupChatId } from './constants';

export const getAvatarIconUrl = (githubId: string) => `https://avatars.githubusercontent.com/${githubId}`;

export const getShibaImageUrl = (githubId: string) => `https://grass-graph.moshimo.works/images/${githubId}.png`;

export const getGroupChatId = (roomId: string) => `${groupChatId}_${roomId}`;

/**
 * Example
 * ```
 * console.log(zeroPadding(5, 2)); // -> "05"
 * console.log(zeroPadding(109, 5)); // -> "00109"
 * ```
 * @param num {number} - target number
 * @param len {number} - padding length
 */
export const zeroPadding = (num: number, len: number): string => (new Array(len).fill('0').join('') + num).slice(-len);
