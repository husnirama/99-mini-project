import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const defaultCenter = {
  lat: -6.2088,
  lng: 106.8456,
};

interface MapPickerProps {
  onSelect?: (coords: { lat: number; lng: number }) => void;
  value?: { lat: number; lng: number } | null;
}

export default function MapPicker({
  onSelect,
  value,
}: MapPickerProps) {
  const selectedPosition = value ?? defaultCenter;

  const emitSelection = (lat: number, lng: number) => {
    onSelect?.({ lat, lng });
  };

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    emitSelection(e.latLng.lat(), e.latLng.lng());
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    emitSelection(e.latLng.lat(), e.latLng.lng());
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedPosition}
      zoom={13}
      onClick={handleClick}
      options={{ clickableIcons: false }}
    >
      <Marker
        position={selectedPosition}
        draggable
        onDragEnd={handleMarkerDragEnd}
      />
    </GoogleMap>
  );
}
