import { Component, For, Match, Show, Switch, createResource } from 'solid-js';
import Select from '../components/forms/select';
import Label from '../components/forms/label';
import Row from '../components/forms/row';
import { A, useSearchParams } from '@solidjs/router';
import Hr from '../components/hr';
import H2 from '../components/typeography/H2';
import { stationsController, tripsController } from '../lib/client';
import Cart from '../components/icons/cart';
import Spinner from '../components/spinner';

const fetchStations = async () => {
  const response = await stationsController.getStations({});
  console.log(response);
  return response.result.data;
};

const fetchTrips = async (state: {
  from?: string;
  to?: string;
  date?: Date;
}) => {
  if (state.from && state.to && state.date) {
    const response = await tripsController.getTrips({
      date: state.date,
      origin: state.to,
      destination: state.from
    });

    return response.result.data;
  }
  return false;
};

const Home: Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stations] = createResource(fetchStations);
  const derivedState = () => {
    if (searchParams.from && searchParams.to && searchParams.date) {
      return {
        from: searchParams.from,
        to: searchParams.to,
        date: new Date(searchParams.date),
      };
    }
  };
  const [trips] = createResource(derivedState, fetchTrips);

  return (
    <div class="text-left">
      <form>
        <H2>Find trip</H2>

        <div class="grid sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-x-2.5">
          <Row>
            <Label for="from">Departing from</Label>
            <Select
              id="from"
              onChange={(e) => setSearchParams({ from: e.currentTarget.value })}
            >
              <option>Select</option>
              <For each={stations()}>
                {(station) => (
                  <option
                    value={station.id}
                    selected={station.id === searchParams.from}
                  >
                    {station.name}
                  </option>
                )}
              </For>
            </Select>
          </Row>
          <Row>
            <Label for="to">Going to</Label>
            <Select
              id="to"
              onChange={(e) => setSearchParams({ to: e.currentTarget.value })}
            >
              <option>Select</option>
              <For each={stations()}>
                {(station) => (
                  <option
                    value={station.id}
                    selected={station.id === searchParams.to}
                  >
                    {station.name}
                  </option>
                )}
              </For>
            </Select>
          </Row>
          <Row>
            <Label for="date">Depature date</Label>
            <input
              onChange={(e) => setSearchParams({ date: e.currentTarget.value })}
              id="date"
              type="date"
              value={searchParams.date}
              class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Row>
        </div>
      </form>

      <Hr />

      <div>
        <Show when={trips.loading}>
          <Spinner />
        </Show>
        <Show when={trips()}>
          <H2>Trips</H2>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-gray-700 text-base bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th class="py-2 px-4">Operator</th>
                <th class="py-2 px-4">Price</th>
                <th class="py-2 px-4">Dogs allowed</th>
                <th class="py-2 px-4">Bicycles allowed</th>
                <th class="py-2 px-4">Arrival time</th>
                <th class="py-2 px-4">Depature time</th>
                <th class="py-2 px-4">Book</th>
              </tr>
            </thead>
            <tbody class="text-base">
              <For each={trips()}>
                {(trip) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="py-2 px-4">{trip.operator}</td>
                    <td class="py-2 px-4">{trip.price}</td>
                    <td class="py-2 px-4">
                      <Switch>
                        <Match when={trip.dogsAllowed === true}>Yes</Match>
                        <Match when={trip.dogsAllowed === false}>No</Match>
                      </Switch>
                    </td>
                    <td class="py-2 px-4">
                      <Switch>
                        <Match when={trip.bicyclesAllowed === true}>Yes</Match>
                        <Match when={trip.bicyclesAllowed === false}>No</Match>
                      </Switch>
                    </td>
                    <td class="py-2 px-4">{trip.arrivalTime}</td>
                    <td class="py-2 px-4">{trip.departureTime}</td>
                    <td class="py-2 px-4">
                      <A
                        href={`/booking/${trip.id}`}
                        class="flex gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <Cart /> Book
                      </A>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Show>
      </div>
    </div>
  );
};

export default Home;
