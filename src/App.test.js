import { render, screen } from '@testing-library/react';
import App from './App';


test('Testing location form is created', () => {

  render(<App />);

  const form = screen.getByRole("form");
  expect(form).toBeInTheDocument();
});
