import React,{ useState,useEffect } from 'react'
import {Form,Button,Col,Card} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'
import { yellow } from 'colors'

const PaymentScreen = ({ history }) => {


    const userLogin = useSelector(state => state.userLogin)

    const {loading,userInfo,error} = userLogin

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
    },[history,userInfo])


    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1  step2 step3/>
           
           <Card body >
               <Card.Title><h1> Paymnet Method </h1></Card.Title>
            <Form onSubmit = {submitHandler}>
            <Form.Group>
                <Form.Label as = 'legend'>Select Method</Form.Label>
            
            <Col>
                <Form.Check type = 'radio' label = 'PayPal or Credit Card' id = 'PayPal'
                name = 'paymentMethod' value = 'PayPal' checked onChange = {(e)=>{
                    setPaymentMethod(e.target.value)
                }}></Form.Check>

                <Form.Check type = 'radio' label = 'Stripe' id = 'Stripe'
                name = 'paymentMethod' value = 'Stripe'  onChange = {(e)=>{
                    setPaymentMethod(e.target.value)
                }}></Form.Check>

                <Form.Check type = 'radio' label = 'Cash on Delivery' id = 'Cash on delivery'
                name = 'paymentMethod' value = 'Cash on Delivery'  onChange = {(e)=>{
                    setPaymentMethod(e.target.value)
                }}></Form.Check>
            </Col>
            </Form.Group>
            <Button type = 'submit' variant = 'primary'>
                    Continue
                </Button>
            </Form>
            </Card>

        </FormContainer>
    )
}

export default PaymentScreen
