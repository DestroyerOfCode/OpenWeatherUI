import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import i18n from 'i18next';
import { temperatureActions } from '../actions/temperature.actions';
import { useDispatch } from 'react-redux';

export const TemperatureDropdownList = () => {
    const dispatch = useDispatch();

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {i18n.t('common.temperatureDropdown.title')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => dispatch(temperatureActions.changeTemperatue('kelvin', 'K'))}
                >
                    Kelvin
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => dispatch(temperatureActions.changeTemperatue('celsius', '°C'))}
                >
                    Celsius
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => dispatch(temperatureActions.changeTemperatue('fahrenheit','°F'))}
                >
                    Fahrenheit
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};