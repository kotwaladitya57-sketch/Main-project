import React from 'react'
import Navbar from './TempNavbar'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
    };

    const slideStyle = {
        background: "linear-gradient(135deg, #13151a 0%, #1c1e26 100%)",
        height: "400px",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "transform 0.3s ease",
        margin: "0 10px",
        overflow: "hidden"
    };

    return (
        <div>
            <Navbar />
            <h1 className='page-title'>Our Story</h1>
            
            <div className="about-container">
                <p>Welcome to our exclusive e-commerce destination! We are dedicated to providing you with a seamless and enjoyable shopping experience. Our mission is to offer a wide range of <span className="about-highlight">high-quality products</span> at competitive prices, all while delivering exceptional customer service. Whether you're looking for the latest fashion trends, cutting-edge electronics, or unique home decor, we have something <span className="about-highlight">perfect for everyone</span>.</p>
                <p>We believe in making online shopping easy, secure, and accessible. Thank you for choosing us as your go-to destination for all your shopping needs!</p>
            </div>

            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://i.pinimg.com/474x/90/5d/b2/905db292d68125b10d5fc6166d08dfe4.jpg" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} src="https://i.pinimg.com/474x/90/5d/b2/905db292d68125b10d5fc6166d08dfe4.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://st3.depositphotos.com/35997962/37666/i/450/depositphotos_376666036-stock-photo-makeup-brushes-colorful-powder-explosion.jpg" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} src="https://st3.depositphotos.com/35997962/37666/i/450/depositphotos_376666036-stock-photo-makeup-brushes-colorful-powder-explosion.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://i.pinimg.com/736x/c2/58/50/c2585078c338867a53a52a5dfcc20af0.jpg" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} src="https://i.pinimg.com/736x/c2/58/50/c2585078c338867a53a52a5dfcc20af0.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a
                                href="https://images.jdmagicbox.com/v2/comp/bangalore/v3/080pxx80.xx80.211211004820.q3v3/catalogue/the-organic-world-kalyan-nagar-bangalore-organic-product-dealers-x81rohshzg-250.jpg" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%" }}>
                                <img src="https://images.jdmagicbox.com/v2/comp/bangalore/v3/080pxx80.xx80.211211004820.q3v3/catalogue/the-organic-world-kalyan-nagar-bangalore-organic-product-dealers-x81rohshzg-250.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://images.unsplash.com/photo-1520975916090-3105956dac38" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                            <img
                                src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                                alt="Fashion Collection"
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
                            /></a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://images.unsplash.com/photo-1596462502278-27bfdc403348" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
                                    alt="Makeup Products"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
                                />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://images.unsplash.com/photo-1542838132-92c53300491e" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                                    alt="Fresh Grocery"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
                                />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://i.pinimg.com/736x/1d/f5/07/1df507c28060cc973d4c299a0688e551.jpg" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img
                                    src="https://i.pinimg.com/736x/1d/f5/07/1df507c28060cc973d4c299a0688e551.jpg"
                                    alt="Luxury Perfume"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
                                />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={slideStyle}>
                            <a href="https://images.unsplash.com/photo-1607082350899-7e105aa886ae" target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                                    alt="Fast Delivery"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
                                />
                            </a>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )

}
export default About
