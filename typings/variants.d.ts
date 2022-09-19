
import React from 'react';

interface VarientsProps {
    id?: string;
    value: StateTypes;
    getValue: (value: StateTypes) => void;
}