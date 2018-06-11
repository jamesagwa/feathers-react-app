import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Form, Input } from "reactstrap";
import PropTypes from "prop-types";

import RenderField from './renderField';
import fetchUser from "../actions/fetchUser";

class LoginForm extends Component {

    // proptype validation
    static propTypes = {
        fetchUser: PropTypes.func,
        redirectHandle: PropTypes.func,
        handleSubmit: PropTypes.func,
        userToken: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ])
    }
    
    submitValue = ({  email='', password='' }) => {
        let error = {};
        let isError = false;
    
        if (email.trim() === '') {
            error.email = 'Required';
            isError = true;
        }
        
        if (password.trim() === '') {
            error.password = 'Required';
            isError = true;
        }
    
        if (isError) {
            throw new SubmissionError(error);
        } else {        
            // dispatch regUser action thats submits the form to server
            return this.props.fetchUser({ email, password });            
        }
    };

    render() {

        const { redirectHandle, handleSubmit, userToken } = this.props;
        
        if (userToken) {
                return <Redirect to="/" />;
        }

        return(
            <Form onSubmit={handleSubmit(this.submitValue)}>
    
            <h3>Log in</h3>
            <br/>
            <Field name="email" label="Email" type="email" placeholder="Your email" component={RenderField}/>        
            <Field name="password" label="Password" type="password" placeholder="Your password" component={RenderField}/>
            <Input type="submit" value="Log in" className="btn btn-dark" />
    
            <p style={{ marginTop: 20 }}>Don't have an account yet? <span onClick={redirectHandle} style={{ cursor: 'pointer', textDecoration: 'underline'}}><strong>Register</strong></span></p>
            </Form>
    
        );
    }
};


LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

const mapStateToProps = state => ({
    userToken: state.fetchUser.accessToken
});

export default connect(mapStateToProps, { fetchUser })(LoginForm);