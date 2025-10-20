'use client';
import { cn } from '@/lib/utils';
import {
    ComponentProps,
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactNode,
    RefObject,
    SetStateAction,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState
} from 'react';
import { BasilArrowLeftOutline } from '../../../public/assets/icons/arrow-left';
import { BasilArrowRightOutline } from '../../../public/assets/icons/arrow-right';
import { Button } from '../components/ui/button';
import StepperSteps from '../components/ui/stepper-step';

export interface Step {
    id: `step-${number}`;
    titleRender: (isCurrentStep?: boolean) => React.ReactNode;
}

interface FormStepperContextProps {
    steps: Step[];
    stepperControl: {
        next: () => Promise<void>;
        prev: () => void;
    };
    currentStep: number;
    // deltaDirection: 'right' | 'left';
    setCurrentStep: Dispatch<SetStateAction<number>> | null;
    setPreviousStep: (currentStep: number) => void;
    stepperState: {
        isFirstStep: boolean;
        isLastStep: boolean;
    };
    handleSubmit: RefObject<(() => void) | null> | null;
    getFieldValue: any;
    blockingFunctionRef: any;
    checkIsPassed:
        | (() => Promise<{
              isPassed: boolean;
          }>)
        | null;
}

interface FormStepperProps {
    steps: Step[];
}

const FormStepperContext = createContext<FormStepperContextProps>({
    steps: [],
    stepperControl: {
        next: async () => {},
        prev: () => {}
    },
    currentStep: 0,
    // deltaDirection: 'right',
    setCurrentStep: null,
    setPreviousStep: () => {},
    stepperState: {
        isFirstStep: false,
        isLastStep: false
    },
    handleSubmit: null,
    blockingFunctionRef: null,
    getFieldValue: null,
    checkIsPassed: null
});

export const useFormStepperContext = () => {
    const context = useContext(FormStepperContext);
    if (context === undefined) {
        throw new Error(
            'useFormStepperContext must be used within a FormStepperProvider'
        );
    }
    return context;
};

export const FormStepper = ({
    children,
    steps
}: PropsWithChildren<FormStepperProps>) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [previousStep, setSatePreviousStep] = useState(0);

    // step direction
    // const deltaDirection = currentStep - previousStep > 0 ? 'right' : 'left';
    // handleSubmitRef : push up form submit  function to use it anyway in the context
    const handleSubmit = useRef<() => void>(null);

    // BlockingFunctionRef : push up the   function tuse to verify fields to pass the current step
    // in this case I use the trigger function provide by react hook form
    const blockingFunctionRef = useRef<any>(null);
    const getFieldValue = useRef<any>(null);

    const stepperState = {
        isLastStep: currentStep === steps.length - 1,
        isFirstStep: currentStep === 0
    };

    // cached function isPassed
    const checkIsPassed = useMemo(
        () => async () => {
            const isPassed: boolean = await blockingFunctionRef?.current?.(
                `step${currentStep + 1}`,
                {
                    shoudldFocus: true
                }
            );

            return { isPassed };
        },
        [currentStep]
    );

    const setPreviousStep = useCallback((currentStep: number) => {
        setSatePreviousStep(currentStep);
    }, []);

    const stepperControl = {
        next: async () => {
            const { isPassed } = await checkIsPassed();

            if (!isPassed) return;
            setCurrentStep((prevIndex) =>
                !stepperState.isLastStep ? prevIndex + 1 : prevIndex
            );
            setPreviousStep(currentStep);
        },

        prev: () => {
            setCurrentStep((prevIndex) =>
                !stepperState.isFirstStep ? prevIndex - 1 : prevIndex
            );
            setPreviousStep?.(currentStep);
        }
    };

    return (
        <FormStepperContext.Provider
            value={{
                currentStep,
                stepperControl,
                steps,
                setCurrentStep,
                stepperState,
                handleSubmit,
                blockingFunctionRef,
                checkIsPassed,
                setPreviousStep: setSatePreviousStep,
                getFieldValue
            }}
        >
            {children}
        </FormStepperContext.Provider>
    );
};

const Steps = (): ReactNode => {
    const {
        steps,
        setCurrentStep,
        currentStep,
        checkIsPassed,
        setPreviousStep
    } = useFormStepperContext();

    const checkSetCurrentStep = async (index: number) => {
        if (!checkIsPassed) return;
        const { isPassed } = await checkIsPassed();

        if (!isPassed && index > currentStep) return;
        setCurrentStep?.(index);
        setPreviousStep?.(currentStep);
    };

    const props = {
        steps,
        setCurrentStep: checkSetCurrentStep,
        currentStep
    };
    return <StepperSteps {...props} />;
};
const StepperControls = ({ isLoading }: { isLoading?: boolean }): ReactNode => {
    const {
        stepperState: { isFirstStep, isLastStep },
        stepperControl: { next, prev },
        handleSubmit
    } = useFormStepperContext();

    return (
        <div className={cn('flex items-center gap-16 p-4')}>
            <Button
                type="button"
                variant={'refresh'}
                size={'add'}
                className="text-white [&_svg]:size-8"
                onClick={prev}
                disabled={isFirstStep}
            >
                <BasilArrowLeftOutline />{' '}
                <span className="text-[1.3rem]">RETOUR</span>
            </Button>
            <Button
                type="button"
                variant={'add'}
                size={'add'}
                className="text-white [&_svg]:size-8"
                isLoading={isLoading}
                disabled={isLoading}
                onClick={isLastStep ? (handleSubmit?.current as any) : next}
            >
                <span className="text-[1.3rem]">
                    {isLastStep ? 'SAUVEGARDER' : 'SUIVANT'}
                </span>{' '}
                <BasilArrowRightOutline />
            </Button>
        </div>
    );
};

const StepperContent = ({
    children,
    className
}: PropsWithChildren & ComponentProps<'div'>): ReactNode => {
    return <div className={cn('', className)}> {children}</div>;
};

FormStepper.Steps = Steps;
FormStepper.Controls = StepperControls;
FormStepper.Content = StepperContent;
