import React from 'react';
import { temperatureActions } from '../actions/temperature.actions';
import { useDispatch } from 'react-redux';

export const TemperatureDropdownList = (props) => {
    const dispatch = useDispatch();
    const { openTemperatures, open } = props;
    return (
        <div className="h-auto">
            <ul className="text-left">
                {open && (
                    <li
                        className="w-[100px] p-3 border text-gray-700 hover:text-white hover:bg-indigo-700"
                        onClick={() => {
                            dispatch(
                                temperatureActions.changeTemperatue(
                                    'kelvin',
                                    'K'
                                )
                            );
                            openTemperatures(open);
                        }}
                    >
                        Kelvin
                    </li>
                )}
                {open && (
                    <li
                        className="w-[100px] p-3 border text-gray-700 hover:text-white hover:bg-indigo-700"
                        onClick={() => {
                            dispatch(
                                temperatureActions.changeTemperatue(
                                    'celsius',
                                    '°C'
                                )
                            );
                            openTemperatures(open);
                        }}
                    >
                        Celsius
                    </li>
                )}
                {open && (
                    <li
                        className="w-[100px] p-3 border text-gray-700 hover:text-white hover:bg-indigo-700"
                        onClick={() => {
                            dispatch(
                                temperatureActions.changeTemperatue(
                                    'fahrenheit',
                                    '°F'
                                )
                            );
                            openTemperatures(open);
                        }}
                    >
                        Fahrenheit
                    </li>
                )}
            </ul>
        </div>
    );
};
