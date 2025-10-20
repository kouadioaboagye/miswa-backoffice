import { Step } from '@/shared/context/compound-form-stepper';
import { cn } from '@/shared/lib/utils';

interface StepperStepsProps {
    steps: Step[];
    setCurrentStep: (index: number) => Promise<void>;
    currentStep: number;
}

const StepperSteps = ({
    steps,
    setCurrentStep,
    currentStep
}: StepperStepsProps) => {
    return (
        <div className="flex border border-gray-300">
            {steps?.map((step, index) => {
                const { id } = step;
                // const isLastStep = index === steps.length - 1;
                const isCurrentStep = index === currentStep;
                // const isPassedStep = currentStep > index;
                // const stepLineid = index + 1;
                // const activeStepLine = currentStep >= stepLineid;
                // const canNotInteract = index - 1 > currentStep;

                return (
                    <div
                        key={id}
                        className={cn(
                            'flex items-center border-r border-gray-300 gap-4 p-6 w-[25rem] h-[5.5rem]',
                            {
                                'bg-[#1EA64A] text-white': isCurrentStep
                                // 'bg-[#F3F9FF]': !isCurrentStep
                            }
                        )}
                    >
                        <div
                            className={cn(
                                'size-16 rounded-full border-2 border-gray-400 flex items-center justify-center',
                                {
                                    'border-white text-white': isCurrentStep
                                }
                            )}
                        >
                            <span
                                className={cn(
                                    'text-[1.5rem] text-gray-400 font-semibold',
                                    {
                                        'text-white': isCurrentStep
                                    }
                                )}
                            >
                                {index + 1}
                            </span>
                        </div>
                        <div
                            className={cn('font-semibold text-gray-400', {
                                'text-white': isCurrentStep
                            })}
                        >
                            {steps[index].titleRender(isCurrentStep)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StepperSteps;
