export const CHAT_WIDGET_DEFAULT_CONFIG = {
  direction: 'ltr',
  button: {
    position: 'right',
    backgroundColor: '#3B81F6',
    horizontal: 20,
    bottom: 20,
    size: 'medium',
    iconColor: 'white',
    customIconSrc:
      'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
  },
  chatWindow: {
    welcomeMessage: 'Hello! This is custom welcome message',
    backgroundColor: '#ffffff',
    height: 700,
    width: 400,
    fontSize: 16,
    poweredByTextColor: '#303235',
    botMessage: {
      name: 'QKIT CHAT AI',
      backgroundColor: '#f7f8ff',
      textColor: '#303235',
      showAvatar: true,
      avatarSrc:
        'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
    },
    userMessage: {
      backgroundColor: '#3B81F6',
      textColor: '#ffffff',
      showAvatar: true,
      avatarSrc:
        'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
    },
    textInput: {
      placeholder: 'Type your question',
      backgroundColor: '#ffffff',
      textColor: '#303235',
      sendButtonColor: '#3B81F6',
    },
  },
};
