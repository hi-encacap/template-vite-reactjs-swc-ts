import { ComponentType, ReactNode } from "react";

import { userSelector } from "@app/selectors/common";
import { UserRole } from "@constants/auth";

import useSelector from "../hooks/useSelector";

interface WithRoleProps {
  roles: UserRole[];
  fallback?: ReactNode;
}

type WithRoleComponentType<P = Record<string, string>> = ComponentType<P & WithRoleProps>;

const withRole = <P extends object>(Component: WithRoleComponentType<P>): WithRoleComponentType<P> => {
  const WithRole: WithRoleComponentType<P> = (props) => {
    const user = useSelector(userSelector);
    const { roles, fallback } = props;

    if (!user || !roles.includes(user.role)) {
      return fallback || null;
    }

    return <Component {...props} />;
  };

  return WithRole;
};

export default withRole;
