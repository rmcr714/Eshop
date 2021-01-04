import React , {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({match}) => {
                                    //Search functionality - later part of the build almost last
    const keyword =  match.params.keyword
                          


    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList )
    const {loading, products, error } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))   // listproducts was initially empty as we are fetching all products but we added it to search for specific products as part of search functioality.
    },[dispatch,keyword])                          


    return (
        <>
        <h1>Latest Products</h1>
    {loading ? <Loader/>:error ? <Message variant = 'danger'>{error}</Message>:
    <Row>
    {products.length===0?<Message>Sorry no Products with the searched name found</Message>:products.map(product => (
        <Col key = {product._id} sm = {12} md = {6} lg = {4} xl = {3}>
        <Product product = {product}/>
        </Col>
    ))}

</Row>
    
    }
        
        </>
    )
}

export default HomeScreen
