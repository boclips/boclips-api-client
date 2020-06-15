# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [12.1.1] - 2020-06-15

- Add two new subevents for CollectionInteractedWith

## [12.1.0] - 2020-06-08

- Use new /contracts endpoint instead of /content-parnter-contracts

## [12.0.0] - 2020-06-05

- Rename contentPartner to channel on OrderItem
- Rename content_partner to channel when filtering for ingest videos
- Rename contentPartner to channel on IngestVideo

## [11.0.0] - 2020-06-01

- Rename ContentPartnersClient -> ChannelsClient
- Rename ContentPartner -> Channel
- Rename ContentPartnerContractsClient -> ContractsClient
- Rename ContentPartnerContract -> Contract

## [10.7.0] - 2020-05-30

- Allow platformInteractedWith events to be sent anonymously

## [10.6.0] - 2020-05-28

- Add max res flag to video playback

## [10.5.4] - 2020-05-20

- Use SortKey enum in VideoSearchRequest

## [10.5.3] - 2020-05-19

- Add `sort_by` to VideoSearchRequest

## [10.5.2] - 2020-05-18

- Remove `adminCollectionSearch` use `searchCollections` instead
- Add `getMyCollections` for convenience

## [10.5.1] - 2020-05-18

- Rename `public` to `discoverable` (in collections)

## [10.5.0] - 2020-05-18

- Add url to collectionInteractedWith event to set boclips-referer as normal referer is unreliable
- Add `contentWarnings` subclient, update admin links to get all content warnings
- Update video request can contain content warnings

## [10.4.0] - 2020-05-13

- Add `setThumbnail` and `deleteThumbnail` to `VideoClient`
- Expose `setThumbnail` and `deleteThumbnail` links on playbacks

## [10.3.0] - 2020-05-11

- Expose `assets` on video links

## [10.2.2] - 2020-05-06

- Expose `editThumbnail` on playback links
- Add retrieval and editing of video caption content

## [10.2.1] - 2020-05-06

- Export order subtypes
- Add missing type for projected resource

## [10.2.0] - 2020-05-01

- Enable projections for video resource

## [10.1.2] - 2020-04-29

- Fix verify step for bestForTags on a video

## [10.1.1] - 2020-04-25

- Add Client to BoclipsClient to truly expose it

## [10.1.0] - 2020-04-25

- Expose suggestion client
- Fix dependency vulnerabilities

## [10.0.7] - 2020-04-23

- Make name optional on contract update

## [10.0.6] - 2020-04-23

- `UpdateVideoRequest` can handle video tags

## [10.0.5] - 2020-04-21

- Allow content partner contract to be null

## [10.0.4] - 2020-04-21

- Add contract fields to content partner
- Add `id` parameter to video search to look up multiple videos

## [10.0.3] - 2020-04-16

### Added

- Update version

## [10.0.2] - 2020-04-16

### Added

- Update content partner contract

## [10.0.1] - 2020-04-16

### Added

- Enabled TS strict mode

## [10.0.0] - 2020-04-16

### Added

- Extracted initialisation

## [9.1.0] - 2020-04-16

### Added

- `videosClient` provides a search method

## [9.0.0] - 2020-04-15

### Changed

- `videosClient` update takes only the video id and an `UpdateVideoRequest`

## [8.9.1] - 2020-04-15

### Changed

- Retrofit tests for attachments conversion
- Change attachments property on videos to be initialised with empty list (instead of undefined)

## [8.9.0] - 2020-04-14

- `eventsClient` can track platform interaction events

## [8.8.1] - 2020-04-14

- Remove old ageRange from content partner

## [8.8.0] - 2020-04-09

- Use body for video updates instead of query params (align with new behavior of video update endpoint)
- Add attachment updating functionality to video update
- Refactor attachment request to share between videos and collections

## [8.7.0] - 2020-04-09

### Added

- Video client provides video attachments

### Changed

- Moved the location of attachments to share them between collections and videos

### Fixed

- Removed unnecessary `console.log`s

## [8.6.5] - 2020-04-08

### Fixed

- Fix FakeVideoClient to be able to test `promoted` updates

## [8.6.4] - 2020-04-08

### Fixed

- Video pact verification can handle multiple subjects

## [8.6.3] - 2020-04-08

### Changed

- Add contract legal restrictions to api client

### Added

- `videosClient` can update ageRange and subjects

## [8.6.2] - 2020-04-07

### Changed

- video sample comes with appropriate links

## [8.6.1] - 2020-04-06

### Added

- `contentPartnerContractsClient` can now request signed upload links
- `videosClient` can update videos' title, description and promoted flag

## [8.6.0] - 2020-04-03

## Added

- Add `videosClient`

  - implement `GET videos/{id}`

## Changed

- `Video` contains all available fields

## [8.5.0] - 2020-04-01

- Can fetch all CP contracts

## [8.4.0] - 2020-04-01

- CP contract has new field, contractIsRolling

## [8.3.0] - 2020-03-30

- CP contract client supports costs

## [8.2.0] - 2020-03-30

- Change the CP contract client create API

## [8.1.0] - 2020-03-30

- Job details capable of downloading CSV

## [8.0.2] - 2020-03-27

## Added

- Content partner contract client now available

## [8.0.1] - 2020-03-26

## Added

- `Collection` exposes `promoted` field

## [8.0.0] - 2020-03-26

## [7.0.0] - 2020-03-24

### Changed

- In prior versions the global axios instance was polluted with internal error handling concerns.
  This release removes the pollution by creating a self-contained instance.

## [6.2.6] - 2020-03-23

### Added

- Corrected language type in content partner request.

## [6.2.5] - 2020-03-23

### Added

- `Video` contains `Playback` type information

## [6.2.4] - 2020-03-19

### Changed

- Make content categories optional when creating a content partner

## [6.2.3] - 2020-03-19

### Changed

- Fix content categories type in content partner request

## [6.2.2] - 2020-03-18

### Changed

- Add functionality to Organisation client to assign users with organisations by domain
- Add User objects (only used in organisation context for now)

## [6.2.1] - 2020-03-17

### Changed

- Dropped legacy http feeds

## [6.2.0] - 2020-03-17

### Changed

- Change urls to playlistIds in YT IngestDetails

## [6.1.0] - 2020-03-16

### Changed

- Change url to urls in IngestDetails

## [6.0.5] - 2020-03-16

### Changed

- Use POST instead of PATCH for updating organisations
- Enable client to set domain of organisations

## [6.0.4] - 2020-03-16

### Changed

- Make organisations searchable by name

## [6.0.3] - 2020-03-14

### Changed

- Revert changes made in 6.0.1

## [6.0.2] - 2020-03-13

### Changed

- Pact creation fix
- Organisations to contain associateUsers link

## [6.0.1] - 2020-03-13

### Changed

- Rename EduAgeRange -> AgeRange and AgeRange -> AgeRanges
- Update age ranges to maintain consistency with Teachers

## [6.0.0] - 2020-03-11

### Changed

- Merge content partner update and create requests into one type

## [5.1.4] - 2020-03-10

### Changed

- Add delivery freq and ingest details to CP create request.

## [5.1.3] - 2020-03-10

### Changed

- Add domain property to organisations

## [5.1.2] - 2020-03-10

### Changed

- Manual and custom ingest url type changed to never

## [5.1.1] - 2020-03-10

### Changed

- Axios upgraded from 0.19.0 to 0.19.2
- Typescript upgraded from 3.6.3 to 3.8.3

## [5.1.0] - 2020-03-09

### Changed

- Added delivery frequency and ingest details to content partners
- Added dependency on moment.js

## [5.0.0] - 2020-03-06

### Changed

- Change organisation to have contentPackageId instead of accessRuleIds

## [4.0.3] - 2020-03-05

### Changed

- Added `VISIT_LESSON_GUIDE` subtype to `CollectionInteractionType`

## [4.0.2] - 2020-03-02

### Changed

- Added MarketingInformation fields to domain

## [4.0.1] - 2020-03-02

### Changed

- Made MarketingInformation fields nullable

## [4.0.0] - 2020-03-02

### Changed

- Renamed accounts -> organisations

## [3.0.15] - 2020-02-27

### Added

- Content partner create/update marketing fields

## [3.0.14] - 2020-02-26

### Added

- Content partner signed link retrieval

## [3.0.13] - 2020-02-25

### Added

- Add filtering for ingest statuses

## [3.0.12] - 2020-02-21

### Fix

- Fix typings for pedagogy tab

## [3.0.11] - 2020-02-21

### Added

- Add new IngestVideoStatusesClient

## [3.0.10] - 2020-02-21

### Fixed

- Can retrieve pedagogy information for a content partner

## [3.0.9] - 2020-02-18

### Changed

- Add ids to ageRange

## [3.0.8] - 2020-02-18

### Changed

- Don't return the userId property on 'best for' tags

## [3.0.7] - 2020-02-17

### Changed

- Allow filtering ingest videos by content partner name

## [3.0.6] - 2020-02-14

### Changed

- Expose marketing statuses client on BoclipsClient.

## [3.0.5] - 2020-02-14

### Changed

- Make max age range optional

## [3.0.4] - 2020-02-13

### Changed

- Expose educational age range client on BoclipsClient

## [3.0.3] - 2020-02-13

### Changed

- Add age range endpoint

## [3.0.2] - 2020-02-12

### Changed

- Add marketing information to content partners

## [3.0.1] - 2020-02-06

### Changed

- Add bestForTags client

## [3.0.0] - 2020-02-06

### Changed

- Format API errors as BoclipsApiError instead of AxiosError

## [2.4.21] - 2020-02-06

### Changed

- Add default values to content partner fields

## [2.4.20] - 2020-02-05

### Changed

- Version bump (Concourse needs it for a release after previous release failure)

## [2.4.19] - 2020-02-05

### Changed

- Change PUT to PATCH in content partner update endpoint

## [2.4.18] - 2020-02-04

### Fixed

- FakeJobsClient now clearing all memory when cleared is called

## [2.4.17] - 2020-02-03

### Fixed

- FakeJobsClient was not properly handling manuallyCreated=false filtering

## [2.4.16] - 2020-01-31

### Fixed

- ContentType of ContentPartner should be optional

## [2.4.15] - 2020-01-31

### Added

- Add contentTypes to content partner

## [2.4.14] - 2020-01-30

### Fixed

- ApiJobsClient was not using manuallyCreated=false in request
- IngestVideosFactory was not correctly setting the status

## [2.4.13] - 2020-01-29

### Added

- Add ingestVideos client

### Removed

- Remove jobs status filter, add manual filter

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
