// @flow

import createGridComponent from './createGridComponent';

import type { Props, ScrollToAlign } from './createGridComponent';

const FixedSizeGrid = createGridComponent({
  getColumnOffset: ({ columnWidth }: Props, index: number): number =>
    index * ((columnWidth: any): number),

  getColumnWidth: ({ columnWidth }: Props, index: number): number =>
    ((columnWidth: any): number),

  getRowOffset: ({ rowHeight }: Props, index: number): number =>
    index * ((rowHeight: any): number),

  getRowHeight: ({ rowHeight }: Props, index: number): number =>
    ((rowHeight: any): number),

  getEstimatedTotalHeight: ({ rowCount, rowHeight }: Props) =>
    ((rowHeight: any): number) * rowCount,

  getEstimatedTotalWidth: ({ columnCount, columnWidth }: Props) =>
    ((columnWidth: any): number) * columnCount,

  getOffsetForColumnAndAlignment: (
    { columnCount, columnWidth, width }: Props,
    columnIndex: number,
    align: ScrollToAlign,
    scrollLeft: number
  ): number => {
    const maxOffset = Math.min(
      columnCount * ((columnWidth: any): number) - width,
      columnIndex * ((columnWidth: any): number)
    );
    const minOffset = Math.max(
      0,
      columnIndex * ((columnWidth: any): number) -
        width +
        ((columnWidth: any): number)
    );

    switch (align) {
      case 'start':
        return maxOffset;
      case 'end':
        return minOffset;
      case 'center':
        return Math.round(minOffset + (maxOffset - minOffset) / 2);
      case 'auto':
      default:
        if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
          return scrollLeft;
        } else if (scrollLeft - minOffset < maxOffset - scrollLeft) {
          return minOffset;
        } else {
          return maxOffset;
        }
    }
  },

  getOffsetForRowAndAlignment: (
    { rowHeight, height, rowCount }: Props,
    rowIndex: number,
    align: ScrollToAlign,
    scrollTop: number
  ): number => {
    const maxOffset = Math.min(
      rowCount * ((rowHeight: any): number) - height,
      rowIndex * ((rowHeight: any): number)
    );
    const minOffset = Math.max(
      0,
      rowIndex * ((rowHeight: any): number) -
        height +
        ((rowHeight: any): number)
    );

    switch (align) {
      case 'start':
        return maxOffset;
      case 'end':
        return minOffset;
      case 'center':
        return Math.round(minOffset + (maxOffset - minOffset) / 2);
      case 'auto':
      default:
        if (scrollTop >= minOffset && scrollTop <= maxOffset) {
          return scrollTop;
        } else if (scrollTop - minOffset < maxOffset - scrollTop) {
          return minOffset;
        } else {
          return maxOffset;
        }
    }
  },

  getColumnStartIndexForOffset: (
    { columnWidth, columnCount }: Props,
    scrollLeft: number
  ): number =>
    Math.max(
      0,
      Math.min(
        columnCount - 1,
        Math.floor(scrollLeft / ((columnWidth: any): number))
      )
    ),

  getColumnStopIndexForStartIndex: (
    { columnWidth, columnCount, width }: Props,
    startIndex: number,
    scrollLeft: number
  ): number => {
    const left = startIndex * ((columnWidth: any): number);
    return Math.max(
      0,
      Math.min(
        columnCount - 1,
        startIndex +
          Math.floor(
            (width + (scrollLeft - left)) / ((columnWidth: any): number)
          )
      )
    );
  },

  getRowStartIndexForOffset: (
    { rowHeight, rowCount }: Props,
    scrollTop: number
  ): number =>
    Math.max(
      0,
      Math.min(rowCount - 1, Math.floor(scrollTop / ((rowHeight: any): number)))
    ),

  getRowStopIndexForStartIndex: (
    { rowHeight, rowCount, height }: Props,
    startIndex: number,
    scrollTop: number
  ): number => {
    const left = startIndex * ((rowHeight: any): number);
    return Math.max(
      0,
      Math.min(
        rowCount - 1,
        startIndex +
          Math.floor((height + (scrollTop - left)) / ((rowHeight: any): number))
      )
    );
  },

  initInstanceProps(props: Props): any {
    // Noop
  },

  validateProps: ({ columnWidth, rowHeight }: Props): void => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof columnWidth !== 'number') {
        throw Error(
          'An invalid "columnWidth" prop has been specified. ' +
            'Value should be a number. ' +
            `"${
              columnWidth === null ? 'null' : typeof columnWidth
            }" was specified.`
        );
      }

      if (typeof rowHeight !== 'number') {
        throw Error(
          'An invalid "rowHeight" prop has been specified. ' +
            'Value should be a number. ' +
            `"${rowHeight === null ? 'null' : typeof rowHeight}" was specified.`
        );
      }
    }
  },
});

export default FixedSizeGrid;
