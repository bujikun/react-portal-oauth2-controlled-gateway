import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import {  useEffect, useState } from "react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { axiosClient } from "../main";

type Route = {
  url: string;
  value: string;
};

const doIntrospection = async () =>
  axiosClient.get("/session").then((res) => res.data);

const HomePage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSessionNew, setIsSessionNew] = useState(false);
  const [isIntrospecting, setIsIntrospecting] = useState(false);
  const { data,isError,error,status,isSuccess } = useQuery({
    queryKey: ["get-session"],
    queryFn: doIntrospection,
    enabled:!isSessionNew
    // refetchInterval: 15000,

  });

  const createSession = async ()=> {
    const res = await fetch("/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operatorId: data.operatorOrganizations.operatorId,
        organizationId:
          data.operatorOrganizations.organizations[0].organizationId,
        shortcode: data.operatorOrganizations.organizations[0].shortcode,
      }),
    });
    if (res.ok) {
      setIsSessionNew(true);
    }
    return res.json();
  }

    //const session = useLoaderData();
    useEffect(() => {
      if (isSuccess && !isSessionNew) {
      createSession();
      }
    }, [isSuccess, isSessionNew, createSession]);


  //const navigate = useNavigate()
  // const session = useLoaderData();
  // useEffect(() => {
  //   if (isLoggingOut) {
  //     doLogout();
  //   }
  // }, [isLoggingOut]);

  useEffect(() => {
    if (isIntrospecting) {
      introspect();
      setIsIntrospecting(false);
    }
  }, [isIntrospecting]);

  const introspect = async () => {
    const res = await fetch("/be/organizations", {
      method: "GET",
    });

    const data = await res.json();

    console.log(data);
  };

  const doLogout = async () => {
    let res = await fetch("/csrf-token", {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      res = await fetch("/logout", {
        headers: {
          ...data,
        },
        method: "POST",
      });
      if (res.ok) {
        console.log(res);
        window.location.href = "/app";
        //navigate("/app",{replace:true})
        //return redirect("/login")
      }
    }
  };

  if(status){
    console.log(status);
    //console.log(session,isIntrospecting,isLoggingOut,isError,error);
  }

  // if (!session) {
  //   throw new Error("missing session data");
  // }

  if(!data?.user?.sub){
   //window.location.href="/app"
  }
  const routes: Route[] = [
    {
      url: `${import.meta.env.BASE_URL}/user`,
      value: "User",
    },
    {
      url: `${import.meta.env.BASE_URL}/admin`,
      value: "Admin",
    },
  ];
  return (
    <div className="flex justify-start items-center gap-4">
      <div className="flex flex-col pt-4 pb-4 px-8">
        <h1 className=" text-3xl py-4">Hey,Homepage</h1>
        <ul>
          {routes.map((route) => (
            <li key={route.url} className="p-2 text-lg">
              <NavLink
                to={route.url}
                className={({ isActive }) => {
                  return isActive ? "text-red-500" : "";
                }}
              >
                {route.value}
              </NavLink>
            </li>
          ))}
        </ul>
        {data && (
          <div className="my-3">
            <h1 className="text-2xl">Expiry</h1>
            <p className="my-2">{data.expiresIn} Seconds</p>
            <h1 className="text-2xl">User</h1>
            <p className="my-2">{data?.user?.sub}</p>
            <p className="my-2">{data?.refreshToken}</p>
          </div>
        )}
        <button
          className=" text-sm my-3 text-white bg-sky-600 px-4 py-2 rounded-sm"
          onClick={() => setIsIntrospecting(true)}
        >
          Introspecty
        </button>
        <button
          className=" text-sm text-white bg-sky-600 px-4 py-2 rounded-sm"
          onClick={() => setIsLoggingOut(true)}
        >
          Logout
        </button>
      </div>
      <Outlet />
      {/* <ProtectedRoutes /> */}
    </div>
  );
};
export default HomePage;
