import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTokenFromWebWorker } from 'react-router-dom/webWorker';

interface ProtectedProps {
    children: ReactNode;
    authentication?: boolean;
}

interface RootState {
    auth: {
        status: boolean;
    };
}

export default function Protected({ children, authentication = true }: ProtectedProps) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: RootState) => state.auth.status)

    
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== true) {
            navigate("/");
        }
        setLoader(false);

    }, [authStatus, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}



// const token = await getTokenFromWebWorker();
//   if (!token) {
//     throw new Response("", { status: 401 });
//   }
//   return token;
// }