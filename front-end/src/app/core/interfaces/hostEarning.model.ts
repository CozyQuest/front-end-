import { RentingHistoryItem } from "./rentingHistoryItem.model";

export interface HostEarnings {
  totalProfit: number;
  items: RentingHistoryItem[];
}
