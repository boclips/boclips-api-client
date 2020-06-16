export interface ShareCodesClient {
  validate(referrer: string, shareCode: string): Promise<boolean>;
}
