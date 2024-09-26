import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import H2 from '../components/typeography/H2';

const HomePage: Component = () => {
  return (
    <div class="text-left max-w-2xl mx-auto">
      <H2>Welcome to the WireMock train travel demo app</H2>
      <p class="mb-4">
        This application was developed by WireMock and is based on the Train
        travel{' '}
        <a
          href="https://bump.sh/bump-examples/doc/train-travel-api"
          class="text-blue-400 hover:text-gray-300 hover:underline"
        >
          OpenAPI spec produced by Bump.sh
        </a>
        .
      </p>

      <p class="mb-4">
        You can get started by{' '}
        <A
          href="/booking/new"
          class="text-blue-400 hover:text-gray-300 hover:underline"
        >
          searching for available train trips and
        </A>{' '}
        then making a booking.
      </p>
    </div>
  );
};

export default HomePage;
