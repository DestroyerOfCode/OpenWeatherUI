import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import FiltersComponent from './Filters';
import i18n from 'i18next';
import CustomCircularLoader from '../../buildingBlocks/CustomCircularLoader';
import EnhancedTableHead from '../common/EnhancedTableHeader';
import EnhancedTableBody from './WeatherCurrentTableBody';
import { weatherCurrentActions, filtersActions } from '../../actions';
import Switch from '@mui/material/Switch';
import { TemperatureDropdownList } from '../../buildingBlocks/Temperature';
import { descriptionsActions } from '../../actions';
import { countriesActions } from '../../actions';

function WeatherCurrent(props) {
    const [isAscending, setIsAscending] = useState(true);
    const [sortBy, setSortBy] = useState('name');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [collapseFilter, setCollapseFilter] = useState(false);
    const [collapseTable, setCollapseTable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openTemperature, setOpenTemperature] = useState(false);

    const filtersSelector = useSelector((state) => state.filters);
    const currentWeathers = useSelector((state) => state.weatherCurrent);
    const dispatch = useDispatch();
    const temperature = useSelector((state) => state.temperature);

    useEffect(() => {
        refreshWeathers();
    }, [
        props,
        currentPage,
        itemsPerPage,
        sortBy,
        isAscending,
        filtersSelector,
    ]);

    const refreshWeathers = () => {
        dispatch(
            weatherCurrentActions.getCurrentWeathers(
                sortBy,
                isAscending,
                filtersSelector,
                currentPage,
                itemsPerPage
            )
        );
        setLoading(false);
    };

    const headCells = () => {
        return collapseTable
            ? [
                  {
                      id: 'name',
                      label: i18n.t('current.header.cityName'),
                      notNumeric: true,
                      disablePadding: true,
                  },
                  {
                      id: 'coord.lat',
                      label: i18n.t('current.header.latitude'),
                      notNumeric: false,
                      disablePadding: true,
                  },
                  {
                      id: 'coord.lon',
                      label: i18n.t('current.header.longitude'),
                      notNumeric: false,
                      disablePadding: true,
                  },
                  {
                      id: 'sys.countryName',
                      label: i18n.t('current.header.country'),
                      notNumeric: true,
                      disablePadding: false,
                  },
                  {
                      id: 'weatherMain.humidity',
                      label: i18n.t('current.header.humidity'),
                      notNumeric: false,
                      disablePadding: true,
                  },
                  {
                      id: 'weatherMain.feels_like',
                      label: `${i18n.t('current.header.feelsLike')} ${
                          temperature.abbreviation
                      }`,
                      notNumeric: false,
                      disablePadding: false,
                  },
                  {
                      id: 'weatherMain.temp',
                      label: `${i18n.t('current.header.temperature')} ${
                          temperature.abbreviation
                      }`,
                      notNumeric: false,
                      disablePadding: true,
                  },
                  {
                      id: 'weatherMain.temp_max',
                      label: `${i18n.t('current.header.maximumTemperature')} ${
                          temperature.abbreviation
                      }`,
                      notNumeric: false,
                      disablePadding: false,
                  },
                  {
                      id: 'weatherMain.temp_min',
                      label: `${i18n.t('current.header.minimalTemperature')} ${
                          temperature.abbreviation
                      }`,
                      notNumeric: false,
                      disablePadding: false,
                  },
                  {
                      id: 'weather.description',
                      label: i18n.t('current.header.description'),
                      notNumeric: true,
                      disablePadding: true,
                  },
              ]
            : [
                  {
                      id: 'name',
                      label: i18n.t('current.header.cityName'),
                      notNumeric: true,
                      disablePadding: true,
                  },
                  {
                      id: 'weatherMain.humidity',
                      label: i18n.t('current.header.humidity'),
                      notNumeric: false,
                      disablePadding: true,
                  },
                  {
                      id: 'weatherMain.temp',
                      label: `${i18n.t('current.header.temperature')} ${
                          temperature.abbreviation
                      }`,
                      notNumeric: false,
                      disablePadding: true,
                  },
                  {
                      id: 'weather.description',
                      label: i18n.t('current.header.description'),
                      notNumeric: true,
                      disablePadding: true,
                  },
              ];
    };

    const changeOrder = (val) => {
        setSortBy(val);
        setIsAscending(!isAscending);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };
    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    const collapseFilterAll = () => {
        setCollapseFilter((prev) => !prev);
    };

    const collapseTableAll = () => {
        setCollapseTable((prev) => !prev);
    };

    return loading ? (
        <CustomCircularLoader />
    ) : (
        <div>
            <div className="w-full ml-1 mt-1 pl-2 flex-col">
                <button
                    className="text-center inline-flex p-2 bg-white 
                    hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border 
                    border-gray-400 rounded shadow"
                    onClick={() => setOpenTemperature((open) => !open)}
                >
                    {i18n.t('common.temperatureDropdown.title')}
                </button>
                {openTemperature && (
                    <TemperatureDropdownList
                        open={openTemperature}
                        openTemperatures={() =>
                            setOpenTemperature((open) => !open)
                        }
                    />
                )}
                <div className="flex-1">
                    <Switch
                        id="filterSwitch"
                        checked={collapseFilter}
                        onChange={collapseFilterAll}
                    />
                    <label htmlFor="filterSwitch">
                        {i18n.t('current.filters.displayIcon')}
                    </label>
                </div>

                <FiltersComponent
                    key={nanoid()}
                    handleChangePage={handleChangePage}
                    collapse={collapseFilter}
                    className="flex-1"
                />
            </div>
            <div className="flex flex-col">
                <div className="ml-1 mt-1 pl-2 flex">
                    <button
                        className="ml-1 pl-2 flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={() => dispatch(filtersActions.clear())}
                    >
                        {i18n.t('common.clearFilters')}
                    </button>
                </div>
                <div className="flex-1 ml-1 mt-1 pl-2">
                    <Switch
                        id="collapseTable"
                        checked={collapseTable}
                        onChange={collapseTableAll}
                    />
                    <label htmlFor="collapseTable">
                        {i18n.t('current.others.displayIcon')}
                    </label>
                </div>
            </div>

            <TablePagination
                rowsPerPageOptions={[
                    { label: i18n.t('page.ten'), value: 10 },
                    { label: i18n.t('page.hundred'), value: 100 },
                    { label: i18n.t('page.thousand'), value: 1000 },
                ]}
                component="div"
                count={currentWeathers?.totalElements}
                rowsPerPage={itemsPerPage}
                page={currentPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                backIconButtonText={i18n.t('page.previous')}
                nextIconButtonText={i18n.t('page.next')}
                labelRowsPerPage={i18n.t('page.rows')}
            />

            <TableContainer
                key={nanoid()}
                className="max-h-[500px] max-w-[5/6]"
            >
                <Table stickyHeader={true} size="small">
                    <EnhancedTableHead
                        stickyHeader
                        order={isAscending ? 'asc' : 'desc'}
                        orderBy={sortBy}
                        changeOrder={changeOrder}
                        headCells={headCells.call()}
                    />
                    <EnhancedTableBody
                        currentWeathers={currentWeathers}
                        temperature={temperature}
                        isCollapse={collapseTable}
                    />
                </Table>
            </TableContainer>
        </div>
    );
}
export default WeatherCurrent;
