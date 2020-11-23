import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'



const ProductScreen = ({match}) => {

    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetchProducts = async()=>{
            const {data} = await axios.get(`/api/products/${match.params.id}`)
           
            setProduct(data)
        }

        fetchProducts()

    },[])

    return (
        <>
           <Link className = 'btn btn-light my-3' to = '/'>Go Back</Link>
           <Row>
               <Col md = {6}>
                   <Image src = {product.image} alt = {product.name} fluid/>
               </Col>
               <Col md = {3}>
                   <ListGroup variant = 'flush'>
                       <ListGroup.Item>
                        <h3>{product.name}</h3>
                       </ListGroup.Item>
                       <ListGroup.Item>
                       <Rating 
                     value = 
                            {product.rating} 
                            text = {`${product.numReviews} reviews`}
                         />
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Prce: ${product.price}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Description : {product.description}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
               <Col md = {3}>
                   <Card>
                       <ListGroup variant = 'flush'>
                           <ListGroup.Item>
                               <Row>
                                   <Col>
                                        price:
                                   </Col>
                                   <Col>
                                        <strong>${product.price}</strong>
                                   </Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>
                                        Status
                                   </Col>
                                   <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                   </Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Button className = 'btn-block' type = 'button' disabled = {product.countInStock === 0}>Add to Cart</Button>
                           </ListGroup.Item>
                       </ListGroup>
                   </Card>

               </Col>
           </Row>
        </>
    )
}

export default ProductScreen
