'use client';
import { cn } from '@/shared/lib/utils';
import { useAlertStore } from '@/shared/store/use-alert-store';
import { cva, VariantProps } from 'class-variance-authority';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '../ui/alert-dialog';

const alertVariants = cva('max-w-[40rem]  py-10', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground border-border',
            error: 'bg-card text-white border-error/20 [&>svg]:text-error',
            warning:
                'bg-card text-card-foreground border-yellow-200 [&>svg]:text-yellow-600'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

const buttonVariants = {
    default: {
        cancel: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300',
        action: 'bg-primary text-primary-foreground hover:bg-primary/90'
    },
    error: {
        cancel: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300',
        action: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    },
    warning: {
        cancel: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300',
        action: 'bg-yellow-600 text-white hover:bg-yellow-700'
    }
};

type AlertProps = React.ComponentProps<'div'> &
    VariantProps<typeof alertVariants> & {
        onConfirm?: () => void;
        onClose?: () => void;
    };

export function GlobalAlert({ className, ...props }: AlertProps) {
    const {
        approveButtonTitle,
        cancelButtonTitle,
        closeAlert,
        description,
        isOpen,
        title,
        variant,
        onConfirm
    } = useAlertStore();

    const currentButtonVariants = buttonVariants[variant];

    return (
        <AlertDialog open={isOpen} onOpenChange={closeAlert}>
            <AlertDialogContent
                className={cn(alertVariants({ variant, className }))}
                {...props}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={cn(
                            'py-6 px-8 rounded-2xl shadow-none cursor-pointer',
                            currentButtonVariants.cancel
                        )}
                        onClick={() => {
                            closeAlert();
                        }}
                    >
                        {cancelButtonTitle}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={cn(
                            'py-6 px-8 rounded-2xl shadow-none cursor-pointer',
                            currentButtonVariants.action
                        )}
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        {approveButtonTitle}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
