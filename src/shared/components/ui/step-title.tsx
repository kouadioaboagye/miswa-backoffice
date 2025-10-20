import { cn } from '@/shared/lib/utils';

export const StepTitle = ({
    // stepNumber,
    title,
    isCurrentStep
}: {
    stepNumber: number;
    title: string;
    isCurrentStep?: boolean;
}) => (
    <div>
        {/* <h6 className="text-gray-600 fs-15">Étape {stepNumber}</h6> */}
        <p
            className={cn('fs-16', {
                'font-medium': isCurrentStep
            })}
        >
            {title}
        </p>
    </div>
);
