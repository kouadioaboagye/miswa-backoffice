import Flex from '@/shared/components/layouts/helpers/flex';
import { FormStepper } from '@/shared/context/compound-form-stepper';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

type FormStepperLayoutProps = ComponentProps<'div'> & { steps: ReactNode };
const FormStepperLayout = ({
    steps,
    children,
    ...props
}: PropsWithChildren<FormStepperLayoutProps>) => {
    return (
        <Flex
            settings={{ spacing: 'gap-10', justify: 'start', isColumn: true }}
            {...props}
        >
            {/* Steps */}

            <div className="flex justify-between items-center">
                <div>{steps}</div>
                <FormStepper.Controls />
            </div>

            {/* Content */}
            <div className="flex-1 ">{children}</div>
        </Flex>
    );
};

export default FormStepperLayout;
