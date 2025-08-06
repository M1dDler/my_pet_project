export interface Portfolio {
  id: number;
  name: string;
  totalValue: number;
  position: number;
  includeInTotal: boolean;
  avatarIcon: string;
  avatarColor: string;
}

export interface Transaction {
  id: number;
  coinName: string;
  quantity: string;
  pricePerUnit: string;
  transactionDate: string;
  fee: string;
  note: string;
}
