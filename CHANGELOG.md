# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [27.1.1] - 2020-01-25

- Add `captionsRequested` to `AdditionalServices`

## [27.1.0] - 2020-01-25

- Add `transcriptRequested` to `AdditionalServices`

## [27.0.0] - 2020-01-22

- No change, just syncing up the version with our releases.

## [26.0.1] - 2020-01-22

- Refactor FakeUsersClient to have a default currentUser.

## [26.0.0] - 2020-01-21

- Add note field to the Cart and Order
- The placeOrder function on OrdersClient takes PlaceOrderRequest object

## [25.0.1] - 2020-01-21

- Add deliveryDate to Order

## [25.0.0] - 2020-01-21

- Rename `transcriptRequested` to `captionsRequested` in `order`

## [24.0.2] - 2020-01-19

- Bug fixes and tsc fixed for PATCH cart item

## [24.0.1] - 2020-01-13

- Add PATCH cart item with additional services

## [24.0.0] - 2020-01-13

- Remove `throughPlatform` from `Order`

## [23.0.1] - 2020-01-13

- Fix order's client to use 0 based pagination

## [23.0.0] - 2020-01-12

- Remove displayValue from price on Video

## [22.0.0] - 2020-01-04

- Implement paginated order response with page and orders

## [21.5.0] - 2020-12-22

- Add get paginated orders

## [21.4.2] - 2020-12-22

- Add method allowing for rejecting placing order

## [21.4.1] - 2020-12-22

- Add method allowing for rejecting placing order

## [21.4.0] - 2020-12-16

- Add delete cart item

## [21.3.1] - 2020-12-16

- Fix fakeVideosClient to handle arrays when searching by id

## [21.3.0] - 2020-12-16

- Add `placeOrder` function to `OrdersClient`

## [21.2.1] - 2020-12-16

- Remove unreliable order status update test

## [21.2.0] - 2020-12-14

- Add status to update order

## [21.1.0] - 2020-12-10

- Add price resource to video

## [21.0.3] - 2020-12-09

- Update FakeVideoClient to make filters exclusive.
  Before it would return matches on any filter specified, now it requires a match on all specified

## [21.0.2] - 2020-11-27

- Update tests to reflect new video type facet format

## [21.0.1] - 2020-11-25

- Add insert cart item

## [21.0.0] - 2020-11-25

- Change facet structure to return arrays rather than objects

## [20.3.0] - 2020-11-25

- Add `CartsClient` that has `getCart` and `addItemToCart`

## [20.2.0] - 2020-11-25

- Update search facets to include ids and names

## [20.1.2] - 2020-11-24

- Fix video client fake video type filtering

## [20.1.1] - 2020-11-24

- Remove unused video_type param from video search request

## [20.1.0] - 2020-11-23

- Allow filtering of video search by video type and expose type facets

## [20.0.0] - 2020-11-05

- Use dajs instead of moment.js

## [19.0.2] - 2020-10-22

- Add `LTI_DEPLOYMENT` as Organisation type

## [19.0.1] - 2020-10-07

- Update suggestions

## [19.0.0] - 2020-10-07

- Change updateOrder to take an order instead of id.

## [18.0.0] - 2020-10-05

- Remove updateCurrency from OrdersClient. Users should use updateOrder instead

## [17.5.6] - 2020-10-02

- Fix invalid assertions for `Content-Type` headers

## [17.5.5] - 2020-10-01

- Update FakeUsersClient to reject when current user is not set up

## [17.5.4] - 2020-10-01

- Add 'id' field to channel facet

## [17.5.3] - 2020-10-01

- Add getCurrentUser to UsersClient

## [17.5.2] - 2020-09-30

- Fix FakeVideoClient to use channel ID instead of name

## [17.5.1] - 2020-09-30

- Add 'id' field to suggestion channel

## [17.5.0] - 2020-09-30

- Can update organisation on an order

## [17.4.5] - 2020-09-28

- Fix orders fake for updating license

## [17.4.4] - 2020-09-25

- Add tests for order conversion

## [17.4.3] - 2020-09-24

- Add `trim` field to items in order response

## [17.4.2] - 2020-09-17

- Fix invalid assertions for `Content-Type` headers

## [17.4.1] - 2020-09-04

- Fix `fakeContractsClient` `insertFixture` to append fixture to existing fixtures

## [17.4.0] - 2020-09-02

- Can fetch contracts with projections

## [17.3.0] - 2020-08-28

- Add `channels` to `VideoFacets`
- Add optional queryParam `include_channel_facets` to `VideoSearchRequest`

## [17.2.0] - 2020-08-16

- Add new `users` sub-client with `isUserActive` method

## [17.1.3] - 2020-08-13

- `fetchVideo` can take shareCode and referer as query params

## [17.1.2] - 2020-07-30

- Add filtering by subjects in `FakeVideosClient` search

## [17.1.1] - 2020-07-29

- Add `subjects` to suggestions response

## [17.1.0] - 2020-07-24

- Add ability to get and update individual content packages

## [17.0.1] - 2020-07-24

- Rename `contentPackages` -> `getContentPackages` in admin links

## [17.0.0] - 2020-07-12

- Add `HUMAHUMAN_GENERATED_AVAILABLE` and `AUTO_GENERATED_AVAILABLE` to CaptionStatus in favor of `AVAILABLE`

## [16.3.0] - 2020-07-16

- Add `SearchQueryCompletionsSuggested` to events client

## [16.2.0] - 2020-07-15

- Add content packages client (list only)

## [16.1.3] - 2020-07-09

- Add a way of returning rejection in FakeVideosClient's `setCustomThumbnail`

## [16.1.2] - 2020-07-08

- FakeVideosClient allows setting up default facets for testing

## [16.1.1] - 2020-07-08

- Add `setCustomThumbnail` link to `deleteThumbnail` response

## [16.1.0] - 2020-07-07

- Add facets and more filters to Video Search & results

## [16.0.0] - 2020-07-07

- Rename `setThumbnail` -> `setThumbnailBySecond`
- Add `setCustomThumbnail` method to VideosClient

## [15.0.2] - 2020-07-03

- Remove check on `bestFor` as it can be empty in video search

## [15.0.1] - 2020-06-29

- Use eachLike instead of [] for order interaction

## [15.0.0] - 2020-06-29

- Change videos on orders to have multiple types

## [14.3.0] - 2020-06-26

- Add type to Order Status
- Add more order factories

## [14.2.0] - 2020-06-26

- Add optional additionalDescription field to video

## [14.1.1] - 2020-06-23

- Add REQUESTED to OrderCaptionStatus

## [14.1.0] - 2020-06-23

- Add new video delivery fields to Order

## [14.0.1] - 2020-06-22

- Update types for sortkey

## [14.0.0] - 2020-06-19

- Rename ContentPartnerSuggestion -> ChannelSuggestion

## [13.2.2] - 2020-06-18

- Collection Search can ignore discoverable collection parameter for the backoffice use-case

## [13.2.1] - 2020-06-18

- Expose FINAL_PROJECT attachment type

## [13.2.0] - 2020-06-17

- Add attachment client - now we can fetch all attachment types

## [13.1.0] - 2020-06-16

- Add share code client - this allows verification of userIds and share codes

## [13.0.0] - 2020-06-15

- Remove official field from a Channel

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
