import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import {useUser} from "./state/UserStore";
import {TailSpin} from "react-loader-spinner";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    let {
        checkUser,
        user
    } = useUser()

    React.useEffect(() => {
        setTimeout(() => {
            checkUser().finally(() => {setIsLoading(false)})
        }, 2000)
    }, [checkUser,user])

    if (isLoading)
    {
        return <div className="loader">
            <TailSpin
                height="100"
                width="80"
                color="#0F3072"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    return (
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    );
};

export default App;
