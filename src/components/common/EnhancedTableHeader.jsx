import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

function EnhancedTableHeader(props) {
    const { order, orderBy, headCells, changeOrder } = props;
    return (
        <TableRow>
            {headCells.map((headCell) => {
                return (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        onClick={() => changeOrder(headCell.id)}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => changeOrder(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className="border-0 h-1 m-1 overflow-hidden p-0 absolute t-[20px] w-[800px]"></span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                );
            })}
        </TableRow>
    );
}

export default EnhancedTableHeader;
