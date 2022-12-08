import { UserInfo } from './UserInfo';
import { UserProfile } from './UserProfile';

export interface AuthContextValue {
  // Auth state:
  isAuthenticated: boolean;
  // Auth methods:
  login: (userProfile: UserProfile) => Promise<void>;
  registration: (newUser: UserInfo) => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | null>;
}
