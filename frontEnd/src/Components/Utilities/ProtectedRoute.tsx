import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ModelUserInfo from "../../Models/ModelUserInfo";
import Spinner from "../Element/Spinner/Spinner";

export default function ProtectedRoute(children: any) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false)
        if (!ModelUserInfo.pseudo || ModelUserInfo.pseudo.length < 3) {
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 5000);

            return () => clearTimeout(timer);
        }

    }, []);




    return isLoading ? (
        <Spinner />
    ) : ModelUserInfo.pseudo ? (
        <Outlet />
    ) : (
        <>
            <div className="fullCenter" >
                <div>
                    <span>Your setup isnt valid, you will be redirected to the home page...</span>
                    <Spinner />
                </div>
            </div>

        </>
    );
}