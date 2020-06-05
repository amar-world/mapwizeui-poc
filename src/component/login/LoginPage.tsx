import React from "react";
import './LoginPage.css';
import Lineage from '../../images/Lineage.png';
import { RouteComponentProps } from "react-router-dom";
import { Button } from "antd";

interface ILoginPageState {

}
interface ILoginPageProps extends RouteComponentProps {

}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState>{
    loginButtonClicked=()=>{
        this.props.history.replace("/dashboard");
    }
    render() {
        return (<div>
            <div className="login-page">
                <div className="login-page-content">
                    <img src={Lineage} alt="Cinque Terre" height="55" width="110" />
                    <Button className="button-login" onClick={this.loginButtonClicked}>SKUs</Button>
                </div>
            </div>
        </div>)
    }

}

export default LoginPage;