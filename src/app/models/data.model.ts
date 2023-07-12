export interface Attributes {
  "guestToken": string;
  "agent-token": string;
  "meeting-point": boolean;
  "start-time": string;
  "end-time": string;
  "time-out-time": string;
  "status": string;
  "video-session-mode": string;
  "agent-login": string;
  "usecase-id": string;
  "product-id": string | null;
  "template-id": string | null;
  "reference": string;
  "automatic-trigger": boolean;
  "extra-parameters": string | null;
  "name": string;
  "guest-display-name": string;
  "agent-display-name": string;
  "guest-default-url": string;
  "agent-default-url": string;
  "appointment-code": string | null;
}


interface Self {
  self: string;
}

export interface Data {
  id: string | null;
  type: string;
  links: Self | null;
  attributes: Attributes
}
