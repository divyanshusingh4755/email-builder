import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import ImageUploader from './ImageUploader';
import StyleControls from './StyleControls';

const EmailEditor = () => {
  const [layout, setLayout] = useState('');
  const [templateData, setTemplateData] = useState({ title: '', content: '' });
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetch initial template layout
    axios.get('http://localhost:5050/getEmailLayout').then((response) => {
      setLayout(response.data.layoutHTML);
    });
  }, []);

  const handleTextChange = (field, value) => {
    setTemplateData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTemplate = () => {
    axios
      .post('http://localhost:5050/uploadEmailConfig', templateData)
      .then(() => alert('Template saved!'))
      .catch((error) => console.error('Error saving template', error));
  };

  const handleRenderTemplate = () => {
    axios
      .post('http://localhost:5050/renderAndDownloadTemplate', templateData)
      .then((response) => {
        const link = document.createElement('a');
        link.href = `http://localhost:5050${response.data.fileURL}`;
        link.download = 'email_template.html';
        link.click();
      })
      .catch((error) => {
        console.error('Error rendering template', error);
      });
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h3>Edit Email Template</h3>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={templateData.title}
                onChange={(e) => handleTextChange('title', e.target.value)}
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={templateData.content}
                onChange={(e) => handleTextChange('content', e.target.value)}
                placeholder="Enter content"
              />
            </Form.Group>
          </Form>

          <ImageUploader setImage={setImage} />
          {image && <Image src={`http://localhost:5050${image}`} fluid />}

          <StyleControls templateData={templateData} setTemplateData={setTemplateData} />

          <Button className="mt-3" onClick={handleSaveTemplate}>Save Template</Button>
          <Button className="mt-3 ml-2" onClick={handleRenderTemplate}>Render and Download</Button>
        </Col>

        <Col>
          <h3>Live Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: layout }} />
        </Col>
      </Row>
    </Container>
  );
};

export default EmailEditor;
