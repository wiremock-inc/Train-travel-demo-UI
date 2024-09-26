import {
  BookingsController,
  Client,
  Configuration,
  PaymentsController,
  StationsController,
  TripsController,
} from '@wiremock-inc/apimatic-sdkgen-demo';
import { createEffect, createSignal } from 'solid-js';

const DEFAULT_HOST = 'wm-train-travel.wiremockapi.cloud';

const storedHost = () => {
  return window.localStorage.getItem('overrideHost') ?? DEFAULT_HOST;
};
const [host, setHost] = createSignal<string | false>(storedHost());

createEffect(() => {
  if (host()) {
    window.localStorage.setItem('overrideHost', host() as string);
  }
});

let client;

let stationsController: StationsController;
let tripsController: TripsController;
let bookingsController: BookingsController;
let paymentsController: PaymentsController;

const protocolRegexp = /https|http:\/\//;

createEffect(() => {
  let config: Partial<Configuration> = {
    oAuthClientId: '123213123213',
    oAuthRedirectUri: '/adadfasdf',
    oAuthClientSecret: 'adfasfasf',
    oAuthToken: {
      accessToken: 'thing',
      tokenType: 'thing',
    },
  };

  if (!!host()) {
    config.host = host() as string;
  }

  client = new Client(config);
  stationsController = new StationsController(client);
  tripsController = new TripsController(client);
  bookingsController = new BookingsController(client);
  paymentsController = new PaymentsController(client);
});

export {
  DEFAULT_HOST,
  setHost,
  host,
  stationsController,
  tripsController,
  bookingsController,
  paymentsController,
};
