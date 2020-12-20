
import React,{ useEffect } from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {getOrderDetails} from '../actions/orderActions'


const OrderScreen = ({match,history}) => {

    const orderId = match.params.id
    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const dispatch = useDispatch()
    //calculate Prices


    const orderDetails = useSelector(state => state.orderDetails)
    const {order,loading,error} = orderDetails


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!order || order._id !== orderId){
            dispatch(getOrderDetails(orderId))}
        }

       
        // eslint-disable-next-line
    },[order,orderId])



    return loading?<Loader/>:error?<Message variant = 'danger'>{error}</Message>:
    <>
    <h2>Order {order._id}</h2>
    <Row>
               <Col md = {8} >
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                         <p><strong>Name:</strong>{order.user.name}</p> 
                          <p><strong>Email:</strong> <a href = {`mailto = ${order.user.email}`}>{order.user.email}</a></p> 
                            <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                            </p>

                            {order.isDelivered?<Message variant = 'success'>Delivered on {order.deliveredAt}</Message>:
                            <Message variant= 'danger'>Not Delivered</Message>}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid?<Message variant = 'success'>Paid on {order.paidAt}</Message>:
                            <Message variant= 'danger'>Not paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {order.orderItems.length === 0 ?<Message>Yyou dont have any orders</Message>
                            :(
                                <ListGroup variant = 'flush'>
                                    {order.orderItems.map((item,index)=>(
                                       <ListGroup.Item key = {index}>
                                           <Row>
                                               <Col md = {1}>
                                                   <Image src = {item.image} alt = {item.name} fluid rounded/>
                                               </Col>
                                               <Col>
                                                    <Link to = {`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                               </Col>
                                               <Col md = {4}>
                                                   {item.qty} x {item.price} = ${item.qty * item.price}
                                               </Col>
                                           </Row>
                                       </ListGroup.Item> 
                                    ))}

                                </ListGroup>
                            )}


                        </ListGroup.Item>
                    </ListGroup>
               </Col>
               <Col md = {4}>
                   <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Order Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                       ${order.totalPrice}
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>

                        </ListGroup>
                   </Card>
               </Col>
           </Row>
    
    
    </>
}

export default OrderScreen
