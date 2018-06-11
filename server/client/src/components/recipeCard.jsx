import React from 'react';
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardSubtitle, CardBody, CardTitle, ButtonGroup, Button } from "reactstrap";
import PropTypes from 'prop-types';

import deleteItem from '../actions/deleteItem';

const RecipeCard = ({ title, subtitle, description, imgURI, createdAt, deleteItem, itemId }) => {
    const removeItem = () => deleteItem(itemId);
    
    return (
        <Card>
            <CardImg top width='100%' src={imgURI ? `static.uploads/${imgURI}`: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'} alt="Card image cap" />
            <CardBody>
                <CardTitle>{ title }</CardTitle>
                <CardSubtitle>{ subtitle }</CardSubtitle>
                <CardText>{ description }</CardText>
                <small><strong>Created:</strong> { createdAt }</small>
                <hr/>
                <ButtonGroup>
                    <Button className="btn btn-dark">Edit</Button>
                    <Button className="btn btn-outline-danger" onClick={removeItem}>Delete</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
};

RecipeCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string
};

export default connect(null, { deleteItem })(RecipeCard);