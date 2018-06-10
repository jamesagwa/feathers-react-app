import React from 'react';
import { FormGroup, Label, Input } from "reactstrap";

// renderField component to be passed to the redux form
const RenderField = ({label, input, type, placeholder, meta:{touched, error}}) => (
    <FormGroup>
    <Label>{label}</Label>
    <Input {...input} type={type} placeholder={placeholder}/>
    {
        touched && error &&
        <span>{error}</span>
    }
    </FormGroup>
);

export default RenderField