import {
  BookingsController,
  Client,
  PaymentsController,
  StationsController,
  TripsController,
} from '@wiremock-inc/apimatic-sdkgen-demo';

const client = new Client({
  authorizationCodeAuthCredentials: {
    oAuthClientId: '123213123213',
    oAuthRedirectUri: '/adadfasdf',
    oAuthClientSecret: 'adfasfasf',
    oAuthToken: {
      accessToken: 'thing',
      tokenType: 'thing',
    },
  },
});

const stationsController = new StationsController(client);
const tripsController = new TripsController(client);
const bookingsController = new BookingsController(client);
const paymentsController = new PaymentsController(client);

export default client;

export {
  stationsController,
  tripsController,
  bookingsController,
  paymentsController,
};
