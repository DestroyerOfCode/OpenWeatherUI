import { TableBody } from '@material-ui/core';
import {
    getWeatherDescription,
    convertTemperature,
    displayCoords,
} from '../../businessLogic/WeatherBusinessLogic';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { nanoid } from 'nanoid';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

function EnhancedTableBody(props) {
    const { currentWeathers, isCollapse } = props;
    const temperature = useSelector(state => state.temperature);

    return currentWeathers.content?.length ? (
        <TableBody>
            {currentWeathers.content.map((weather) => {
                return (
                    <StyledTableRow key={nanoid()}>
                        <StyledTableCell>
                            <Link
                                to={{
                                    pathname: `/forecast`,
                                    search:`?lat=${weather.coord.lat}&lon=${weather.coord.lon}`,
                                    state: {
                                        lat: weather.coord.lat,
                                        lon: weather.coord.lon,
                                    },
                                }}
                            >
                                {weather.name}
                            </Link>
                        </StyledTableCell>
                        { isCollapse && <StyledTableCell>
                            {displayCoords(weather.coord.lat)}
                        </StyledTableCell>}
                        { isCollapse && <StyledTableCell>
                            {displayCoords(weather.coord.lon)}
                        </StyledTableCell>}
                        { isCollapse && <StyledTableCell>
                            {i18n.t(
                                `common.countryName.${weather.sys.countryName}`
                            )}
                        </StyledTableCell>}
                        <StyledTableCell>
                            {weather.weatherMain.humidity}
                        </StyledTableCell>
                        {isCollapse && <StyledTableCell>
                            {`${convertTemperature(
                                temperature.units,
                                weather.weatherMain.feels_like
                                )}`
                            }
                        </StyledTableCell>
                        }
                        <StyledTableCell>
                            {`${convertTemperature(
                                temperature.units,
                                weather.weatherMain.temp
                                )}`
                            }
                        </StyledTableCell>
                        
                        {isCollapse && <StyledTableCell>
                            {`${convertTemperature(
                                temperature.units,
                                weather.weatherMain.temp_max
                                )}`
                            }
                        </StyledTableCell>
                        }
                        {isCollapse && <StyledTableCell>
                            {`${convertTemperature(
                                temperature.units,
                                weather.weatherMain.temp_min
                                )}`
                            }
                        </StyledTableCell>
                        }
                        <StyledTableCell>
                            {getWeatherDescription(weather)}
                        </StyledTableCell>
                    </StyledTableRow>
                );
            })}
        </TableBody>
    ) : (
        <TableBody></TableBody>
    );
}

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        position: 'sticky',
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default EnhancedTableBody;
