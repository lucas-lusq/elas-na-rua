export type ReportedItem = {
  coordinate: {
    lat: number;
    lng: number;
  };
  incidentType?: IncidentType;
};

export type IncidentType = {
  name:
    | "assedio"
    | "rua-deserta"
    | "iluminacao"
    | "grupos-suspeitos"
    | "espaco-abandonado-ou-degradado";
  iconName: string;
  description: string;
};

export type IncidentSelectionState = "selecting-incident" | "incident-selected";

export type AppState = {
  reportedItems: ReportedItem[];
  incidentSelectionState: IncidentSelectionState;
  stagingSelection?: ReportedItem;
};

export type PageState =
  | "home-stage"
  | "incident-moment-stage"
  | "incident-picking";
