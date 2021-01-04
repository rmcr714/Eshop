import React , {useState}from 'react'
import {Form,Button} from 'react-bootstrap'


const SearchBox = ({history}) => {
    const [keyword,setKeyword] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push(`/`)
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type = 'text' name ='q' onChange = {(e)=>setKeyword(e.target.value)} 
            placeholder = 'Search products...' className = 'mr-sm-2 ml-sm-5'></Form.Control> {' '}
            <Button type='submit' variant = 'outline-light' className = 'pd-4'><i class="fas fa-search fa-lg"></i></Button>
            
        </Form>
    )
}

export default SearchBox
