/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';

import './index.css';
import App from './App';
import Home from './pages/Home';
import BookingPage from './pages/Booking';
import Payment from './pages/Payment';

const root = document.getElementById('root');

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/booking/:trip_id" component={BookingPage} />
      <Route path="/payment/:booking_id" component={Payment} />
    </Router>
  ),
  root!,
);
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}
