import React from 'react';
import {initialState, StateType} from './State/state';


export const Context = React.createContext<StateType>(initialState);
