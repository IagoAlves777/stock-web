import { forwardRef } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { Column, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { TableVirtuoso } from 'react-virtuoso';

import { Flex, ThemingProps, useColorModeValue, Text } from '@chakra-ui/react';

import { CustomBox } from './styles';

interface TableProps<T extends object> extends ThemingProps {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  width?: string;
  height?: string;
  fixedLastColumn?: boolean;
}

export const toLowerCaseCompare = (a: string, b: string): number => {
  return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
};

export const compareDate = (dateA?: Date, dateB?: Date): number => {
  if (!dateB) return 1;

  if (!dateA) return -1;

  return dateA > dateB ? 1 : -1;
};

function Table<T extends object>({ columns, rows, title, height, width }: TableProps<T>) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const bg = useColorModeValue('white', 'navy.800');

  const tableInstance = useTable(
    {
      columns,
      data: rows,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows: rowsLine } = tableInstance;

  return (
    <CustomBox
      w="100%"
      height={height || '100%'}
      overflowX={{ sm: 'scroll', lg: 'scroll' }}
      overflowY="hidden"
      padding="0 10px"
      bg={bg}
      borderRadius={18}
      position="relative"
    >
      {!!title && (
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%" marginBottom={2} marginTop={2}>
            {title}
          </Text>
        </Flex>
      )}
      <TableVirtuoso
        style={{ height: height || '100%', width: width || '100%' }}
        totalCount={rowsLine.length}
        components={{
          Table: ({ style, ...props }) => (
            <table {...getTableProps()} {...props} style={{ ...style, width: '100%', tableLayout: 'fixed' }} />
          ),
          TableBody: forwardRef(({ ...props }, ref: any) => <tbody {...getTableBodyProps()} {...props} ref={ref} />),
          TableRow: (props: any) => {
            const { 'data-index': index } = props;
            const row = rowsLine[index];

            return <tr {...props} {...row.getRowProps()} />;
          },
        }}
        fixedHeaderContent={() => {
          return headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => {
                const { key, ...props } = column.getHeaderProps(column.getSortByToggleProps());

                return (
                  <th key={key} style={{ borderColor, display: 'flex' }} {...props}>
                    <Flex
                      width="100%"
                      justifyContent="center"
                      gap={2}
                      bg={bg}
                      color={textColor}
                      height="60px"
                      alignItems="center"
                    >
                      {column.render('Header')}
                      {column.isSorted ? (
                        <Flex justifyContent="space-between" alignItems="center">
                          {column.isSortedDesc ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                        </Flex>
                      ) : (
                        ''
                      )}
                    </Flex>
                  </th>
                );
              })}
            </tr>
          ));
        }}
        itemContent={(index) => {
          const row = rowsLine[index];

          prepareRow(row);

          return row.cells.map((cell) => {
            const { key, ...props } = cell.getCellProps();

            return (
              <td
                key={key}
                style={{
                  padding: '4px',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '1rem',
                }}
                {...props}
              >
                <Text color={textColor} fontSize="sm" fontWeight="700">
                  {cell.render('Cell')}
                </Text>
              </td>
            );
          });
        }}
      />
    </CustomBox>
  );
}

export default Table;
