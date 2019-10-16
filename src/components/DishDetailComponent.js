import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    renderComments(dish) {
        if (dish != null) {
            const comments = dish.comments.map((comment) => (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {comment.date}</p>
                </li>
            ))

            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">{comments}</ul>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )

        }
    }

    render() {
        const { dish } = this.props;
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md 5 m-1">
                    {this.renderComments(dish)}
                </div>
            </div>
        )
    }

}

export default DishDetail;