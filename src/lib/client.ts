import {TrainTravel} from "@wiremock-inc/train-travel-demo";

const client = new TrainTravel({
  serverURL: 'https://train-travel-example.wiremockapi.cloud/',
  oAuth2: 'thing'
});

const stationsController = client.stations;
const tripsController = client.trips;
const bookingsController = client.bookings;
const paymentsController = client.payments;

export default client;

export {
  stationsController,
  tripsController,
  bookingsController,
  paymentsController,
};
