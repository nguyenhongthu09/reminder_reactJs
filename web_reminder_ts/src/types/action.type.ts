interface IAction {
  id: number;
  key: string;
  icon: React.ReactNode;
  onClick: () => void;
}
export type { IAction };
