// EmailFlowchart.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import EmailFlowchart from '../components/EmailFlowchart';

describe('EmailFlowchart', () => {
  test('renders EmailFlowchart component', () => {
    render(<EmailFlowchart />);
    expect(screen.getByText('Save Sequence')).toBeInTheDocument();
    // Replace 'Save Sequence' with the actual text or elements you expect to find
  });
});
