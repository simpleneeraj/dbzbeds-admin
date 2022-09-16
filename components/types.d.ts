import React from 'react';


interface Common {
    label: string;
    error?: string;
    onDelete?: () => void;
    deletable?: boolean
}

interface I extends Common, React.ComponentPropsWithoutRef<"input"> {

    imageUrl?: string;
}

interface T extends Common, React.ComponentPropsWithoutRef<"textarea"> { }

interface S extends Common, React.ComponentPropsWithoutRef<"select"> {
    options: {
        text: any;
        value: any;
    }[];
}

interface FP extends Common, React.ComponentPropsWithoutRef<"input"> { }



interface Button extends React.ComponentPropsWithRef<'button'> { }