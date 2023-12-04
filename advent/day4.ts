type Address = { address: string; city: string };
type PresentDeliveryList<T extends Record<string, unknown>> = {
  [Key in keyof T]: Address;
};
