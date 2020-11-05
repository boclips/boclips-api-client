import { Clearable } from '../../common/utils/Clearable';
import { ShareCodesClient } from './ShareCodesClient';

export class FakeShareCodesClient implements ShareCodesClient, Clearable {
  private validShareCodes: { id: string; code: string }[] = [];

  public insertValidShareCode(id: string, code: string) {
    this.validShareCodes.push({ id, code });
  }

  public async validate(userId: string, shareCode: string): Promise<boolean> {
    return !!this.validShareCodes.find(
      (code) => code.id === userId && code.code === shareCode,
    );
  }

  public clear() {
    this.validShareCodes = [];
  }
}
