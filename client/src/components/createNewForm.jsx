import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form, Input, InputGroup, Col, Row } from "reactstrap";
import { Field, reduxForm, SubmissionError, reset } from "redux-form";
import Dropzone from "react-dropzone";
import PropTypes from 'prop-types';

import RenderField from './renderField';
import addNew from '../actions/addNew';

class NewForm extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
        }
    }

    // proptype validation
    static propTypes = {
        handleSubmit: PropTypes.func,
        handleOpen: PropTypes.func,
        addNew: PropTypes.func
    }

    // onDrop for the dropzone component
    onDrop = files => {

        const reader = new FileReader(); //using FileReader Api to read the contents of the file
        let formData = new FormData();

        reader.onload = () => {
            const fileAsDataUrl = reader.result;

            formData.append('uri', fileAsDataUrl); //append to formdata with key 'uri'

            this.setState(() => ({
                files, //usually an array of files
                fileData: formData
            }));

        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(files[0]);
        
    };

    // clear the image preview data
    clearImage = (file=false) => {
        if (file) {
            window.URL.revokeObjectURL(file.preview);
            this.setState(() => ({
                files: []
            }));
        }
        
    }

    clearOnClose = () => {
        this.props.handleOpen();
        this.clearImage();
    }

    // function with passed value fro redux-form
    submitValue = ({  title='', subtitle='', description='' }) => {
        let error = {};
        let isError = false;
    
        if (title.trim() === '') {
            error.title = 'Required';
            isError = true;
        }
    
        if (isError) {
            throw new SubmissionError(error);
        } else {        
            // dispatch addNew action thats submits the form data to the server and reset the form
            this.props.addNew({ title, subtitle, description, imgURI: this.state.fileData || '' });
            this.clearImage(this.state.files[0]);
            this.props.reset('new-form');
        }
    };

    render() {
        const { handleSubmit } = this.props;
        const { files } = this.state;

        return(
            <Form onSubmit={handleSubmit(this.submitValue)}>
                    <Row className="border p-3">
                        <Col sm="4">
                        <Dropzone 
                            accept="image/jpeg, image/png"
                            multiple={false}
                            onDrop={ this.onDrop }
                            style={{ 
                                width:'100%', 
                                border: '1px dashed #CCC', 
                                borderRadius: 5,
                                height: '100%',
                                textAlign: 'center'
                            }}
                            acceptStyle={{
                                borderColor:'#28a745'
                            }}
                            rejectStyle={{
                                borderColor: 'red'
                            }}
                            >
                            {
                                // preview the image on drop
                                files[0] ?
                                    <img src={`${files[0].preview}`} width='100%' alt={`${files[0].name}`} />
                                    : <p style={{ marginTop: '30%' }}>Drag & drop photo here <br/>Or click to select photo <br/> <small>(JPEG and PNG files only)</small></p>
                            }
                            </Dropzone>
                        </Col>
                        <Col sm="8">
                            <Field name="title" label="Title" type="text" placeholder="Recipe title" component={RenderField}/>
                            <Field name="subtitle" label="Sub-Title" type="text" placeholder="Subtitle" component={RenderField}/>
                            <Field name="description" label="Description" type="text" placeholder="Short description about recipe" component={RenderField}/>
                            <InputGroup>
                            <Input type="submit" value="Create" className="btn btn-dark" />
                            <Input type="reset" value="Close" className="btn btn-outline-dark" onClick={this.clearOnClose} />
                            </InputGroup>
                        </Col>
                    </Row>
            </Form>
        );
    }
}

NewForm = reduxForm({
    form: 'new-form'
})(NewForm);

export default connect(null, { addNew, reset })(NewForm);