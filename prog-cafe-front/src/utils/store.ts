import Vue from 'vue';
import { isDevelopment } from '@/utils/constants';
import Connection from '@open-ayame/ayame-web-sdk/src/connection/index';
import { getAvatarIconUrl, getGroupChatId } from './utils';
import { isNotifiable } from './notification';
import { connect } from './webrtc';

// ws event handlers
const wsOnOpen = (str: Store) => () => {
  console.log('ws open');
  str.wsSend({
    type: 'enter',
    id: str.githubId,
    roomid: str.roomId,
  });
};
const wsOnClose = () => console.log('ws close');
const wsOnError = (err: Event) => console.error('ws error', err);
const wsOnMessage = (str: Store) => (message: MessageEvent) => {
  /* eslint-disable no-param-reassign */
  const json = JSON.parse(message.data);
  console.log('ws message', json.type, json);
  const histories = str.chatHistories;

  switch (json.type) {
    case 'newuser':
      if (json.id === str.githubId) break;
      str.users.push(json.id);
      str.chatHistories[json.id] = [];
      break;
    case 'status':
      str.userStatus[json.id] = json.value;
      break;
    case 'progress':
      str.progress[json.id] = json.value;
      break;
    case 'g_message': {
      if (json.id === str.githubId) break;
      const chatId = getGroupChatId(json.roomid || '');
      histories[chatId]?.push({
        from: json.id,
        message: json.value,
      });
      str.chatHistories = { ...histories };

      isNotifiable.then(() => {
        const notif = new Notification('Group chat', {
          icon: getAvatarIconUrl(json.id),
          body: json.value,
        });
        notif.addEventListener('error', console.error);
      });
    }
      break;
    case 'i_message':
      if (!histories[json.from]) histories[json.from] = [];
      histories[json.from]?.push({
        from: json.from,
        message: json.value,
      });
      str.chatHistories = { ...histories };

      isNotifiable.then(() => {
        const notif = new Notification(json.from, {
          icon: getAvatarIconUrl(json.from),
          body: json.value,
        });
        notif.addEventListener('error', console.error);
      });
      break;
    case 'call_start':
      if (str.callId) break;
      str.callId = json.value;
      if (str.callStatus === 'none') {
        str.callTarget = json.from;
      } else {
        str.callTarget = json.to;
        str.callStart();
      }
      break;
    case 'call_deny':
    case 'call_end':
      str.callId = null;
      str.callTarget = null;
      str.callStatus = 'none';
      str.callConn?.disconnect();
      str.callConn = null;
      str.partnerStream = null;
      break;
    case 'leave':
      if (str.users.includes(json.id)) {
        str.users = str.users.filter((user) => user !== json.id);
      }
      break;
    default:
  }
  /* eslint-enable no-param-reassign */
};

export class Store {
  loading = false
  ws: WebSocket | null = null
  callStatus: CallStatus = 'none'
  callTarget: string | null = null
  callId: string | null = null
  callConn: Connection | null = null
  partnerStream: MediaStream | null = null
  audioElement: HTMLAudioElement | null = null
  roomId: string | null = null
  activeTime = 0
  stopping = true
  status: Status = 'Working'
  users: string[] = ['ssssota', 'KenyaSugimoto', 'okada-yuka', 'wakudar', 'gojiteji', 's-hijiri0311']
  githubId: string | null = null
  searchResults: SearchResult | null = null
  progress: Record<string, number> = {}
  userStatus: Record<string, string> = {}
  chatHistories: ChatHistories = {
    _group_: [ // eslint-disable-line @typescript-eslint/camelcase
      { from: 'ssssota', message: 'Hi' },
      { from: 'kenyaSugimoto', message: 'Hi sota' },
      { from: 'wakudar', message: '日本語喋らないの？' },
    ],
  }

  enterRoom(id: string, users: string[]): void {
    this.roomId = id;
    this.users = users;
    this.initChatHistories(id, users);
    this.initWebSocket();
  }

  initChatHistories(id: string, users: string[]): void {
    [getGroupChatId(id), ...users].forEach((chatId) => {
      if (this.chatHistories[chatId] == null) {
        this.chatHistories[chatId] = [];
      }
    });
  }

  initWebSocket() {
    this.ws = new WebSocket(
      isDevelopment
        ? 'wss://prog-cafe.herokuapp.com/ws'
        : 'wss://obscure-ridge-57256.herokuapp.com/ws',
    );
    this.ws.addEventListener('open', wsOnOpen(this));
    this.ws.addEventListener('close', wsOnClose);
    this.ws.addEventListener('error', wsOnError);
    this.ws.addEventListener('message', wsOnMessage(this));
  }

  exitRoom(): void {
    this.roomId = null;
    this.ws?.close();
    this.ws = null;
  }

  wsSend(body: Record<string, unknown>) {
    if (this.ws?.readyState !== WebSocket.OPEN) return;
    this.ws?.send(JSON.stringify(body));
  }

  sendMessage(chatId: string, content: string) {
    if (!this.githubId) return;
    const isGroup = chatId.match(/_group_([0-9a-z]+)/i);
    const histories = this.chatHistories;
    if (!histories[chatId]) histories[chatId] = [];
    histories[chatId]?.push({
      from: this.githubId,
      message: content,
    });
    this.chatHistories = { ...histories };
    this.wsSend({
      type: isGroup ? 'g_message' : 'i_message',
      value: content,
      id: isGroup ? this.githubId : undefined,
      roomid: isGroup ? isGroup[1] : undefined,
      from: !isGroup ? this.githubId : undefined,
      to: !isGroup ? chatId : undefined,
    });
  }

  sendProgress() {
    if (!this.githubId) return;
    this.wsSend({
      type: 'progress',
      value: this.activeTime,
      id: this.githubId,
      roomid: this.roomId,
    });
  }

  sendStatus(status: string) {
    if (!this.githubId) return;
    this.wsSend({
      type: 'status',
      value: status,
      id: this.githubId,
      roomid: this.roomId,
    });
  }

  callRequest(target: string) {
    if (!this.githubId) return;
    this.callStatus = 'calling';
    this.wsSend({
      type: 'call_request',
      from: this.githubId,
      to: target,
    });
  }

  callDeny() {
    if (!this.githubId || !this.callTarget) return;
    this.wsSend({
      type: 'call_deny',
      from: this.githubId,
      to: this.callTarget,
    });
    this.callId = null;
    this.callTarget = null;
    this.callStatus = 'none';
    this.callConn?.disconnect();
    this.callConn = null;
    this.partnerStream = null;
  }

  async callStart() {
    if (!this.callId) return;
    console.log('call id', this.callId);
    this.callStatus = 'calling';
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log('self stream', stream);
        this.callConn = connect(this.callId as string, stream);
        this.callConn.on('addstream', (e: RTCTrackEvent) => {
          console.log('stream added', e);
          [this.partnerStream] = e.streams;

          this.audioElement = document.createElement('audio');
          this.audioElement.style.position = 'fixed';
          this.audioElement.style.bottom = '0';
          this.audioElement.style.left = '0';

          this.audioElement.controls = true;
          this.audioElement.autoplay = true;
          [this.audioElement.srcObject] = e.streams;
          document.body.appendChild(this.audioElement);
        });
      });
  }

  callEnd() {
    if (!this.githubId || !this.callTarget) return;
    this.wsSend({
      type: 'call_end',
      from: this.githubId,
      to: this.callTarget,
    });
    this.callId = null;
    this.callTarget = null;
    this.callStatus = 'none';
    this.callConn?.disconnect();
    this.callConn = null;
    this.partnerStream = null;
    if (this.audioElement) document.body.removeChild(this.audioElement);
  }
}

export const store = Vue.observable(new Store());
