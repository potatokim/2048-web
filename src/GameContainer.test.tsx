import React from 'react';
import { render } from '@testing-library/react';
import GameContainer from "./GameContainer";

test('renders learn react link', () => {
  const { getByText } = render(<GameContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
