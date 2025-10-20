'use client';
import FormStepperLayout from '@/shared/components/layouts/form-stepper-layout';
import { StepTitle } from '@/shared/components/ui/step-title';
import { FormStepper, Step } from '@/shared/context/compound-form-stepper';
import CreatePropertyStep3 from './create-property-step-3';

const steps: Step[] = [
    {
        id: 'step-1',
        titleRender: (isCurrentStep) => (
            <StepTitle
                stepNumber={1}
                title="Informations générales"
                isCurrentStep={isCurrentStep}
            />
        )
    },
    {
        id: 'step-2',
        titleRender: (isCurrentStep) => (
            <StepTitle
                stepNumber={2}
                title="Caractériques et Com."
                isCurrentStep={isCurrentStep}
            />
        )
    },
    {
        id: 'step-3',
        titleRender: (isCurrentStep) => (
            <StepTitle
                stepNumber={3}
                title="Médias"
                isCurrentStep={isCurrentStep}
            />
        )
    }
];
const PropertyFormStepper = () => {
    return (
        <FormStepper steps={steps}>
            <FormStepperLayout steps={<FormStepper.Steps />}>
                <FormStepper.Content>
                    <CreatePropertyStep3 />
                </FormStepper.Content>
            </FormStepperLayout>
        </FormStepper>
    );
};

export default PropertyFormStepper;
