import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export default class carousel extends Component {
  render() {
    return (
      <div>
        <Carousel fade={false} interval={5000} pauseOnHover={true}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/cover 1.jpg"
              alt="First slide"
              height="325px"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../images/cover 2.jpg"
              alt="Second slide"
              height="325px"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://pbs.twimg.com/media/EGHYvttU4AAYKb7?format=jpg&name=large"
              alt="Third slide"
              height="325px"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
