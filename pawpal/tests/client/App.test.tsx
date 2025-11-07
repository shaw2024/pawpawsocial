import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/client/App';

test('renders the hero section with dog paws and tagline', () => {
  render(<App />);
  const heroText = screen.getByText(/join the community/i);
  const dogPaws = screen.getByAltText(/dog paws/i);
  
  expect(heroText).toBeInTheDocument();
  expect(dogPaws).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText(/home/i);
  const timelineLink = screen.getByText(/timeline/i);
  const profileLink = screen.getByText(/profile/i);
  const loginLink = screen.getByText(/login/i);
  const signupLink = screen.getByText(/signup/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(timelineLink).toBeInTheDocument();
  expect(profileLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
  expect(signupLink).toBeInTheDocument();
});