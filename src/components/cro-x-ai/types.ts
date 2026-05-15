export type PlatformKey =
  | 'website'
  | 'instagram'
  | 'google_business'
  | 'linkedin'
  | 'facebook'
  | 'tiktok';

export type CroXModel = 'mini' | 'ultra';

export type ChatMessageKind = 'bot' | 'address' | 'success';

export interface ChatMessage {
  id: string;
  kind: ChatMessageKind;
  text: string;
  platform?: PlatformKey;
  inlineLoginLink?: boolean;
  inlineAnalizLink?: boolean;
}

export type AddressMap = Partial<Record<PlatformKey, string>>;

export interface SubmitPayload {
  type: CroXModel;
  addresses: Record<PlatformKey, string>;
}
