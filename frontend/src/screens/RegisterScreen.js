import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form,Col,Row,Button} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'

const RegisterScreen = ({location,history}) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    console.log(location.search)
    const redirect = location.search ? location.search.split('=')[1]:'/'
    console.log(redirect)

    
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const {loading,userInfo,error} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e)=>{
        e.preventDefault()

        if(password!==confirmPassword){
            setMessage('Passwords do not match')
        }else{
        dispatch(register(name,email,password))
        }
        
    }

    return (
        <FormContainer>
            <Meta title = {"Register"}/>
            <h1>Sign Up</h1>
            {message && <Message variant = 'danger'>{message}</Message>}
            {error && <Message variant = 'danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId = 'name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type = 'name' placeholder = 'Enter name' value = {name}
                    onChange = {(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type = 'email' placeholder = 'Enter email' value = {email}
                    onChange = {(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = 'password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type = 'password' placeholder = 'Enter password' value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId = 'confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type = 'password' placeholder = 'Confirm Password' value = {confirmPassword}
                    onChange = {(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button  type = 'submit' variant = 'primary'>Register</Button>
            </Form>
            <Row className = 'py-3'>
                <Col>
                Haven an Account{' '}
                <Link to = {redirect?`/login?redirect = ${redirect}`:`/login`}>
                    Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen