export default interface Driver {
  id: string;
  name: string;
  status: "delivering" | "paused" | "idle" | "completed";
  eta: string;
  numDelivering: number;
  location: {
    lat: number;
    lng: number;
  };
}
