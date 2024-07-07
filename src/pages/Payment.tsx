import { createStore } from 'solid-js/store';
import Button from '../components/forms/button';
import Input from '../components/forms/input';
import Label from '../components/forms/label';
import Row from '../components/forms/row';
import Hr from '../components/hr';
import H2 from '../components/typeography/H2';
import {
  JSX,
  Match,
  Show,
  Switch,
  createResource,
  createSignal,
} from 'solid-js';
import { bookingsController, paymentsController } from '../lib/client';
import { useParams } from '@solidjs/router';
import { CurrencyEnum } from '@wiremock-inc/apimatic-sdkgen-demo';
import { Card } from '@wiremock-inc/apimatic-sdkgen-demo';
import { default as CardComponent } from '../components/card';
import H1 from '../components/typeography/H1';
import Spinner from '../components/spinner';
import { BookingsPaymentResponse } from '@wiremock-inc/apimatic-sdkgen-demo';

const bookingFetcher = async (id: string) => {
  const response = await bookingsController.getBooking(id);
  return response.result;
};

const Payment = () => {
  const params = useParams();
  const [form, setForm] = createStore<Card>({} as Card);
  const [isPosting, setIsPosting] = createSignal(false);
  const [paymentResult, setPaymentResult] = createSignal<
    BookingsPaymentResponse | false
  >(false);
  const [paymentError, setPaymentError] = createSignal<Error | undefined>();
  const bookingId = () => params.booking_id;
  const [booking] = createResource(bookingId, bookingFetcher);

  const submit: JSX.EventHandler<HTMLFormElement, Event> = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    try {
      const response = await paymentsController.createBookingPayment(
        params.booking_id,
        {
          currency: CurrencyEnum.Gbp,
          amount: 1000,
          source: {
            name: form.name,
            number: form.number,
            cvc: form.cvc,
            expMonth: form.expMonth,
            expYear: form.expYear,
            addressCountry: form.addressCountry,
          },
        },
      );
      setPaymentResult(response.result);
      setIsPosting(false);
    } catch (e) {
      setPaymentError(e);
    }
  };

  return (
    <>
      <Switch>
        <Match when={paymentError()}>
          <div class="text-2xl rounded p-10 bg-red-700">
            <p>Error!</p>
            <p>{paymentError()?.message}</p>
          </div>
        </Match>
        <Match when={paymentResult()}>
          <p class="text-2xl bg-green-800 rounded p-10">Payment complete</p>
        </Match>
        <Match when={!paymentResult()}>
          <H1>Payment</H1>
          <Hr />
          <div class="flex">
            <div class="min-w-80">
              <CardComponent>
                <Show when={booking.loading}>
                  <Spinner />
                </Show>
                <Show when={booking()}>
                  <H2>Your booking</H2>
                  <p class="text-xl mb-4 font-bold">
                    {booking()?.passengerName}
                  </p>
                  <dl>
                    <dt class="font-bold text-lg">Has dog</dt>
                    <dd class="mb-2 text-base">
                      {booking()?.hasDog ? 'YES' : 'NO'}
                    </dd>

                    <dt class="font-bold text-lg">Has bicycle</dt>
                    <dd class="mb-2 text-base">
                      {booking()?.hasBicycle ? 'YES' : 'NO'}
                    </dd>

                    <dt class="font-bold text-lg">Trip ID</dt>
                    <dd class="mb-2 text-base">{booking()?.tripId}</dd>
                  </dl>
                </Show>
              </CardComponent>
            </div>
            <div class="lg:w-7/12 mx-auto">
              <CardComponent>
                <form onSubmit={submit}>
                  <H2>Payment details</H2>

                  <Row>
                    <Label for="name">Name on card</Label>
                    <Input
                      id="name"
                      onInput={(e) => setForm({ name: e.currentTarget.value })}
                    />
                  </Row>
                  <Row class="mb-4 py-2 flex gap-2.5">
                    <div class="flex-1">
                      <Label for="cardNumber">Card number</Label>
                      <Input
                        id="cardNumber"
                        onInput={(e) =>
                          setForm({ number: e.currentTarget.value })
                        }
                      />
                    </div>
                    <div class="flex-2">
                      <Label for="cvc">CVC number</Label>
                      <Input
                        id="cvc"
                        onInput={(e) =>
                          setForm({ cvc: parseInt(e.currentTarget.value, 10) })
                        }
                      />
                    </div>
                  </Row>
                  <Row class="mb-4 py-2 flex gap-2.5">
                    <div class="flex-auto">
                      <Label for="expiryMonth">Expiry month</Label>
                      <Input
                        id="expiryMonth"
                        onInput={(e) =>
                          setForm({ expMonth: BigInt(e.currentTarget.value) })
                        }
                      />
                    </div>

                    <div class="flex-auto">
                      <Label for="expiryYear">Expiry year</Label>
                      <Input
                        id="expiryYear"
                        onInput={(e) =>
                          setForm({ expYear: BigInt(e.currentTarget.value) })
                        }
                      />
                    </div>
                  </Row>

                  <Hr />

                  <Row>
                    <Label for="country">Country</Label>
                    <Input
                      id="postcode"
                      onInput={(e) =>
                        setForm({ addressCountry: e.currentTarget.value })
                      }
                    />
                  </Row>

                  <Button type="submit" disabled={isPosting()}>
                    Pay
                  </Button>
                </form>
              </CardComponent>
            </div>
          </div>
        </Match>
      </Switch>
    </>
  );
};

export default Payment;
