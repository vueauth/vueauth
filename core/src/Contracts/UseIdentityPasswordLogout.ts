import { Ref, ComputedRef } from 'vue-demi'

export interface UseIdentityPasswordLogoutReturn {
  logout: () => Promise<void>;
  loading: Ref<boolean>;
  hasErrors: ComputedRef<boolean>;
  errors: Ref<{
      type: string;
      message: string;
  }[]>;
  resetStandardErrors: () => void;
  resetErrors: () => void;
}

export type UseIdentityPasswordLogout = () => UseIdentityPasswordLogoutReturn
