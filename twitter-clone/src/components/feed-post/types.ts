import { UserInfo } from '../../models';

export interface FeedPostsProps {
  user?: UserInfo;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
