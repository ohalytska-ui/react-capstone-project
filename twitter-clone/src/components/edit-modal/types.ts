export interface EditModalProps {
  isModalOpen: boolean;
  tweetText: string;
  tweetId: string;
  onCancel: () => void;
  onOk: (tweetId: string, tweetText: string) => Promise<void>;
}
