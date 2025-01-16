export type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Tickets: undefined;
  Profile: undefined;
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
};