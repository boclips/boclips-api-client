import { ContentWarning } from './model/ContentWarning';

export class ContentWarningsConverter {
  public static convert(response: any): ContentWarning[] {
    return response.data._embedded.contentWarnings.map((data: any) => ({
      id: data.id,
      label: data.label,
    }));
  }
}
