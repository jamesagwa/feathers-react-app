import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Form, Input } from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form";
import PropTypes from 'prop-types';

import regUser from '../actions/regUser';
import RenderField from './renderField';

class RegisterForm extends Component {

    // proptype validation
    static propTypes = {
        handleSubmit: PropTypes.func,
        regUser: PropTypes.func,
        redirectHandle: PropTypes.func,
        user: PropTypes.object
    }

    // function with passed value fro redux-form
    submitValue = ({  fullname='', email='', password='' }) => {
    let error = {};
    let isError = false;

    if (fullname.trim() === '') {
        error.fullname = 'Required. Please provide a name';
        isError = true;
    }

    if (email.trim() === '') {
        error.email = 'Required. Please provide an email';
        isError = true;
    }
    
    if (password.trim() === '') {
        error.password = 'Required. Enter password';
        isError = true;
    }

    if (isError) {
        throw new SubmissionError(error);
    } else {        
        // dispatch regUser action thats submits the form to server
        return this.props.regUser({ fullname, email, password });
    }
};

render() {
    // handleSubmit props is from the redux-form
    const { handleSubmit, redirectHandle, user } = this.props;

    if (user && user._id) {
        return <Redirect to="/" />
    }

    return(
        <React.Fragment>
            <Form onSubmit={handleSubmit(this.submitValue)}>
            
            <h3>Register</h3>
            <br/>
                <Field name="fullname" label="Full Name" type="text" placeholder="Your name in full" component={RenderField}/>
                <Field name="email" label="Email" type="email" placeholder="Your email" component={RenderField}/>
                <Field name="password" label="Password" type="password" placeholder="password" component={RenderField}/>
                <Input type="submit" value="Continue" className="btn btn-dark" />

                <p style={{ marginTop: 20 }}>Already registered? <span onClick={redirectHandle} style={{ cursor: 'pointer', textDecoration: 'underline'}}><strong>Log in</strong></span></p>
            </Form>
        </React.Fragment>
    );
}
};

// decorate the form with redux-form and export it as default
// always use the form key by default
RegisterForm = reduxForm({
    form: 'register', //a unique name for the form
})(RegisterForm);

const mapStateToProps = state => {
    const { user, error } = state.regUser;
    return {
        user,
        error,
    }
};

export default connect(mapStateToProps, { regUser })(RegisterForm);