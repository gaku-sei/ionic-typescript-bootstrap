import {Chat, Chats} from 'services';

interface ChatDetailParams extends ng.ui.IStateParamsService {
  chatId: string;
}

export class DashCtrl {
  constructor() {
  }
}

export class ChatsCtrl {
  chats: Array<Chat>;
  Chats: Chats;

  constructor(Chats) {
    this.chats = Chats.all();
    this.Chats = Chats;
  }

  remove(chat: Chat) {
    this.Chats.remove(chat);
  }
}

export class ChatDetailCtrl {
  chat: Chat | void;

  constructor($stateParams: ChatDetailParams, Chats: Chats) {
    this.chat = Chats.get(parseInt($stateParams.chatId));
  }
}

export class AccountCtrl {
  settings: {enableFriends: Boolean};

  constructor() {
    this.settings = {
      enableFriends: true
    };
  }
}
