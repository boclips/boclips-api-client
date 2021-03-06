import URI from 'urijs';
import 'urijs/src/URITemplate';

export default function expandUrlTemplate(
  template: string,
  params: {
    [key: string]:
      | string
      | number
      | string[]
      | number[]
      | boolean
      | undefined
      | null;
  },
) {
  return URI.expand!(template, params).normalize().toString();
}
