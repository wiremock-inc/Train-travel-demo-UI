import {Component, createResource, JSX,} from 'solid-js';
import {A, useNavigate, useSearchParams} from '@solidjs/router';
import H2 from '../components/typeography/H2';
import {stationsController, tripsController} from '../lib/client';
import {Trip} from '@wiremock-inc/apimatic-sdkgen-demo';

const fetchStations = async () => {
    const response = await stationsController.getStations();
    return response.result.data;
};

const fetchTrips = async (state: {
    from?: string;
    to?: string;
    date?: string;
}) => {
    if (state.from && state.to && state.date) {
        const response = await tripsController.getTrips(
            state.from,
            state.to,
            state.date,
        );

        return response.result.data;
    }
    return false;
};

const HomePage: Component = () => {
    return (
        <div class="text-left max-w-2xl mx-auto">
            <H2>Welcome to WireMocks train travel demo application</H2>
            <p class="mb-4">This application was developed by WireMock and is based on the Train travel <a
                href="https://bump.sh/bump-examples/doc/train-travel-api"
                class="text-blue-400 hover:text-gray-300 hover:underline">OpenAPI
                spec produced by bump.sh</a>.</p>
            <p class="mb-4">The application demonstrates the power of WireMock cloud and its OpenAPI support.</p>
            <p class="mb-4">You can <A href="/booking/new"
                                       class="text-blue-400 hover:text-gray-300 hover:underline">find a
                trip</A> and making a booking or <A href="/my-bookings"
                                                    class="text-blue-400 hover:text-gray-300 hover:underline">manage
                existing bookings</A>.</p>
        </div>
    );
};

export default HomePage;
