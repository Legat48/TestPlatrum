export interface Employee {
  id: number;
  name: string;
  [key: string]: any;
  subordinate?: Employee[];
}
