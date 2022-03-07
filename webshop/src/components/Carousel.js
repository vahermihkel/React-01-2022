import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      { ["logo192.png",2,"logo192.png",4,5,6].map((element,i) => <div key={i}>
        <img src={element} alt="" />
      </div>)} 
    </Slider>
  );
}

export default Carousel;