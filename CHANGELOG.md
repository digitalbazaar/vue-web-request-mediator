# vue-web-request-mediator ChangeLog

## 2.1.0 - TBD

### Added
- Expose `WrmHint` component.

## 2.0.0 - 2019-01-21

### Added
- Add `WrmWizardDialog` for building simple wizards such as those that will
  enable first party storage access from third party contexts.
- Add `WrmHeaderBackButton`.

### Changed
- **BREAKING**: Remove dialog from hint chooser; hint chooser must now be
  embedded in a dialog or other UI component.
- Various CSS/appearance changes.

### Removed
- **BREAKING**: Remove `requestStorageAccess` wrapper function. If needed, get
  it from `web-request-mediator` 1.1.x.
- **BREAKING**: Remove `load-hints` and storage access handling code from
  hint chooser.

## 1.2.3 - 2018-10-14

### Changed
- Add `only` to screen media queries.
- Map classic modal CSS vars to modern ones.

## 1.2.2 - 2018-10-14

### Changed
- Modernize default permission dialog.

## 1.2.1 - 2018-10-14

### Changed
- Use percentages instead of viewport units for fixed
  positioned elements.

## 1.2.0 - 2018-10-12

### Changed
- Make `wrm-panel` appear as a modal with an iframe sibling.
- Remove `https` from origin display.

### Added
- Add `WrmOrigin` component.
- Add `WrmOriginName` component.
- Add `WrmOriginIcon` component.

## 1.1.6 - 2018-10-10

### Changed
- Use more modern (brighter) CSS colors.

## 1.1.5 - 2018-10-09

### Fixed
- Remove erroneous overflow class.

## 1.1.4 - 2018-10-09

### Changed
- Enable scrolling ellipsis text on mobile.

## 1.1.3 - 2018-10-09

### Fixed
- Add ellipsis overflow CSS.

## 1.1.2 - 2018-10-09

### Fixed
- Fix mobile CSS bugs.

## 1.1.1 - 2018-10-09

### Fixed
- Fix responsive modal bugs.

## 1.1.0 - 2018-10-08

### Added
- Add `WrmOriginCard` component.
- Add `message` slot for hint chooser.
- Provide method for getting web app manifest icon.
- Add `WrmCheckbox` component.

### Changed
- Simplify hint chooser UI (remove cancel button when confirm
  button is not shown).
- Improve CSS for close buttons and more responsive modals.

## 1.0.6 - 2018-09-27

### Fixed
- Allow cancelation after a hint has been
  selected/during its confirmation.

## 1.0.5 - 2018-08-08

### Fixed
- Use iOS-targeted media query to restrict hover
  CSS to non-iOS devices.

## 1.0.4 - 2018-08-08

### Fixed
- Revert only using `hover` CSS when supported on
  platform as not enough platforms support the
  media query yet.

## 1.0.3 - 2018-08-08

### Fixed
- Only use `hover` CSS when supported on platform.

## 1.0.2 - 2018-08-03

### Changed
- Adjust text color for readability.

## 1.0.1 - 2018-07-31

### Changed
- Remove wrm-panel `strong` color changes.
- Align text left in `wrm-panel`.

## 1.0.0 - 2018-07-20

## 0.1.0 - 2018-07-20

### Added
- Add core files.

- See git history for changes previous to this release.
