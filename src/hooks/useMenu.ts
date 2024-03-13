import { IconType } from 'react-icons';
import { BiTargetLock } from 'react-icons/bi';
import { FiCrosshair, FiHome, FiPlusCircle, FiTarget, FiUsers } from 'react-icons/fi';
import { GiPadlock } from 'react-icons/gi';

import { useAuth } from '../contexts/auth';
import storesFilter from '../utils/stores-filter';

interface Screen {
  name: string;
  path: string;
  Icon: IconType;
}

const home = { name: 'Início', path: '/home/', Icon: FiHome };
const goals = { name: 'Meta', path: '/meta/', Icon: BiTargetLock };
const goalsFranchisee = { name: 'Meta Franqueado', path: '/meta-franqueado/', Icon: FiCrosshair };
const goalsSection = { name: 'Meta Seção', path: '/meta-secao/', Icon: FiTarget };
const goalsTeam = { name: 'Meta Equipe', path: '/meta-equipe/', Icon: FiPlusCircle };
const usersScreen = { name: 'Usuários', path: '/users/', Icon: FiUsers };
const restrictions = { name: 'Restrições de acesso', path: '/restrictions/', Icon: GiPadlock };

function useMenu(): Screen[] {
  const { user } = useAuth();

  const permissionFranchisee =
    user?.userParams &&
    user.userParams.filter((supervisor) => supervisor.name === 'SYSSUPERVISOR') &&
    user?.companyId &&
    storesFilter.includes(user.companyId);

  const isMarket =
    (user?.groups?.some((g) => ['19'].some((i) => i === g.id)) && !permissionFranchisee) || user?.issuperuser;
  const isRetail =
    (user?.groups?.some((g) => ['12', '3'].some((i) => i === g.id)) && !permissionFranchisee) || user?.issuperuser;
  const isFranchisee = permissionFranchisee || user?.issuperuser;

  const hasAccessToUser = user?.issuperadmin || user?.canCrudUsers || user?.issuperuser;

  const market = isMarket ? [goalsSection] : [];
  const retail = isRetail ? [goals, goalsTeam] : [];
  const franchisee = isFranchisee ? [goalsFranchisee] : [];
  const users = hasAccessToUser ? [usersScreen, restrictions /* usersGroups */] : [];

  const screens = [home, ...market, ...retail, ...franchisee, ...users];

  if (user?.canAccessBackoffice) return screens;

  return [];
}

export default useMenu;
