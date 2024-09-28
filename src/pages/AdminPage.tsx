// import { useCallback, useEffect } from "react";
// import { useAuthContext } from "../contexts/AuthContext";

const AdminPage = () => {
  // const { state, dispatch } = useAuthContext();
  // const doLogin = useCallback(() => {
  //   dispatch({
  //     type: "USER_LOGGED_IN",
  //     payload: {
  //       userId: "bujikun",
  //       token: "abcdefg",
  //     },
  //   });
  // }, [state.userId]);
  // useEffect(() => {
  //   if (!state.userId) {
  //     doLogin();
  //   }
  // }, []);

  return (
    <div className="flex flex-col justify-center  pt-4">
      <h1 className=" text-lg">AdminPage</h1>
      {/* <p className="text-lg text-sky-400 p-2 m-2">User: {state.userId}</p>
      <p className="text-lg text-sky-400 p-2 m-2">Token: {state.token}</p> */}
    </div>
  );
};
export default AdminPage;
