import React , {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({match}) => {
                                    
    const keyword =  match.params.keyword   //Search functionality - later part of the build almost last
    
    const pageNumber = match.params.pageNumber || 1   //Pagination Functionality
     

    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList )
    const {loading, products, error,page,pages} = productList

    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))   // listproducts was initially empty as we are fetching all products but we added it to search for specific products as part of search functioality.
    },[dispatch,keyword,pageNumber])                          


    return (
        <>
       { keyword?<Meta title = {"Search Results for " + keyword}></Meta>:<Meta title = {"Welcome to Eshop | Home"}/>}
        {!keyword ?<ProductCarousel/>:<Link to = '/' className = 'btn btn-light'>Go Back</Link>}
        {keyword?<h2>Search Results</h2>:<h1>Latest Products</h1>}
    {loading ? <Loader/>:error ? <Message variant = 'danger'>{error}</Message>:
    <>
    <Row>
    {products.length===0?<Message>Sorry no Products with the searched name found</Message>:products.map(product => (
        <Col key = {product._id} sm = {12} md = {6} lg = {4} xl = {3}>
        <Product product = {product}/>
        </Col>
    ))}

</Row>
<Paginate page = {page} pages = {pages} keyword = {keyword?keyword:''}/>
</>
    
    }
        
        </>
    )
}

export default HomeScreen
