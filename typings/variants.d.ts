
import React from 'react';

interface VarientsProps {
    id?: string;
    heading?: string;
    value: StateTypes;
    getValue: (value: StateTypes) => void;
}