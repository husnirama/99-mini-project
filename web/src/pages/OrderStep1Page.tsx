import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { useTransactionStore } from "@/store/transaction-store";
import type { EventDetail } from "@/types/eventDetailTypes";
import type {
  CreateOrderPayload,
  PaymentMethod,
  TransactionCheckoutResponse,
} from "@/types/orderTransactionTypes";
import { formatDate, formatTime } from "@/utils/eventList.utils";
import {
  buildLifecycleRecord,
  formatCurrency,
  formatPaymentMethod,
  getEventImageUrl,
  getEventLocationLabel,
  getTicketPrice,
} from "@/utils/orderTransaction.utils";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

function getAvailableTickets(event: EventDetail | null) {
  if (!event?.ticket) {
    return [];
  }

  return event.ticket.filter(
    (ticket) => ticket.status === "ACTIVE" || !ticket.status,
  );
}

export default function OrderStep1Page() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const saveRecord = useTransactionStore((state) => state.saveRecord);

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("BANK_TRANSFER");
  const [buyerForm, setBuyerForm] = useState({
    buyerName: user?.name ?? "",
    buyerEmail: user?.email ?? "",
    buyerPhone: "",
  });

  const requestedTicketId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = Number(searchParams.get("ticketId"));
    return Number.isFinite(value) ? value : null;
  }, [location.search]);

  useEffect(() => {
    setBuyerForm((previous) => ({
      buyerName: previous.buyerName || user?.name || "",
      buyerEmail: previous.buyerEmail || user?.email || "",
      buyerPhone: previous.buyerPhone,
    }));
  }, [user?.email, user?.name]);

  useEffect(() => {
    const parsedEventId = Number(id);
    if (!id || Number.isNaN(parsedEventId)) {
      setEvent(null);
      setIsLoading(false);
      return;
    }

    async function fetchEvent() {
      setIsLoading(true);

      try {
        const response = await apiClient.get(
          API_ENDPOINTS.EVENTS.FIND(parsedEventId),
        );
        setEvent(response.data.data as EventDetail);
      } catch (error) {
        console.error("Failed to fetch checkout event", error);
        toast.error("We couldn't load this event.");
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const availableTickets = useMemo(() => getAvailableTickets(event), [event]);

  useEffect(() => {
    if (!availableTickets.length) {
      setSelectedTicketId(null);
      return;
    }

    const requestedTicket = requestedTicketId
      ? availableTickets.find((ticket) => ticket.id === requestedTicketId)
      : null;

    setSelectedTicketId((previous) => {
      if (
        previous &&
        availableTickets.some((ticket) => ticket.id === previous)
      ) {
        return previous;
      }

      if (requestedTicket) {
        return requestedTicket.id;
      }

      return availableTickets[0].id;
    });
  }, [availableTickets, requestedTicketId]);

  const selectedTicket = useMemo(
    () =>
      availableTickets.find((ticket) => ticket.id === selectedTicketId) ?? null,
    [availableTickets, selectedTicketId],
  );

  const maxQuantity = useMemo(() => {
    if (!selectedTicket?.quota) {
      return 10;
    }

    return Math.max(1, Math.min(selectedTicket.quota, 10));
  }, [selectedTicket?.quota]);

  useEffect(() => {
    setQuantity((previous) => Math.max(1, Math.min(previous, maxQuantity)));
  }, [maxQuantity]);

  const unitPrice = selectedTicket ? getTicketPrice(selectedTicket) : 0;
  const subtotal = unitPrice * quantity;
  const estimatedDiscount = 0;
  const total = Math.max(0, subtotal - estimatedDiscount);
  const eventImage = event ? getEventImageUrl(event) : "";
  const eventLocation = event ? getEventLocationLabel(event) : "Venue TBA";

  function updateBuyerField(
    field: "buyerName" | "buyerEmail" | "buyerPhone",
    value: string,
  ) {
    setBuyerForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    if (!event || !selectedTicket) {
      toast.error("Please choose a valid ticket first.");
      return;
    }

    if (!buyerForm.buyerName.trim()) {
      toast.error("Buyer name is required.");
      return;
    }

    if (
      !buyerForm.buyerEmail.trim() ||
      !/\S+@\S+\.\S+/.test(buyerForm.buyerEmail)
    ) {
      toast.error("Enter a valid buyer email.");
      return;
    }

    if (
      !buyerForm.buyerPhone.trim() ||
      !/^\+?[1-9]\d{7,14}$/.test(buyerForm.buyerPhone.trim())
    ) {
      toast.error("Enter a valid phone number.");
      return;
    }

    const payload: CreateOrderPayload = {
      eventId: event.id,
      ticketTypeId: selectedTicket.id,
      quantity,
      voucherCode: voucherCode.trim() || undefined,
      buyerName: buyerForm.buyerName.trim(),
      buyerEmail: buyerForm.buyerEmail.trim(),
      buyerPhone: buyerForm.buyerPhone.trim(),
      paymentMethod,
    };

    setIsSubmitting(true);

    try {
      const response = await apiClient.post(
        API_ENDPOINTS.ORDERS.CREATE,
        payload,
      );
      const checkoutResponse = response.data
        .data as TransactionCheckoutResponse;
      const lifecycleRecord = buildLifecycleRecord({
        response: checkoutResponse,
        event,
        ticket: selectedTicket,
      });

      saveRecord(lifecycleRecord);
      toast.success("Order created. Finish the payment before it expires.");
      navigate(`/transactions/${checkoutResponse.transaction.id}`);
    } catch (error) {
      console.error("Failed to create order", error);
      toast.error("We couldn't create your order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Preparing your checkout...</p>
      </main>
    );
  }

  if (!event || !selectedTicket) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40">
          This checkout could not be prepared. Please return to the event page
          and choose an active ticket.
          <div className="mt-4">
            <Link className="font-semibold text-primary hover:underline" to="/">
              Back to events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200" />
          <div className="absolute left-0 top-1/2 h-0.5 w-1/3 -translate-y-1/2 bg-primary" />

          <div className="relative flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-lg">
                fact_check
              </span>
            </div>
            <span className="text-xs font-semibold text-primary">Checkout</span>
          </div>

          <div className="relative flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white">
              <span className="material-symbols-outlined text-lg text-slate-400">
                payments
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500">Payment</span>
          </div>

          <div className="relative flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white">
              <span className="material-symbols-outlined text-lg text-slate-400">
                task_alt
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Ticket Summary
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Review the event and choose the ticket tier you want to buy.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Step 1 of 3
              </span>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 sm:w-56">
                <img
                  alt={event.title}
                  className="h-full w-full object-cover"
                  src={eventImage}
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-primary">
                        calendar_month
                      </span>
                      <span>
                        {formatDate(event.eventDateStart)} ·{" "}
                        {formatTime(event.eventDateStart)} -{" "}
                        {formatTime(event.eventDateEnd)} WIB
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-primary">
                        location_on
                      </span>
                      <span>{eventLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {event.category ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {event.category}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    {selectedTicket.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Ticket options
                </h3>
                <Link
                  className="text-sm font-semibold text-primary hover:underline"
                  to={`/events/${event.id}`}
                >
                  Change from event page
                </Link>
              </div>

              {availableTickets.map((ticket) => {
                const isSelected = ticket.id === selectedTicket.id;
                const ticketPrice = getTicketPrice(ticket);

                return (
                  <button
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                        : "border-slate-200 bg-white hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/30"
                    }`}
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    type="button"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-slate-900 dark:text-white">
                            {ticket.name}
                          </h4>
                          {isSelected ? (
                            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                              Selected
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {ticket.description ||
                            "Standard admission for this event."}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span>
                            Quota:{" "}
                            {typeof ticket.quota === "number"
                              ? ticket.quota
                              : "TBA"}
                          </span>
                          <span>
                            Sales end:{" "}
                            {ticket.salesEndAt
                              ? formatDate(ticket.salesEndAt)
                              : "Follows event date"}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(ticketPrice)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          per ticket
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Ticket</th>
                    <th className="px-4 py-3 font-semibold text-center">Qty</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {selectedTicket.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedTicket.description || "Event admission ticket"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                          onClick={() =>
                            setQuantity((previous) => Math.max(1, previous - 1))
                          }
                          type="button"
                        >
                          <span className="material-symbols-outlined text-base">
                            remove
                          </span>
                        </button>
                        <span className="min-w-8 text-center font-semibold text-slate-900 dark:text-white">
                          {quantity}
                        </span>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={quantity >= maxQuantity}
                          onClick={() =>
                            setQuantity((previous) =>
                              Math.min(maxQuantity, previous + 1),
                            )
                          }
                          type="button"
                        >
                          <span className="material-symbols-outlined text-base">
                            add
                          </span>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-slate-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Buyer Information
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                We will use this contact for payment updates and ticket
                delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Full Name
                </Label>
                <Input
                  className="h-11 border-slate-200 bg-white px-4 text-sm shadow-none dark:border-slate-700 dark:bg-slate-900"
                  onChange={(event) =>
                    updateBuyerField("buyerName", event.target.value)
                  }
                  placeholder="Alex Johnson"
                  value={buyerForm.buyerName}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email Address
                </Label>
                <Input
                  className="h-11 border-slate-200 bg-white px-4 text-sm shadow-none dark:border-slate-700 dark:bg-slate-900"
                  onChange={(event) =>
                    updateBuyerField("buyerEmail", event.target.value)
                  }
                  placeholder="name@example.com"
                  type="email"
                  value={buyerForm.buyerEmail}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Phone Number
                </Label>
                <Input
                  className="h-11 border-slate-200 bg-white px-4 text-sm shadow-none dark:border-slate-700 dark:bg-slate-900"
                  onChange={(event) =>
                    updateBuyerField("buyerPhone", event.target.value)
                  }
                  placeholder="+628123456789"
                  value={buyerForm.buyerPhone}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use an active phone number so the organizer can reach you if
                  something needs to be confirmed.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Payment Method
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Order and transaction will be created together after checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  value: "BANK_TRANSFER" as PaymentMethod,
                  icon: "account_balance",
                  title: "Bank Transfer",
                  description: "Upload your payment proof after checkout.",
                },
                {
                  value: "CARD" as PaymentMethod,
                  icon: "credit_card",
                  title: "Card",
                  description:
                    "Use the same payment proof flow required by the backend.",
                },
              ].map((option) => {
                const isSelected = option.value === paymentMethod;

                return (
                  <button
                    className={`rounded-xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                        : "border-slate-200 bg-white hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/30"
                    }`}
                    key={option.value}
                    onClick={() => setPaymentMethod(option.value)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <span className="material-symbols-outlined">
                            {option.icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {option.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`mt-1 h-5 w-5 rounded-full border ${
                          isSelected
                            ? "border-primary bg-primary shadow-sm shadow-primary/30"
                            : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                sell
              </span>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Voucher Code
              </h2>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Voucher
              </Label>
              <Input
                className="h-11 border-slate-200 bg-slate-50 px-4 text-sm uppercase shadow-none dark:border-slate-700 dark:bg-slate-900"
                onChange={(event) =>
                  setVoucherCode(event.target.value.toUpperCase())
                }
                placeholder="PROMO10"
                value={voucherCode}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Any discount will be validated and applied when the order is
                created.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="mb-4 font-bold text-slate-900 dark:text-white">
              Final Pricing Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Unit price</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {formatCurrency(unitPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Quantity</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {quantity}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Discount</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {voucherCode
                    ? "Validated after checkout"
                    : formatCurrency(estimatedDiscount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Payment method</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {formatPaymentMethod(paymentMethod)}
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-dashed border-slate-200 pt-5 dark:border-slate-700">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  Total
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <Button
              className="h-12 w-full rounded-lg text-sm font-bold shadow-lg shadow-primary/20"
              disabled={isSubmitting}
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting ? "Creating order..." : "Create Order & Continue"}
            </Button>

            <div className="mt-4 rounded-xl border border-primary/10 bg-primary/5 p-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 text-primary">
                  schedule
                </span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Payment countdown starts immediately after checkout success.
                  </p>
                  <p className="mt-1">
                    You will be redirected to the payment detail page to upload
                    your proof and track the transaction status.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-slate-400">
                info
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Need a quick review?
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Order creation and transaction creation happen in one step, so
                  make sure your buyer information and ticket selection are
                  correct.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
