import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.userId) {
      navigate(`${import.meta.env.BASE_URL}`, { replace: true });
    }
  }, [navigate, state.userId]);
  console.log("PROTECTED");

  return <>{children}</>;
};
export default ProtectedRoute;
