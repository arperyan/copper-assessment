import React from 'react';

type Props = {
    headerItem: string;
};

const TableHeader: React.FC<Props> = ({ headerItem }) => (
    <th title={headerItem} scope="col" aria-label={headerItem}>
        {headerItem}
    </th>
);

export default TableHeader;
