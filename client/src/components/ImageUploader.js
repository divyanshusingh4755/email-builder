import React from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const ImageUploader = ({ setImage }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:5050/uploadImage', formData)
      .then((response) => {
        setImage(response.data.imageURL);
      })
      .catch((error) => {
        console.error('Image upload failed', error);
      });
  };

  return (
    <Form.Group controlId="formImage">
      <Form.Label>Upload Image</Form.Label>
      <Form.Control type="file" onChange={handleImageUpload} />
    </Form.Group>
  );
};

export default ImageUploader;
