export interface channelsInput {
  keyName: string;
  displayName: string;
  metadata: Record<string, any>;
}

export interface categoryInput {
  name: string;
  subCategories: number;
}
