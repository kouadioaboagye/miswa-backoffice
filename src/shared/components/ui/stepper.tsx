"use client";

import { Button } from '@/shared/components/ui/button';
import React from 'react';
import { ArrowLeftIcon } from '../../../../public/assets/icons/arrow-left-icon';
import { ArrowRightIcon } from '../../../../public/assets/icons/arrow-right-icon';

interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  nextButtonText?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  nextButtonText = 'Suivant',
}) => {
  return (
    <div className="flex items-center mb-12">
      <div className="border flex flex-row">
        {steps.map((step) => (
          <div
            className={`flex items-center text-white p-6 ${
              step.id === currentStep ? "bg-[#1EA64A]" : ""
            }`}
            key={step.id}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-semibold ${
                step.id === currentStep
                  ? "border-white text-white"
                  : "border-gray-400 text-gray-400"
              }`}
            >
              {step.id.toString().padStart(2, "0")}
            </div>
            <div
              className={`ml-4 font-medium ${
                step.id === currentStep ? "text-white" : "text-gray-500"
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
      <div className="ml-auto flex space-x-4 rounded-3xl bg-white p-4">
        <Button
          variant={'ghost'}
          className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
          leftIcon={<ArrowLeftIcon className="mr-2" />}
          onClick={onPrevious}
          disabled={currentStep === 1}
        >
          Retour
        </Button>
        <Button
          variant={'success'}
          className="h-[4.5rem] w-full shadow-[0px_8px_20px_0px_#11928F66] [&_svg]:size-8"
          rightIcon={<ArrowRightIcon className="mr-2" />}
          onClick={onNext}
        >
          {currentStep === steps.length ? 'Sauvegarder' : nextButtonText}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;