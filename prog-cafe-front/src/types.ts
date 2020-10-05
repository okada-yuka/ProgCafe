type Status = 'Working' | 'Breaking'
type Progress = string

type Room = {
  id: string;
  users: string[];
}

type UserInfo = {
  name: string;
  rank: string;
  skills: string[];
  online: boolean;
  following: boolean;
  following_list?: string[];
}

type SearchResult = {
  [id: string]: UserInfo;
}

type SignInResponse = {
  id: string;
  users: string[];
}

type WebSocketResponse = {
  type: string;
}

type StatusResponse = WebSocketResponse & {
  type: 'status';
  value: Status;
  id: string;
}

type ProgressResponse = WebSocketResponse & {
  type: 'progress';
  value: Progress;
  id: string;
}

type GlobalMessageResponse = WebSocketResponse & {
  type: 'g_message';
  value: string;
  id: string;
}

type MessageResponse = WebSocketResponse & {
  type: 'i_message';
  value: string;
  from: string;
  to: string;
}

type CallStartResponse = WebSocketResponse & {
  type: 'call_start';
  value: string;
  from: string;
  to: string;
}

type CallDenyResponse = WebSocketResponse & {
  type: 'call_deny';
}

type ChatHistories = {
  [id: string]: ChatHistory | undefined;
}

type ChatHistory = ChatMessage[]

type ChatMessage = {
  from: string;
  message: string;
}

type CallStatus = 'none' | 'calling';
