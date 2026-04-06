import { apiClient } from "@/api/clients";
import { API_ENDPOINTS } from "@/api/endpoint";
import {
  getOrganizerAttendeesPath,
  getOrganizerSettingsPath,
  getOrganizerStatisticsPath,
} from "@/config/site-navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";
import { X } from "lucide-react";
import MapPicker from "@/components/MapPicker";
import { useJsApiLoader } from "@react-google-maps/api";
import { Link, useNavigate, useParams } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import type {
  UploadedFile,
  LocationSuggestion,
  PromotionVoucher,
  TicketTier,
} from "@/types/eventCreationTypes";
import formatNumberWithThousandDots from "@/utils/eventCreation.utils";

const googleMapLibraries: "places"[] = ["places"];

function createEmptyTicketTier(): TicketTier {
  return {
    id: uuidV4(),
    name: "",
    availability: "Paid",
    price: "",
    capacity: "",
  };
}

function createEmptyPromotionVoucher(): PromotionVoucher {
  return {
    id: uuidV4(),
    name: "",
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    maxDiscount: "",
    minPurchase: "",
    quota: "",
    startDate: "",
    endDate: "",
  };
}

type EditableEvent = {
  id: number;
  title: string;
  category?: string | null;
  eventDescription?: string | null;
  eventDateStart: string;
  eventDateEnd: string;
  status?: string;
  termsAccepted: boolean;
  venue?: Array<{
    id: number;
    name: string;
    addressLine: string;
    city: string;
    region?: string | null;
    country: string;
    latitude?: number | string | null;
    longitude?: number | string | null;
  }>;
  ticket?: Array<{
    id: number;
    name: string;
    price: number | string;
    quota?: number;
    contactPerson: string;
    emailContactPerson: string;
    phoneContactPerson: string;
  }>;
  promotion?: Array<{
    id: number;
    name: string;
    code: string;
    discountType: "PERCENTAGE" | "FIXED";
    discountValue: number | string;
    maxDiscount?: number | string | null;
    minPurchase?: number | string | null;
    quota: number;
    startDate?: string | null;
    endDate?: string | null;
  }>;
  eventImage?: Array<{
    id: number;
    imageURL: string;
  }>;
};

function formatDateInput(value?: string | null) {
  if (!value) {
    return "";
  }

  const currentDate = new Date(value);
  if (Number.isNaN(currentDate.getTime())) {
    return "";
  }

  const localDate = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
  );

  return localDate.toISOString().slice(0, 10);
}

function formatTimeInput(value?: string | null) {
  if (!value) {
    return "";
  }

  const currentDate = new Date(value);
  if (Number.isNaN(currentDate.getTime())) {
    return "";
  }

  const localDate = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
  );

  return localDate.toISOString().slice(11, 16);
}

function splitPhoneContact(value?: string | null) {
  const phonePrefixes = ["ID +62", "SG +65", "MY +60", "US +1"];

  if (!value) {
    return {
      countryCode: "ID +62",
      phoneNumber: "",
    };
  }

  const matchedPrefix = phonePrefixes.find(
    (prefix) => value === prefix || value.startsWith(`${prefix} `),
  );

  if (!matchedPrefix) {
    return {
      countryCode: "ID +62",
      phoneNumber: value.replace(/\D/g, ""),
    };
  }

  return {
    countryCode: matchedPrefix,
    phoneNumber: value.slice(matchedPrefix.length).trim().replace(/\D/g, ""),
  };
}

export default function CreateEventPage() {
  const { eventId } = useParams();
  const isEditMode = Boolean(eventId);
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    addressLine: "",
    city: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
    eventDescription: "",
  });
  const [eventSchedule, setEventSchedule] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const [singleFile, setSingleFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    createEmptyTicketTier(),
  ]);
  const [promotionVouchers, setPromotionVouchers] = useState<
    PromotionVoucher[]
  >([]);
  const locationSearchRef = useRef<HTMLDivElement | null>(null);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null,
  );
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const [contactInfo, setContactInfo] = useState({
    contactName: "",
    contactEmail: "",
    countryCode: "ID +62",
    phoneNumber: "",
  });
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoaded: isMapsLoaded } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: googleMapLibraries,
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const organizerId = user?.id;
  const organizerStatisticsPath = getOrganizerStatisticsPath(organizerId);
  const organizerAttendeesPath = getOrganizerAttendeesPath(organizerId);
  const organizerSettingsPath = getOrganizerSettingsPath(organizerId);
  const pageTitle = isEditMode ? "Update Event" : "Create New Event";
  const pageDescription = isEditMode
    ? "Update your event details, tickets, promotions, and publishing status."
    : "Set up your event details, tickets, and schedule to start selling.";
  const headerSubmitLabel = isEditMode ? "Save Changes" : "Save Draft";
  const submitButtonLabel = isEditMode ? "Update Event" : "Create Event";
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!isMapsLoaded || !window.google?.maps?.places) return;

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!placesServiceRef.current) {
      const container = document.createElement("div");
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        container,
      );
    }
    if (!geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isMapsLoaded]);

  useEffect(() => {
    if (!isMapsLoaded || !autocompleteServiceRef.current) return;

    const search = locationQuery.trim();
    if (!search) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      autocompleteServiceRef.current?.getPlacePredictions(
        {
          input: search,
          componentRestrictions: { country: "id" },
        },
        (predictions, status) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            setLocationSuggestions([]);
            return;
          }

          setLocationSuggestions(
            predictions.map((prediction) => ({
              placeId: prediction.place_id,
              description: prediction.description,
            })),
          );
        },
      );
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [isMapsLoaded, locationQuery]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        locationSearchRef.current &&
        !locationSearchRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isEditMode || !eventId) {
      return;
    }

    let isMounted = true;

    async function fetchOwnedEvent() {
      setIsLoadingEvent(true);
      setLoadError(null);

      try {
        const response = await apiClient.get(API_ENDPOINTS.EVENTS.MANAGE_FIND(eventId));
        const nextEvent = response.data.data as EditableEvent;

        if (!isMounted) {
          return;
        }

        const currentVenue = nextEvent.venue?.[0];
        const coverImage = nextEvent.eventImage?.[0];
        const primaryTicket = nextEvent.ticket?.[0];
        const phoneContact = splitPhoneContact(primaryTicket?.phoneContactPerson);
        const latitude =
          currentVenue?.latitude !== null && currentVenue?.latitude !== undefined
            ? Number(currentVenue.latitude)
            : null;
        const longitude =
          currentVenue?.longitude !== null && currentVenue?.longitude !== undefined
            ? Number(currentVenue.longitude)
            : null;

        setEventData({
          title: nextEvent.title ?? "",
          category: nextEvent.category ?? "",
          addressLine: currentVenue?.addressLine ?? "",
          city: currentVenue?.city ?? "",
          state: currentVenue?.region ?? "",
          country: currentVenue?.country ?? "",
          latitude:
            currentVenue?.latitude !== null && currentVenue?.latitude !== undefined
              ? String(currentVenue.latitude)
              : "",
          longitude:
            currentVenue?.longitude !== null && currentVenue?.longitude !== undefined
              ? String(currentVenue.longitude)
              : "",
          eventDescription: nextEvent.eventDescription ?? "",
        });
        setEventSchedule({
          startDate: formatDateInput(nextEvent.eventDateStart),
          startTime: formatTimeInput(nextEvent.eventDateStart),
          endDate: formatDateInput(nextEvent.eventDateEnd),
          endTime: formatTimeInput(nextEvent.eventDateEnd),
        });
        setLocationQuery(currentVenue?.name ?? currentVenue?.addressLine ?? "");
        setCoords(
          latitude !== null &&
            longitude !== null &&
            Number.isFinite(latitude) &&
            Number.isFinite(longitude)
            ? { lat: latitude, lng: longitude }
            : null,
        );
        setSingleFile(
          coverImage
            ? {
                id: `event-image-${coverImage.id}`,
                name: `event-image-${coverImage.id}`,
                rawFile: null,
                preview: coverImage.imageURL,
              }
            : null,
        );
        setTicketTiers(
          nextEvent.ticket?.length
            ? nextEvent.ticket.map((ticket) => ({
                id: uuidV4(),
                persistedId: ticket.id,
                name: ticket.name,
                availability: Number(ticket.price) <= 0 ? "Free" : "Paid",
                price: String(ticket.price ?? ""),
                capacity:
                  ticket.quota !== null && ticket.quota !== undefined
                    ? String(ticket.quota)
                    : "",
              }))
            : [createEmptyTicketTier()],
        );
        setPromotionVouchers(
          nextEvent.promotion?.length
            ? nextEvent.promotion.map((promotion) => ({
                id: uuidV4(),
                persistedId: promotion.id,
                name: promotion.name,
                code: promotion.code,
                discountType: promotion.discountType,
                discountValue: String(promotion.discountValue ?? ""),
                maxDiscount:
                  promotion.maxDiscount !== null &&
                  promotion.maxDiscount !== undefined
                    ? String(promotion.maxDiscount)
                    : "",
                minPurchase:
                  promotion.minPurchase !== null &&
                  promotion.minPurchase !== undefined
                    ? String(promotion.minPurchase)
                    : "",
                quota: String(promotion.quota ?? ""),
                startDate: formatDateInput(promotion.startDate),
                endDate: formatDateInput(promotion.endDate),
              }))
            : [],
        );
        setContactInfo({
          contactName: primaryTicket?.contactPerson ?? "",
          contactEmail: primaryTicket?.emailContactPerson ?? "",
          countryCode: phoneContact.countryCode,
          phoneNumber: phoneContact.phoneNumber,
        });
        setHasAcceptedTerms(Boolean(nextEvent.termsAccepted));
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        const message =
          error?.response?.data?.message || "We couldn't load this event.";
        setLoadError(message);
        toast.error(message);
      } finally {
        if (isMounted) {
          setIsLoadingEvent(false);
        }
      }
    }

    fetchOwnedEvent();

    return () => {
      isMounted = false;
    };
  }, [eventId, isEditMode]);

  function handleSelectSuggestion(suggestion: LocationSuggestion) {
    setLocationQuery(suggestion.description);
    setLocationSuggestions([]);
    setIsSuggestionOpen(false);
    setShowMapPicker(true);

    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId: suggestion.placeId,
        fields: ["geometry", "formatted_address", "address_components"],
      },
      (place, status) => {
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !place?.geometry?.location
        ) {
          return;
        }

        setCoords({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        const getComponent = (type: string) =>
          place.address_components?.find((component) =>
            component.types.includes(type),
          )?.long_name ?? null;

        setEventData((previous) => ({
          ...previous,
          addressLine: place.formatted_address ?? suggestion.description,
          city:
            getComponent("locality") ??
            getComponent("administrative_area_level_2") ??
            previous.city,
          state: getComponent("administrative_area_level_1") ?? previous.state,
          country: getComponent("country") ?? previous.country,
          latitude: place.geometry!.location!.lat().toString(),
          longitude: place.geometry!.location!.lng().toString(),
        }));
      },
    );
  }

  function handleLocationInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextValue = event.target.value;
    setLocationQuery(nextValue);
    setEventData((previous) => ({
      ...previous,
      addressLine: nextValue,
    }));
    setIsSuggestionOpen(true);

    if (!nextValue.trim()) {
      setLocationSuggestions([]);
    }
  }

  function handleMapSelect(selectedCoords: { lat: number; lng: number }) {
    setCoords(selectedCoords);
    setIsSuggestionOpen(false);
    setLocationSuggestions([]);

    const fallbackValue = `${selectedCoords.lat.toFixed(6)}, ${selectedCoords.lng.toFixed(6)}`;
    const geocoder = geocoderRef.current;
    if (!geocoder) {
      setLocationQuery(fallbackValue);
      return;
    }

    geocoder.geocode(
      {
        location: selectedCoords,
      },
      (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK || !results?.length) {
          setLocationQuery(fallbackValue);
          return;
        }
        const result = results[0];
        setLocationQuery(result.formatted_address);
        const getComponent = (type: string) =>
          result.address_components.find((c) => c.types.includes(type))
            ?.long_name ?? null;

        const city =
          getComponent("locality") ??
          getComponent("administrative_area_level_2") ??
          getComponent("sublocality");

        const state = getComponent("administrative_area_level_1");
        const country = getComponent("country");
        setEventData((previous) => ({
          ...previous,
          addressLine: result.formatted_address,
          city: city ?? previous.city,
          state: state ?? previous.state,
          country: country ?? previous.country,
          latitude: selectedCoords.lat.toString(),
          longitude: selectedCoords.lng.toString(),
        }));
      },
    );
  }

  function handleAddTicketTier() {
    setTicketTiers((previous) => [...previous, createEmptyTicketTier()]);
  }

  function handleRemoveTicketTier(tierId: string) {
    setTicketTiers((previous) =>
      previous.filter((ticketTier) => ticketTier.id !== tierId),
    );
  }

  function handleTicketTierChange(
    tierId: string,
    field: "name" | "availability" | "price" | "capacity",
    value: string,
  ) {
    setTicketTiers((previous) =>
      previous.map((ticketTier) =>
        ticketTier.id === tierId
          ? { ...ticketTier, [field]: value }
          : ticketTier,
      ),
    );
  }

  function handleTicketTierPriceChange(tierId: string, value: string) {
    const numericOnly = value.replace(/\D/g, "");
    handleTicketTierChange(tierId, "price", numericOnly);
  }

  function handleContactInfoChange(
    field: "contactName" | "contactEmail" | "countryCode" | "phoneNumber",
    value: string,
  ) {
    setContactInfo((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleAddPromotionVoucher() {
    setPromotionVouchers((previous) => [
      ...previous,
      createEmptyPromotionVoucher(),
    ]);
  }

  function handleRemovePromotionVoucher(voucherId: string) {
    setPromotionVouchers((previous) =>
      previous.filter((voucher) => voucher.id !== voucherId),
    );
  }

  function handlePromotionVoucherChange(
    voucherId: string,
    field:
      | "name"
      | "code"
      | "discountType"
      | "discountValue"
      | "maxDiscount"
      | "minPurchase"
      | "quota"
      | "startDate"
      | "endDate",
    value: string,
  ) {
    setPromotionVouchers((previous) =>
      previous.map((voucher) =>
        voucher.id === voucherId ? { ...voucher, [field]: value } : voucher,
      ),
    );
  }

  function handlePromotionVoucherNumberChange(
    voucherId: string,
    field: "discountValue" | "maxDiscount" | "minPurchase" | "quota",
    value: string,
  ) {
    handlePromotionVoucherChange(voucherId, field, value.replace(/\D/g, ""));
  }

  function handleSingleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024 * 10) {
        setError("File must be less than 10MB");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        setError("File must be an image");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        setError(null);
        setSingleFile({
          id: uuidV4(),
          name: selectedFile.name,
          rawFile: selectedFile,
          preview: preview,
        });
      };
    }
  }

  async function submitEvent(statusOverride?: "PUBLISHED") {
    if (isSubmitting) {
      return;
    }

    if (!eventData.title.trim()) {
      toast.error("Event name is required");
      return;
    }

    if (
      !eventSchedule.startDate ||
      !eventSchedule.startTime ||
      !eventSchedule.endDate ||
      !eventSchedule.endTime
    ) {
      toast.error("Event start/end date and time are required");
      return;
    }

    if (!locationQuery.trim()) {
      toast.error("Venue location is required");
      return;
    }

    if (!singleFile) {
      toast.error("Please upload at least one event image");
      return;
    }

    if (
      !contactInfo.contactName.trim() ||
      !contactInfo.contactEmail.trim() ||
      !contactInfo.phoneNumber.trim()
    ) {
      toast.error("PIC name, email, and phone number are required");
      return;
    }

    const hasIncompleteTicket = ticketTiers.some(
      (ticketTier) =>
        !ticketTier.name.trim() ||
        !ticketTier.price.trim() ||
        !ticketTier.capacity.trim(),
    );

    if (hasIncompleteTicket) {
      toast.error("Please complete all ticket tier fields");
      return;
    }

    const startDateTime = new Date(
      `${eventSchedule.startDate}T${eventSchedule.startTime}:00`,
    );
    const endDateTime = new Date(
      `${eventSchedule.endDate}T${eventSchedule.endTime}:00`,
    );

    if (
      Number.isNaN(startDateTime.getTime()) ||
      Number.isNaN(endDateTime.getTime())
    ) {
      toast.error("Invalid event date and time");
      return;
    }

    if (endDateTime <= startDateTime) {
      toast.error("Event end date must be after start date");
      return;
    }

    const normalizedPromotions = promotionVouchers
      .filter((voucher) =>
        [
          voucher.name,
          voucher.code,
          voucher.discountValue,
          voucher.quota,
          voucher.startDate,
          voucher.endDate,
        ].some((value) => value.trim().length > 0),
      )
      .map((voucher) => ({
        id: voucher.persistedId,
        name: voucher.name.trim(),
        code: voucher.code.trim(),
        discountType: voucher.discountType,
        discountValue: voucher.discountValue,
        maxDiscount: voucher.maxDiscount || undefined,
        minPurchase: voucher.minPurchase || undefined,
        quota: voucher.quota,
        startDate: voucher.startDate || undefined,
        endDate: voucher.endDate || undefined,
      }));

    const hasInvalidPromotion = normalizedPromotions.some(
      (voucher) =>
        !voucher.name ||
        !voucher.code ||
        !voucher.discountValue ||
        !voucher.quota,
    );

    if (hasInvalidPromotion) {
      toast.error(
        "Please complete each promotion or remove the incomplete one",
      );
      return;
    }

    if (!hasAcceptedTerms) {
      toast.error(
        "You must agree to the Terms & Conditions before creating an event.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", eventData.title.trim());
      formData.append("category", eventData.category);
      formData.append("eventDescription", eventData.eventDescription.trim());
      formData.append("eventDateStart", startDateTime.toISOString());
      formData.append("eventDateEnd", endDateTime.toISOString());
      formData.append("termsAccepted", String(hasAcceptedTerms));
      if (statusOverride) {
        formData.append("status", statusOverride);
      }
      formData.append(
        "venue",
        JSON.stringify({
          name: locationQuery.trim(),
          addressLine: eventData.addressLine || locationQuery.trim(),
          city: eventData.city || "Unknown City",
          region: eventData.state || undefined,
          country: eventData.country || "Indonesia",
          latitude: eventData.latitude || undefined,
          longitude: eventData.longitude || undefined,
        }),
      );
      formData.append(
        "ticketTypes",
        JSON.stringify(
          ticketTiers.map((ticketTier) => ({
            id: ticketTier.persistedId,
            name: ticketTier.name.trim(),
            availability: ticketTier.availability,
            price: ticketTier.price,
            capacity: ticketTier.capacity,
          })),
        ),
      );
      formData.append(
        "contactInfo",
        JSON.stringify({
          contactName: contactInfo.contactName.trim(),
          contactEmail: contactInfo.contactEmail.trim(),
          countryCode: contactInfo.countryCode,
          phoneNumber: contactInfo.phoneNumber.trim(),
        }),
      );
      formData.append("promotions", JSON.stringify(normalizedPromotions));

      if (singleFile.rawFile) {
        formData.append("arrayImages", singleFile.rawFile);
      }

      if (isEditMode && eventId) {
        await apiClient.patch(API_ENDPOINTS.EVENTS.UPDATE(eventId), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await apiClient.post(API_ENDPOINTS.EVENTS.CREATE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success(
        statusOverride === "PUBLISHED"
          ? "Event published successfully"
          : isEditMode
            ? "Event updated successfully"
            : "Event created successfully",
      );
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          (isEditMode ? "We couldn't update this event." : "Upload Failed"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSingleFileSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    await submitEvent();
  }

  async function handlePublishEvent() {
    await submitEvent("PUBLISHED");
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons text-white text-xl">
                    event
                  </span>
                </div>
                <Link
                  to="/"
                  className="text-xl font-bold tracking-tight text-primary"
                >
                  EventHub
                </Link>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  to="/organizer/dashboard"
                >
                  Dashboard
                </Link>
                <Link className="text-sm font-medium text-primary" to="/organizer/create-event">
                  Events
                </Link>
                <Link
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  to={organizerAttendeesPath}
                >
                  Attendees
                </Link>
                <Link
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  to={organizerStatisticsPath}
                >
                  Analytics
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-200 dark:hover:bg-slate-800"
                disabled={isLoadingEvent || isSubmitting}
                form="create-event-form"
                type="submit"
              >
                {isSubmitting ? "Saving..." : headerSubmitLabel}
              </button>
              <div className="relative">
                <button
                  className="navbar-login"
                  onClick={() => setOpen((v) => !v)}
                  type="button"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>
                  </div>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                      onClick={() => {
                        setOpen(false);
                        navigate(organizerSettingsPath);
                      }}
                      type="button"
                    >
                      My Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                      onClick={handleLogout}
                      type="button"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isEditMode && isLoadingEvent ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            Loading event data...
          </div>
        ) : isEditMode && loadError ? (
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <p>{loadError}</p>
            <button
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
              onClick={() => navigate("/organizer/dashboard")}
              type="button"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
        {/* <!-- Breadcrumb & Header --> */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link
            className="hover:text-primary transition-colors"
            to="/organizer/dashboard"
          >
            Dashboard
          </Link>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <Link
            className="hover:text-primary transition-colors"
            to="/organizer/create-event"
          >
            Events
          </Link>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            {pageTitle}
          </span>
        </nav>
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            {pageTitle}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {pageDescription}
          </p>
        </div>
        <form
          className="space-y-12"
          id="create-event-form"
          onSubmit={handleSingleFileSubmit}
        >
          {/* <!-- Section 1: Basic Info --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                1
              </span>
              <h2 className="text-xl font-bold">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Name
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                  placeholder="e.g. Jakarta Tech Summit 2024"
                  type="text"
                  value={eventData.title}
                  onChange={(event) =>
                    setEventData({
                      ...eventData,
                      title: event.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3 appearance-none"
                  value={eventData.category}
                  onChange={(event) =>
                    setEventData((previous) => ({
                      ...previous,
                      category: event.target.value,
                    }))
                  }
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Music">Music</option>
                  <option value="Business">Business</option>
                  <option value="Art">Art</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Location
                </label>
                <div className="relative" ref={locationSearchRef}>
                  <button
                    type="button"
                    onClick={() => setShowMapPicker((prev) => !prev)}
                    aria-label={
                      showMapPicker ? "Hide location map" : "Show location map"
                    }
                    className="absolute left-3 top-3 text-slate-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </button>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3"
                    placeholder="Search for a venue or city"
                    type="text"
                    value={locationQuery}
                    onFocus={() => setIsSuggestionOpen(true)}
                    onChange={handleLocationInputChange}
                    autoComplete="off"
                  />
                  {isSuggestionOpen && locationSuggestions.length > 0 && (
                    <ul className="absolute z-30 mt-2 w-full max-h-60 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
                      {locationSuggestions.map((suggestion) => (
                        <li key={suggestion.placeId}>
                          <button
                            type="button"
                            className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => handleSelectSuggestion(suggestion)}
                          >
                            {suggestion.description}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {showMapPicker && isMapsLoaded && (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <MapPicker value={coords} onSelect={handleMapSelect} />
              </div>
            )}
            {/* Coordinates preview */}
            {coords && (
              <p className="text-xs text-slate-500">
                Selected Location: {coords.lat.toFixed(6)},{" "}
                {coords.lng.toFixed(6)}
              </p>
            )}
          </section>
          {/* <!-- Section 2: Description & Media --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                2
              </span>
              <h2 className="text-xl font-bold">Description &amp; Media</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Description
                </label>
                <textarea
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                  placeholder="Tell people what your event is about..."
                  rows={5}
                  value={eventData.eventDescription}
                  onChange={(event) =>
                    setEventData((previous) => ({
                      ...previous,
                      eventDescription: event.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Event Cover Image
                </label>
                {singleFile ? (
                  <div>
                    <img
                      src={singleFile.preview || "/placeholder.svg"}
                      alt={singleFile.name}
                    />
                    <button
                      onClick={() => {
                        setSingleFile(null);
                      }}
                    >
                      <X />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => inputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer group"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={inputRef}
                      onChange={handleSingleInputChange}
                    />
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        image
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      PNG, JPG or WEBP (Max. 5MB, Recommended: 1200x630px)
                    </p>
                  </div>
                )}

                {error && <p>{error}</p>}
                {!singleFile && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cover image will be uploaded when you click {submitButtonLabel}.
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* <!-- Section 3: Date & Time --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                3
              </span>
              <h2 className="text-xl font-bold">Date &amp; Time</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Start Date &amp; Time
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      calendar_today
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="date"
                      value={eventSchedule.startDate}
                      onChange={(event) =>
                        setEventSchedule((previous) => ({
                          ...previous,
                          startDate: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      schedule
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="time"
                      value={eventSchedule.startTime}
                      onChange={(event) =>
                        setEventSchedule((previous) => ({
                          ...previous,
                          startTime: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  End Date &amp; Time
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      calendar_today
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="date"
                      value={eventSchedule.endDate}
                      onChange={(event) =>
                        setEventSchedule((previous) => ({
                          ...previous,
                          endDate: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">
                      schedule
                    </span>
                    <input
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-3 text-sm"
                      type="time"
                      value={eventSchedule.endTime}
                      onChange={(event) =>
                        setEventSchedule((previous) => ({
                          ...previous,
                          endTime: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section 4: Tickets --> */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  4
                </span>
                <h2 className="text-xl font-bold">Ticket Tiers</h2>
              </div>
              <button
                className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                type="button"
                onClick={handleAddTicketTier}
              >
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
                Add Tier
              </button>
            </div>
            <div className="space-y-4">
              {ticketTiers.map((ticketTier) => (
                <div
                  key={ticketTier.id}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Ticket Type Name
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          placeholder="e.g. Early Bird"
                          type="text"
                          value={ticketTier.name}
                          onChange={(event) =>
                            handleTicketTierChange(
                              ticketTier.id,
                              "name",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Availability
                        </label>
                        <select
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          value={ticketTier.availability}
                          onChange={(event) =>
                            handleTicketTierChange(
                              ticketTier.id,
                              "availability",
                              event.target.value,
                            )
                          }
                        >
                          <option value="Paid">Paid</option>
                          <option value="Free">Free</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Price (IDR)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-sm text-slate-500">
                            Rp
                          </span>
                          <input
                            className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm"
                            placeholder="0"
                            type="text"
                            inputMode="numeric"
                            value={formatNumberWithThousandDots(
                              ticketTier.price,
                            )}
                            onChange={(event) =>
                              handleTicketTierPriceChange(
                                ticketTier.id,
                                event.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Capacity
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          placeholder="e.g. 100"
                          type="number"
                          value={ticketTier.capacity}
                          onChange={(event) =>
                            handleTicketTierChange(
                              ticketTier.id,
                              "capacity",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-slate-400 hover:text-red-500 transition-colors p-2"
                    type="button"
                    onClick={() => handleRemoveTicketTier(ticketTier.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
          {/* <!-- Section 5: PIC --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                5
              </span>
              <h2 className="text-xl font-bold">Event PIC</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Person in Contact for Customer.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  PIC Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                  type="text"
                  placeholder="PIC Name"
                  value={contactInfo.contactName}
                  onChange={(event) =>
                    handleContactInfoChange("contactName", event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                  type="email"
                  placeholder="PIC Email"
                  value={contactInfo.contactEmail}
                  onChange={(event) =>
                    handleContactInfoChange("contactEmail", event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3">
                  <select
                    className="rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3 appearance-none"
                    value={contactInfo.countryCode}
                    onChange={(event) =>
                      handleContactInfoChange("countryCode", event.target.value)
                    }
                  >
                    <option value="ID +62">ID +62</option>
                    <option value="SG +65">SG +65</option>
                    <option value="MY +60">MY +60</option>
                    <option value="US +1">US +1</option>
                  </select>
                  <input
                    className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-3"
                    type="tel"
                    inputMode="numeric"
                    placeholder="81234567890"
                    value={contactInfo.phoneNumber}
                    onChange={(event) =>
                      handleContactInfoChange(
                        "phoneNumber",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  6
                </span>
                <h2 className="text-xl font-bold">Voucher & Promotion</h2>
              </div>
              <button
                className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                type="button"
                onClick={handleAddPromotionVoucher}
              >
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
                Add Promo
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Setup discount code that customers can use when buying tickets.
            </p>
            <div className="space-y-4">
              {promotionVouchers.length === 0 && (
                <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-center">
                  <button
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium"
                    type="button"
                    onClick={handleAddPromotionVoucher}
                  >
                    <span className="material-symbols-outlined">add</span>
                    Add your first promotion
                  </button>
                </div>
              )}
              {promotionVouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Promo Name
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          type="text"
                          placeholder="e.g. EARLYBIRD RAMADAN"
                          value={voucher.name}
                          onChange={(event) =>
                            handlePromotionVoucherChange(
                              voucher.id,
                              "name",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Voucher Code
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm uppercase"
                          type="text"
                          placeholder="PROMO10"
                          value={voucher.code}
                          onChange={(event) =>
                            handlePromotionVoucherChange(
                              voucher.id,
                              "code",
                              event.target.value.toUpperCase(),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Discount Type
                        </label>
                        <select
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          value={voucher.discountType}
                          onChange={(event) =>
                            handlePromotionVoucherChange(
                              voucher.id,
                              "discountType",
                              event.target.value,
                            )
                          }
                        >
                          <option value="PERCENTAGE">Percentage (%)</option>
                          <option value="FIXED">Fixed Amount (IDR)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Discount Value
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-sm text-slate-500">
                            {voucher.discountType === "PERCENTAGE" ? "%" : "Rp"}
                          </span>
                          <input
                            className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm"
                            type="text"
                            inputMode="numeric"
                            placeholder={
                              voucher.discountType === "PERCENTAGE"
                                ? "10"
                                : "10000"
                            }
                            value={
                              voucher.discountType === "PERCENTAGE"
                                ? voucher.discountValue
                                : formatNumberWithThousandDots(
                                    voucher.discountValue,
                                  )
                            }
                            onChange={(event) =>
                              handlePromotionVoucherNumberChange(
                                voucher.id,
                                "discountValue",
                                event.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Quota
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          type="text"
                          inputMode="numeric"
                          placeholder="100"
                          value={voucher.quota}
                          onChange={(event) =>
                            handlePromotionVoucherNumberChange(
                              voucher.id,
                              "quota",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Minimum Purchase (IDR)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-sm text-slate-500">
                            Rp
                          </span>
                          <input
                            className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm"
                            type="text"
                            inputMode="numeric"
                            placeholder="50000"
                            value={formatNumberWithThousandDots(
                              voucher.minPurchase,
                            )}
                            onChange={(event) =>
                              handlePromotionVoucherNumberChange(
                                voucher.id,
                                "minPurchase",
                                event.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Maximum Discount (IDR)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-sm text-slate-500">
                            Rp
                          </span>
                          <input
                            className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm"
                            type="text"
                            inputMode="numeric"
                            placeholder="25000"
                            value={formatNumberWithThousandDots(
                              voucher.maxDiscount,
                            )}
                            onChange={(event) =>
                              handlePromotionVoucherNumberChange(
                                voucher.id,
                                "maxDiscount",
                                event.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Start Date
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          type="date"
                          value={voucher.startDate}
                          onChange={(event) =>
                            handlePromotionVoucherChange(
                              voucher.id,
                              "startDate",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          End Date
                        </label>
                        <input
                          className="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 py-2 text-sm"
                          type="date"
                          value={voucher.endDate}
                          onChange={(event) =>
                            handlePromotionVoucherChange(
                              voucher.id,
                              "endDate",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-slate-400 hover:text-red-500 transition-colors p-2"
                    type="button"
                    onClick={() => handleRemovePromotionVoucher(voucher.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* <!-- Final Actions --> */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                className="rounded text-primary focus:ring-primary border-slate-300"
                id="terms"
                type="checkbox"
                checked={hasAcceptedTerms}
                onChange={(event) => setHasAcceptedTerms(event.target.checked)}
              />
                <label
                  className="text-sm text-slate-600 dark:text-slate-400"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <Link className="text-primary hover:underline" to="/terms">
                    Terms &amp; Conditions
                  </Link>{" "}
                  of EventHub.
                </label>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto rounded-lg bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  onClick={() => navigate("/organizer/dashboard")}
                  type="button"
                >
                  Cancel
                </button>
                {isEditMode ? (
                  <button
                    className="w-full sm:w-auto rounded-lg border border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                    onClick={handlePublishEvent}
                    type="button"
                  >
                    {isSubmitting ? "Saving..." : "PUBLISH"}
                  </button>
                ) : null}
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-10 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Saving..." : submitButtonLabel}
                  <span className="material-symbols-outlined text-lg">
                    rocket_launch
                  </span>
                </button>
            </div>
          </div>
        </form>
        {/* <!-- Preview Card Sticky (Optional visual element) --> */}
        <div className="mt-16 bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready to launch?</h3>
              <p className="text-white/80 max-w-md">
                Your event will be visible to thousands of potential attendees
                as soon as you hit publish. You can still edit details later.
              </p>
            </div>
            <div className="flex -space-x-4">
              <div
                className="h-12 w-12 rounded-full border-4 border-white/20 bg-slate-200 overflow-hidden"
                data-alt="Avatar of organizer one"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKi1UpjzUYTMD5_UooKRwD7MWQ1IeOFzRlUUlAALozP_OpTKAe6AdS1GiUBLYQr7qeuMR4u_YswF3u_VZYqbR_Q3ZSEo4NGLJMimulqjOKVeLkDKqLTDrFqfZFvI3zxk6PjMhfB40cBEt6nEO1hzi8nH6yn6maxpTIFrEAKpwSC_RaNG9iEhxiSN9zFZeFx2dbzny9Nrt6IE52OZyC91lSElo3b-KWvGYdV8-9rUBizaGdG6xHlLzsAFMRpClLYMfKsxBTyBM8wY3V')`,
                }}
              ></div>
              <div
                className="h-12 w-12 rounded-full border-4 border-white/20 bg-slate-300 overflow-hidden"
                data-alt="Avatar of organizer two"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4RyLviiIh8CS6mOzr8UQz_KHlR2XfbDnBssMsUs306hlCj3iSShiYiSOn_N14etCs0AX50rTvGdtOOifg-6Cybs6oXPFst05CXuMfQiHO_2ByMNN5TBAH6s3kwDe4wqyKe_unCjiKJXI5-afi94UKAiEZRJnTYUpPBvX7Oss0tYuhvF3tlh_zuGttOLYdxjXQudJXxMO3vBX28ztqbHQPSuIOwHOrCFguXYlDZrsoN_69r03ZGHQm6_1kPwvhzxTDbONp1d4HoCwR')`,
                }}
              ></div>
              <div
                className="h-12 w-12 rounded-full border-4 border-white/20 bg-slate-400 overflow-hidden"
                data-alt="Avatar of organizer three"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ2fSeMEtEZohsX4jSnRpwWAKnD0FykgpZ35yVZhm_JGzKCWKIZkqwVQHiKDw8yzXMfS_CfuDM4LIdK8wbWqhRRX4vLNf9hZXE6fLyVxwNy-9EzIjXS_XAQN5Eb__wnUw6s103G2oWiYIkJ0nCxrqXUhE008FuooWZqqfsxXGKK0VBEkMj81lmX7lt-6iia41hYxNr_FUJyluWgQen9TkrphsRQuXY_C2eAh8MYNoLFz1aUpeYV7VHKpOmEubiYKXgwdDgjiKNbmk')`,
                }}
              ></div>
              <div className="h-12 w-12 rounded-full border-4 border-white/20 bg-primary/80 flex items-center justify-center text-xs font-bold">
                +12
              </div>
            </div>
          </div>
          {/* <!-- Abstract background shape --> */}
          <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
          </>
        )}
      </main>
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Copyright 2024 EventHub Platform. All rights reserved.</p>
      </footer>
    </>
  );
}
