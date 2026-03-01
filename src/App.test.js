import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => {
    const React = require('react');
    return {
      BrowserRouter: ({ children }) => <div>{children}</div>,
      Routes: ({ children }) => <div>{children}</div>,
      Route: ({ element }) => element ?? null,
      Link: ({ children, ...props }) => <a {...props}>{children}</a>,
      useNavigate: () => jest.fn(),
    };
  },
  { virtual: true }
);

jest.mock('./component/pages/Homepage', () => () => <div>Home Page</div>);
jest.mock('./component/sell/post', () => () => <div>Post Page</div>);
jest.mock('./component/sell/attribute', () => () => <div>Attribute Page</div>);
jest.mock('./component/pages/SearchPage', () => () => <div>Search Page</div>);
jest.mock('./component/sell/ListingDetails', () => () => <div>Listing Details</div>);
jest.mock('./component/profile/PublicProfile', () => () => <div>Public Profile</div>);
jest.mock('./component/pages/PrivacyPolicy', () => () => <div>Privacy Policy</div>);
jest.mock('./component/pages/TermsAndConditions', () => () => <div>Terms And Conditions</div>);
jest.mock('./component/pages/ContactUs', () => () => <div>Contact Us</div>);
jest.mock('./component/pages/AboutUs', () => () => <div>About Us</div>);

jest.mock('firebase/auth', () => {
  const actual = jest.requireActual('firebase/auth');
  return {
    ...actual,
    onAuthStateChanged: (_auth, callback) => {
      callback(null);
      return jest.fn();
    },
    signInWithEmailAndPassword: jest.fn(),
  };
});

test('renders home route content', () => {
  render(<App />);
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});
