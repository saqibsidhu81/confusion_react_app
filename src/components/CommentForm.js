import React, { useState } from 'react';
import {
    Button, Row, Col, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const ModalExample = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    return (
        <div>
            <Button color="light" className="fa fa-pencil" onClick={toggle}> Submit Comment</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label for="rating">Rating</Label>
                            <Input type="select" name="select" id="rating">
                                <option></option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="yourname">Your Name</Label>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <Label for="comment">Comment</Label>
                            <Input type="textarea" id="comment" rows="5" />
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </div>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalExample;