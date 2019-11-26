import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
//import RenderDish from './RenderDishComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



function RenderComments({ comments, addComment, dishId }) {
    console.log("Render Comments: ", comments);
    const standardDateFormat = { year: 'numeric', month: 'short', day: '2-digit' };

    if (comments) {
        const dishComments = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                            {new Intl.DateTimeFormat('en-US',
                        standardDateFormat).format(new Date(Date.parse(comment.date)))} </p>
                </li>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <ul className="list-unstyled">
                    <h4>Comments</h4>
                    {dishComments}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />

            </div>
        );

    } else {
        return <div></div>;
    }

}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        // console.log('Current State is: ' + JSON.stringify(values));
        //alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }



    render() {
        const SpanStyle = { fontSize: "14px", marginRight: "3px" };
        return (
            <div>
                <Button outline className="btn btn-outline-secondary" type="submit" onClick={this.toggleModal}>
                    <span className="fas fa-pencil" style={SpanStyle}></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="contactType"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="5"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

function RenderDish({ dish }) {
    if (dish) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return <div></div>;
    };

}

const DishDetail = (props) => {
    console.log("Render Comments", props.dish);
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />

                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />

                </div>
            </div>
        );
    } else {
        return <div></div>;
    };
};

export default DishDetail;