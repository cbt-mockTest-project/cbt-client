import {
  EHS_AIR_EXAM_IDS,
  EHS_CONSTRUCTION_EXAM_IDS,
  EHS_DANGEROUS_EXAM_IDS,
  EHS_SAFE_EXAM_IDS,
  EHS_SAFE_INDUSTRIAL_EXAM_IDS,
} from '@lib/constants/ehsMaster';
import useAuth from './useAuth';

/**
 * roleId
 * 1: basic
 * 2: x
 * 3: free
 * 4: ehs-master-safe
 */
const useRoleCheck = () => {
  const { user } = useAuth();
  const handleRoleCheck = (roleIds: number[]) => {
    if (!user) return false;
    if (user) {
      return roleIds.every((roleId) =>
        user.userRoles.some((userRole) => roleId === userRole.role.id)
      );
    }
    return false;
  };

  const handleCheckExamAccess = (currentExamIds: number[]) => {
    if (currentExamIds.some((id) => EHS_SAFE_EXAM_IDS.includes(id)))
      return handleRoleCheck([4]);
    if (currentExamIds.some((id) => EHS_SAFE_INDUSTRIAL_EXAM_IDS.includes(id)))
      return handleRoleCheck([5]);
    if (currentExamIds.some((id) => EHS_DANGEROUS_EXAM_IDS.includes(id)))
      return handleRoleCheck([6]);
    if (currentExamIds.some((id) => EHS_AIR_EXAM_IDS.includes(id)))
      return handleRoleCheck([7]);
    return true;
  };

  return {
    handleRoleCheck,
    handleCheckExamAccess,
  };
};

export default useRoleCheck;
