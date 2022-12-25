import { UserInfo } from '../../models';

export interface FeedTextAreaProps {
  user?: UserInfo;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
