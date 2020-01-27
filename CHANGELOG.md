# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.12] - 2020-01-27

### Added

- Change `contentCategories` interface to return key and value

## [2.4.11] - 2020-01-27

### Added

- Add `contentCategories` method to retrieve categories of content provided by partners
- Rename from `legalRestrictions` to `legalRestriction` on `ContentPartner`

## [2.4.10] - 2020-01-22

### Added

- Add video types endpoint to Boclips API interface

### Added

- Add `accountsClient.updateAccount` method to be able to set `accessExpiresOn` on organisations

## [2.4.9] - 2020-01-22

### Changed

- `/independent-accounts` are upgraded to `/accounts`
- no longer expecting `next` page link from `/accounts`

## [2.4.8] - 2020-01-15

### Changed

- Update content-type header on jobs and http-feeds end points

## [2.4.7] - 2020-01-14

### Changed

- Remove verification of content partners endpoint

## [2.4.6] - 2020-01-09

### Changed

- Add manually creating content partners

## [2.4.5] - 2020-01-09

### Changed

- Filter for independent accounts is now optional

## [2.4.4] - 2020-01-09

### Fixed

- Calculation of PageSpec for FakeAccountsClient

## [2.4.3] - 2020-01-07

### Fixed

- Make PageableEntity links optional

## [2.4.2] - 2020-01-07

### Changed

- Remove `lessonPlan` from `Subject` model

## [2.4.1] - 2019-12-18

### Fixed

- Fixed bug to do with jobs pages not being parsed properly

## [2.4.0] - 2019-12-17

### Removed

- videos link used for bulk updates of videos

## [2.3.1] - 2019-12-13

### Added

- Independent Accounts Client

## [2.3.0] - 2019-12-05

- Fix collection contracts

### Changed

## [2.2.5] - 2019-11-29

### Changed

- `eventsClient.trackCollectionInteraction`
  - now expects a partial `Collection` argument, only the `id` and the `links` are required
  - `CollectionInteractedWithRequest` now contains `CollectionInteractionType` instead of a string

## [2.2.4] - 2019-11-28

### Added

- A new `Job's` subclient that exposes these methods:
  - `getAll` to fetch all **jobs**, this can also be filtered by status
  - `get` to fetch a single **job** by id
- New event `trackUserExpired` for when an expired user has logged in
- `Events` subclient expose new method:
  - `trackCollectionInteraction` to track collection usage

## [2.2.3] - 2019-11-20

### Added

- A new `Events` subclient is added and expose:
  - `trackPageRendered` to be able to track user navigation

## [2.2.2] - 2019-11-18

### Added

- `SubjectFactory` exported for testing support in consumer apps

## [2.2.1] - 2019-11-15

### Added

- A new `Order's` subclient that exposes these methods:
  - `getAll` to fetch all **orders**
  - `get` to fetch a single **order** by id
  - `updateCurrency` to update an **order's** currency
  - `updateItem` to update an individual **orderItem**
    - Uses a self-link to update the **orderItem**
- `Subjects.lessonPlan` Used to indicate whether a subject contains a collection that has a lesson plan attached.
- Added `TestSupport.isATestClient` for handy checking and typescript help during your tests

### Changed

- `Subjects.updateLink` -> `Subjects.links.update` Normalisation of links produced in API

### Fixed

- The Pact verification failed occasionally due to a DateTime format issue.

## [2.2.0] - 2019-11-05

### Changed

- `ContentPartnersClient`'s `update` method no longer needs a self link in the `UpdateContentPartnerRequest` object

## [2.1.0] - 2019-11-04

### Added

- `Collections` subclient exposes new methods
  - `getAllFiltered` to query pageable list of **collections** by an optional filter
  - `create` to create a new **collection**
  - `update` to be able to update an existing **collection**
