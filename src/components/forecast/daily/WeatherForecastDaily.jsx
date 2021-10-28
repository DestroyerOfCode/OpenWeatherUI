import React, { useState, useEffect } from 'react';
import { getDailyForecastByCityName } from '../../../adapters/WeatherForecastService';
import i18n from 'i18next';
import '../../../i18n';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { nanoid } from 'nanoid';
import CustomCircularLoader from '../../../buildingBlocks/CustomCircularLoader';
import EnhancedTableHeader from '../../common/EnhancedTableHeader';
import WeatherForecastTableBody from './WeatherForecastTableBody';
import { TemperatureDropdownList } from '../../../buildingBlocks/Temperature';
import { useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";
import queryString from 'query-string';

function WeatherForecastComponent(props) {
    const [dailyWeatherForecast, setDailyWeatherForecast] = useState({});
    const [isAscending, setIsAscending] = useState(true);
    const [sortBy, setSortBy] = useState('sunrise');
    const [loading, setLoading] = useState(true);
    const temperature = useSelector((state) => state.temperature);
    const [openTemperature, setOpenTemperature] = useState(false);
    const location = useLocation();

    useEffect(() => {
        getDailyForecastByCityName(
            queryString.parse(location.search).lat,
            queryString.parse(location.search).lon,
            'Current,Hourly,Minutely'
        ).then((response) => {
            setDailyWeatherForecast(response.data);
            setLoading(false);
        });
    }, []);

    const changeOrder = (val) => {
        setSortBy(val);
        setIsAscending(!isAscending);
    };

    return loading ? (
        <CustomCircularLoader />
    ) : (
        <div className="ml-1 mt-1 pl-2">
            <button className="w-1/6 p-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                onClick={() => setOpenTemperature(open => !open)}>
                {i18n.t('common.temperatureDropdown.title')}
            </button>
            {openTemperature && <TemperatureDropdownList open={openTemperature} openTemperatures={() => setOpenTemperature(open => !open)}/>}

            <TableContainer key={nanoid()} component={Paper}>
                <Table
                    className="max-h-[500px] max-w-[400px]"
                    size="small"
                >
                    <EnhancedTableHeader
                        order={isAscending ? 'asc' : 'desc'}
                        orderBy={sortBy}
                        headCells={headCells.call()}
                        changeOrder={changeOrder}
                    />
                    <WeatherForecastTableBody
                        rows={dailyWeatherForecast.daily}
                        temperature={temperature}
                        order={isAscending ? 'asc' : 'desc'}
                        orderBy={sortBy}
                    />
                </Table>
            </TableContainer>
        </div>
    );
}

const headCells = () => {
    return [
        {
            id: 'sunrise',
            label: i18n.t('forecast.header.sunrise'),
            notNumeric: true,
            disablePadding: true,
        },
        {
            id: 'sunset',
            label: i18n.t('forecast.header.sunset'),
            notNumeric: false,
            disablePadding: true,
        },
        {
            id: 'temp.day',
            label: i18n.t('forecast.header.temp'),
            notNumeric: false,
            disablePadding: true,
        },
        {
            id: 'temp.min',
            label: i18n.t('forecast.header.min'),
            notNumeric: true,
            disablePadding: false,
        },
        {
            id: 'temp.max',
            label: i18n.t('forecast.header.max'),
            notNumeric: false,
            disablePadding: true,
        },
        {
            id: 'temp.night',
            label: i18n.t('forecast.header.night'),
            notNumeric: false,
            disablePadding: false,
        },
        {
            id: 'temp.evening',
            label: i18n.t('forecast.header.evening'),
            notNumeric: false,
            disablePadding: true,
        },
        {
            id: 'temp.morning',
            label: i18n.t('forecast.header.morning'),
            notNumeric: false,
            disablePadding: false,
        },
        {
            id: 'feels_like.day',
            label: i18n.t('forecast.header.feelsLikeDay'),
            notNumeric: false,
            disablePadding: false,
        },
        {
            id: 'feels_like.night',
            label: i18n.t('forecast.header.feelsLikeNight'),
            notNumeric: true,
            disablePadding: true,
        },
        {
            id: 'feels_like.evening',
            label: i18n.t('forecast.header.feelsLikeEvening'),
            notNumeric: true,
            disablePadding: true,
        },
        {
            id: 'feels_like.morning',
            label: i18n.t('forecast.header.feelsLikeMorning'),
            notNumeric: true,
            disablePadding: true,
        },
        {
            id: 'wind_speed',
            label: i18n.t('forecast.header.windSpeed'),
            notNumeric: true,
            disablePadding: true,
        },
        {
            id: 'wind_deg',
            label: i18n.t('forecast.header.windDeg'),
            notNumeric: true,
            disablePadding: true,
        },
        {
            id: 'weather.description',
            label: i18n.t('forecast.header.description'),
            notNumeric: true,
            disablePadding: true,
        },
    ];
};

export default WeatherForecastComponent;
