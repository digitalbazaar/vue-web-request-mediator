# vue-web-request-mediator ChangeLog

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
