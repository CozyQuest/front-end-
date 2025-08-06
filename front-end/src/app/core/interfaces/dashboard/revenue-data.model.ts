export interface RevenueData {
  labels: string[]; // e.g., ['Jan', 'Feb', ...]
  datasets: {
    label: string;
    data: number[];
  }[];
}
