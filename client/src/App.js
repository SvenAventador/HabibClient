import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import {useUser} from "./state/UserStore";
import {TailSpin} from "react-loader-spinner";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    let {
        checkUser,
    } = useUser()

    React.useEffect(() => {
        setTimeout(() => {
            checkUser()
                .finally(() => {
                    setIsLoading(false)
                })
        }, 2000)
    }, [checkUser])

    if (isLoading)
    {
        return <div className={"flex"}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 100 + "%",
                        width: 100 + "%"
                    }}>
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
