// stepper.context.tsx
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useQueryState } from 'nuqs';

type Step = number;

type StepperContextType = {
    step: Step;
    nextStep: () => void;
    prevStep: () => void;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const StepperProvider = ({ children }: { children: ReactNode }) => {
    const [step, setStep] = useQueryState('step', {
        defaultValue: 1,
        parse: (val) => parseInt(val, 10),
        serialize: (val) => val.toString()
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <StepperContext.Provider value={{ step, nextStep, prevStep }}>
            {children}
        </StepperContext.Provider>
    );
};

export const useStepper = () => {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error('useStepper must be used within a StepperProvider');
    }
    return context;
};
