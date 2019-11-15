export class CustomMatchers {
  /**
   * Adding this relaxed matcher because the Pact built-in ISO8601_DATETIME_WITH_MILLIS_FORMAT
   * expects to have at least 3 digits in milliseconds field but currently the Jackson serializer
   * sometimes loses precision thus our contract tests are failing.
   */
  public static ISO8601_DATETIME_RELAXED =
    '^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d{1,}([+-][0-2]\\d:[0-5]\\d|Z)$';
}
