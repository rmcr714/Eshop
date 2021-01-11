import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer style = {{backgroundColor:'#212121'}}>
            <Container>
                <Row>
                    <Col className = 'text-center py-3'>
                     <div style = {{color:'white'}}>  Copyright &copy; ProShop</div> 
                    <span><a href = "https://www.instagram.com/"><i class="fab fa-instagram-square fa-2x" style = {{color:'pink'}}> </i></a> {'   '}
                    <a href = "https://www.facebook.com/"> <i class="fab fa-facebook-square fa-2x" style = {{color:'#4267B2'}}></i></a>{' '}
                    <a href = "https://twitter.com/"><i class="fab fa-twitter-square fa-2x"  style = {{color:'#1DA1F2'}} ></i></a>{' '}
                    <a href = "https://github.com/rmcr714/"><i class="fab fa-github-square fa-2x" style = {{color:'#4078c0'}}></i></a> 
                     
                     </span>
                    </Col> 
                </Row>
            </Container>
          
        </footer>
    )
}

export default Footer
