import { AnimateSharedLayout, motion } from 'framer-motion/dist/framer-motion';
import React, { useEffect } from 'react';
import { TimelinePointProps, TimelineStepProps } from './timeline.types';

const pointVariants = {
    inactive: {
        height: '1.25rem',
        width: '1.25rem',
        borderWidth: 3,
    },
    active: {
        height: '1.25rem',
        width: '1.25rem',
        borderWidth: 3,
    },
    current: {
        height: '2.0rem',
        width: '2.0rem',
        borderWidth: 6,
    },
};

// eslint-disable-next-line react/display-name
const TimelinePoint = React.forwardRef<SVGCircleElement, TimelinePointProps>(
    ({ isActive, isCurrent, x, setActiveStep, index, step, activeStep }) => {
        const handleClick = () => {
            setActiveStep(index);
        };

        let colorState = 'bg-white border-primary border-opacity-100';

        if (isCurrent) {
            colorState = 'bg-primary border-primary-disabled';
        }

        if (index < activeStep) {
            colorState = 'bg-primary border-primary border-opacity-100';
        }

        return (
            <motion.div
                onClick={handleClick}
                initial="inactive"
                variants={pointVariants}
                animate={isCurrent ? 'current' : isActive ? 'active' : 'inactive'}
                className={`-left-1/2 -translate-x-1/2 -translate-y-1/2 absolute ${colorState} cursor-pointer rounded-full text-sm top-1/2 transform`}
                style={{ left: `${x}%` }}
            >
                <p className="-translate-x-1/2 absolute left-1/2 text-body text-center text-sm top-8 transform truncate w-32">
                    {step.info}
                </p>
            </motion.div>
        );
    },
);

const TimelineStep = ({ x, isActive, isCurrent, setActiveStep, index, step, activeStep }: TimelineStepProps) => {
    const point = React.useRef<SVGCircleElement>(null);

    return (
        <>
            <TimelinePoint
                index={index}
                setActiveStep={setActiveStep}
                x={x}
                isActive={isActive}
                isCurrent={isCurrent}
                ref={point}
                step={step}
                activeStep={activeStep}
            />
        </>
    );
};

const SvgTimeline = ({
    steps,
    activeStep,
    setActiveStep,
    className,
}: {
    steps: any[];
    activeStep: number;
    setActiveStep: any;
    className?: string;
}) => {
    const portal = React.useRef<any>();

    const activePercent = Math.round((100 / (steps.length - 1)) * activeStep);
    const indexToPercent = (index: number) => Math.round(100 / (steps.length - 1)) * index;

    return (
        <AnimateSharedLayout>
            <div className={`px-16 w-full ${className}`}>
                <div style={{ position: 'relative' }} className="flex" ref={portal}>
                    <svg style={{ width: '100%' }} viewBox="0 0 100 10">
                        <motion.line
                            initial={{ x2: 0 }}
                            animate={{ x2: activePercent }}
                            transition={{ type: 'tween' }}
                            x1="0"
                            y1="5"
                            y2="5"
                            fill="none"
                            strokeWidth="3"
                            className="stroke-primary text-primary"
                            vectorEffect="non-scaling-stroke"
                        />
                        <motion.line
                            initial={{ x1: 0 }}
                            animate={{ x1: activePercent }}
                            transition={{ type: 'tween' }}
                            y1="5"
                            x2="100"
                            y2="5"
                            fill="fill-surface"
                            strokeWidth="2"
                            strokeDasharray="6"
                            vectorEffect="non-scaling-stroke"
                            className="stroke-info"
                        />
                    </svg>

                    {steps.map((step, i) => (
                        <TimelineStep
                            key={step.state}
                            x={indexToPercent(i)}
                            isActive={i <= activeStep}
                            isCurrent={i === activeStep}
                            container={portal}
                            setActiveStep={setActiveStep}
                            index={i}
                            step={step}
                            activeStep={activeStep}
                        />
                    ))}
                </div>
            </div>
        </AnimateSharedLayout>
    );
};

export default SvgTimeline;
