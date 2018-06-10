import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Row, Col } from "reactstrap";

import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';
import SideAd from '../components/sideAd';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            isLogin: true
        }
    }

    isLoginChange = () => {
        this.setState((prevState) => ({
            isLogin: !prevState.isLogin
        }));
    }

    render() {
        return(
            <React.StrictMode>
            <React.Fragment>
            <Helmet>
            <title>Login - Recipes App</title>
            </Helmet>
            <Row noGutters>
            <Col sm="4">
                <SideAd />
            </Col>
            <Col sm="8">

            <Col sm={{ size: '6', offset: 1 }}>
            <div style={{ marginTop: '25%' }}>
            {
                this.state.isLogin ? <LoginForm redirectHandle={this.isLoginChange} /> : <RegisterForm redirectHandle={this.isLoginChange} />
            }
            </div>
            </Col>
            
            </Col>
            </Row>
            </React.Fragment>
            </React.StrictMode>
        );
    }
};

export default Login;