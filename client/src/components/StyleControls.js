import React from 'react';
import { Form } from 'react-bootstrap';

const StyleControls = ({ templateData, setTemplateData }) => {
  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData({
      ...templateData,
      styles: {
        ...templateData.styles,
        [name]: value,
      },
    });
  };

  return (
    <div className="mt-4">
      <h5>Style Controls</h5>
      <Form.Group controlId="formFontSize">
        <Form.Label>Font Size</Form.Label>
        <Form.Control
          as="select"
          name="fontSize"
          value={templateData.styles?.fontSize || '16px'}
          onChange={handleStyleChange}
        >
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formTextColor">
        <Form.Label>Text Color</Form.Label>
        <Form.Control
          type="color"
          name="color"
          value={templateData.styles?.color || '#000000'}
          onChange={handleStyleChange}
        />
      </Form.Group>

      <Form.Group controlId="formTextAlign">
        <Form.Label>Text Alignment</Form.Label>
        <Form.Control
          as="select"
          name="alignment"
          value={templateData.styles?.alignment || 'left'}
          onChange={handleStyleChange}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default StyleControls;
