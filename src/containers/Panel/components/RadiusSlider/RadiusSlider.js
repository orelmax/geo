import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadiusSlider.css';

const percentToValue = (perc, { max, min }) => perc * (max - min) / 100;
const valueToPerc = (val, { max, min }) => (val - min) * 100 / (max - min);

class RadiusSlider extends Component {
  constructor(props) {
    super(props);

    this.handler = null;
    this.sliderRef = null;
    this.sliderRect = null;
    this.state = {
      x: valueToPerc(props.defaultRadius, props),
      value: props.defaultRadius,
    };
  }

  componentDidMount() {
    this.sliderRect = this.sliderRef.getBoundingClientRect();
  }
  

  onMouseDown = (e) => {
    this.handler.addEventListener('mousemove', this.adjustHandler);
  }

  adjustHandler = (e) => {
    const offsetX = e.clientX - this.sliderRect.left;

    if (offsetX >= 0 && offsetX <= this.sliderRect.width) {
      const nextX = offsetX * 100 / this.sliderRect.width;
      const nextVal = parseInt(percentToValue(nextX, this.props).toFixed(1), 10);

      this.setState({
        x: nextX,
        value: nextVal,
      });

      this.props.setRadius(nextVal);
    }
  }

  unbind = (e) => {
    this.handler.removeEventListener('mousemove', this.onMouseMove);
  }

  render() {
    const { min, max } = this.props;

    return (
      <div
        className="slider"
        ref={(ref) => {
          if (ref) this.sliderRef = ref;
        }}
      >
        <div className="slider__range">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <div className="slider__inn">
          <div
            className="slider__back"
            onClick={this.adjustHandler}
          />
          <div
            onMouseDown={this.onMouseDown}
            onMouseUp={this.unbind}
            className="slider__handler"
            ref={(ref) => {
              if (ref) this.handler = ref;
            }}
            style={{
              left: `${this.state.x}%`,
            }}
          />
        </div>
        <div className="radius__current">
          {`Radius: ${this.state.value} m.`}
        </div>
      </div>
    );
  }
}

RadiusSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultRadius: PropTypes.number.isRequired,
  setRadius: PropTypes.func.isRequired,
};

export default RadiusSlider;