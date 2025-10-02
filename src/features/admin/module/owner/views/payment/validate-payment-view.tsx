import React from 'react'
import ValidatePaymentForm from '../../components/forms/validatePayment/validate-payment-form'

type ValidatePaymentViewProps = {
    onClose: ()=>void;
}

function ValidatePaymentView({onClose}: Readonly<ValidatePaymentViewProps>) {
    return (
        <ValidatePaymentForm onClose={onClose}/>
    )
}

export default ValidatePaymentView