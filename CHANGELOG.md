# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
