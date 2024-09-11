import {Component, createResource, JSX,} from 'solid-js';
import {useNavigate, useSearchParams} from '@solidjs/router';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [stations] = createResource(fetchStations);
    const derivedState = () => {
        return {
            from: searchParams.from,
            to: searchParams.to,
            date: searchParams.date,
        };
    };
    const [trips] = createResource(derivedState, fetchTrips);
    const navigate = useNavigate();
    const selectTrip = (trip: Trip) => {
        navigate(`/booking/${trip.id}`);
    };

    const changeFrom: JSX.EventHandler<HTMLSelectElement, InputEvent> = (e) =>
        setSearchParams({from: e.currentTarget.value});
    const changeTo: JSX.EventHandler<HTMLSelectElement, InputEvent> = (e) =>
        setSearchParams({to: e.currentTarget.value});
    const changeDate: JSX.EventHandler<HTMLInputElement, Event> = (e) =>
        setSearchParams({date: e.currentTarget.value});

    return (
        <div class="text-left">
            <H2>Welcome</H2>
        </div>
    );
};

export default HomePage;
