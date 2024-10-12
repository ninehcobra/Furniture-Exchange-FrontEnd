export interface IChatMessage {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    image_url: string;
  };
  other: {
    id: string;
    first_name: string;
    last_name: string;
    image_url: string;
  };
  last_message: {
    created_at: string;
    id: number;
    sender_id: string;
    content: string;
    isRead: false;
  };
}
