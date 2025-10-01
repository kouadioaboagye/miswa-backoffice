import React from 'react'
import AddPaymentForm from '../../components/forms/addPayment/add-payment-form'

type AddPaymentViewProps = {
    onClose: ()=>void;
    setLoading : (value: boolean)=>void;
    setSuccessModalOpen: (value: boolean)=> void;
}

function AddPaymentView({onClose, setLoading, setSuccessModalOpen}: Readonly<AddPaymentViewProps>) {
  return (
    <AddPaymentForm onClose={onClose} setLoading={setLoading} setSuccessModalOpen={setSuccessModalOpen}/>
  )
}

export default AddPaymentView