import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function AddForm(props) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('form');
        const imgInput = document.getElementById('img');
        const img = imgInput.files[0];
        if (name && desc && img) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgSrc = event.target.result;
                props.addItem(name, desc, imgSrc);
            }
            reader.readAsDataURL(img);
            // reset formularza
            setName("");
            setDesc("");
            form.reset();
        }
        else {
            alert("Wypełnij wszystkie pola formularza!");
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} id="form">
                <Form.Control type="file" accept="image/png, image/jpeg" id="img" />
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Name"
                        aria-label="Name"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Form.Control
                        placeholder="Description"
                        aria-label="Description"
                        id="desc"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                    />
                    <Button variant="primary" type="submit">Add item</Button>
                </InputGroup>
            </Form>
        </div>
    )
}