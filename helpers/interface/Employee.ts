export interface Employee {
  id: number;
  name: string;
  createdAt: string;
  [key: string]: any;
  subordinate?: Employee[];
}
