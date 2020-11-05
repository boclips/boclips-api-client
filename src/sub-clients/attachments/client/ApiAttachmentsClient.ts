import { ApiSubClient } from '../../common/client/ApiSubClient';
import { AttachmentsClient } from './AttachmentsClient';
import { convert } from './AttachmentTypeConverter';

export class ApiAttachmentsClient
  extends ApiSubClient
  implements AttachmentsClient {
  public getTypes() {
    const attachmentTypesLink = this.getLinkOrThrow('attachmentTypes');

    return this.axios
      .get(attachmentTypesLink.href)
      .then((response) =>
        response.data._embedded.attachmentTypes.map((it: any) => convert(it)),
      );
  }
}
