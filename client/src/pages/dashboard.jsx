import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { 
    Button, 
    Navbar, 
    Nav, 
    NavItem, 
    Collapse, 
    NavbarBrand, 
    NavbarToggler, 
    Container, 
    ButtonGroup,
    Row,
    Col } from "reactstrap";

import { persistor } from "../config/store";

import RecipeCard from "../components/recipeCard";
import NewForm from '../components/createNewForm';
import fetchUserItems from '../actions/fetchUserItems';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            // replace with getDerivedStateFromProps
            isAuthenticated: this.props.accessToken || this.props.user || false,
            isOpen: false,
            isNewOpen: false
        };    
    }

    logOut = () => {
        persistor.purge()
        .then(() => {
            this.setState(() => ({
                isAuthenticated: false
            }))
        });
    };

    toggle = () => {
        this.setState((prevState) => ({
          isOpen: !prevState.isOpen
        }));
      }

    toggleNew = (evt) => {
        evt.preventDefault();
        this.setState((prevState) => ({
          isNewOpen: !prevState.isNewOpen
        }));
      }

      componentDidMount = () => {
        const { items } = this.props;
        
        if (!items) {
            this.props.fetchUserItems();
        }
      }
    
    render(){
        const { items, user } = this.props;
        const { isAuthenticated, isNewOpen, isOpen } = this.state;
        // you can store jsx in a variable and return in code
        // you don't have access to props though
        const alertMessage = (
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                <p>Welcome to the Ultimate Recipe App.</p>
                <hr/>
                <p className="mb-0">Your recipes will show here when you start adding them. Click on "Create new" above to begin</p>
            </div>
        );

        if (!isAuthenticated) {
            return(
                <Redirect to="/login" />
            );
        }

        return(
            <React.StrictMode>
            <Helmet>
            <title>Dashboard - Recipes App</title>
            </Helmet>
            <div>
            <Navbar color="light" light expand="md">
            <Container>
            <NavbarBrand href="/">Recipes App</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>

                <ButtonGroup>
                <NavItem>
                <Button outline color="success" onClick={this.toggleNew}>+ Create new</Button>{' '}
                </NavItem>
                <NavItem>
                        <Button onClick={this.logOut}>Logout</Button>
                        </NavItem>
                        </ButtonGroup>
                        </Nav>
                        </Collapse>
                        </Container>
            </Navbar>
            </div>

            {/* The create form */}
            <Container>
            <h4 style={{ marginTop: '1.5%'}}>Welcome, <strong>{ user && user.fullname }</strong></h4>
                <Collapse isOpen={isNewOpen}>
                    <NewForm handleOpen={this.toggleNew} />
                </Collapse>
            </Container>

            <div style={{ marginTop: '5%'}}>
            <Container>
            <Row>
            {
                // make sure there's data in the array
                items && items.length > 0 ?
                items.map((item, index) => {
                    const date = new Date(item.createdAt);
                    return (
                    <Col sm="3" key={index}>
                        <RecipeCard
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        imgURI={item.imgURI}
                        itemId={item._id}
                        createdAt={`${date.toDateString()} at ${date.toLocaleTimeString()}`}
                        />
                    </Col>
                )})
                : alertMessage
            }
            </Row>
            </Container>
            </div>
            </React.StrictMode>
        );
    }
};

const mapStateToProps = state => ({
    user: state.regUser.data || state.fetchUser.user,
    accessToken: state.fetchUser.accessToken,
    items: state.createNew.items
});

export default connect(mapStateToProps, { fetchUserItems })(Dashboard);