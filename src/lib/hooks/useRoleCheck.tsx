import { EHS_SAFE_EXAM_IDS } from '@lib/constants/ehsMaster';
import useAuth from './useAuth';

/**
 * roleId
 * 1: basic
 * 2: x
 * 3: free
 * 4: ehs-master-safe
 */
const useRoleCheck = () => {
  const { user, handleCheckLogin } = useAuth();
  const handleRoleCheck = (roleIds: number[]) => {
    if (handleCheckLogin() && user) {
      return roleIds.every((roleId) =>
        user.userRoles.some((userRole) => roleId === userRole.role.id)
      );
    }
    return false;
  };

  const handleCheckExamAccess = (currentExamIds: number[]) => {
    // 현재 접근하려는 시험의 id가 EHS_SAFE_EXAM_IDS에 있으면 권한체크
    if (currentExamIds.some((id) => EHS_SAFE_EXAM_IDS.includes(id)))
      return handleRoleCheck([4]);
    return true;
  };
  return {
    handleRoleCheck,
    handleCheckExamAccess,
  };
};

export default useRoleCheck;
