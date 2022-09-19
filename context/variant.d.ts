import { ProductType } from 'network-requests/types';
import React from 'react';
interface ContextType {
    general: any;
    color: string[];
    headboard: ProductType[];
    feet: ProductType[];
    mattress: ProductType[];
    storage: ProductType[];
}

interface StateTypes extends ContextType { }

interface ActionTypes {
    type: string;
    payload: any;
}