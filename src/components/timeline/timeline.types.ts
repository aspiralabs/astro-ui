import { ReactNode } from 'react';

export type TimelinePointProps = {
    isActive: boolean;
    isCurrent: boolean;
    x: number;
    setActiveStep: any;
    index: number;
    step: any;
    activeStep: number;
};

export type TimelineStepProps = {
    x: number;
    isActive: boolean;
    isCurrent: boolean;
    container: React.RefObject<any>;
    setActiveStep: any;
    index: number;
    step: any;
    activeStep: number;
};
