import React, {useEffect, useRef, useState} from 'react';
import classes from "./RangeSlider.module.scss";

const RangeSlider = ({min, max}) => {
  const toggle = useRef(null)
  const track = useRef(null)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false);
  const [toggleOffSet, setToggleOffSet] = useState(0)
  const [currentValue, setCurrentValue] = useState(min)

  let trackWidth = track?.current?.offsetWidth;
  let toggleWidth = toggle?.current?.offsetWidth;
  let maxRight = trackWidth - toggleWidth;

  useEffect(() => {
    const handleMouseUpAndTouchEnd = () => {
      setIsDragging(false);
    }
    const handleMouseMove = (e) => {
      if (isDragging) {
        let offset = e.clientX - toggleOffSet;
        if (offset < 0) {
          offset = 0;
        } else if (offset > maxRight) {
          offset = maxRight;
        }
        setCurrentPosition(offset)
        const value = offset / (maxRight / max);
        setCurrentValue(Math.round(value))

      }
    }
    const handleTouchMove = (e) => {
      if (isDragging) {
        const touch = e.touches[0]
        let offset = touch.clientX - toggleOffSet;
        if (offset < 0) {
          offset = 0;
        } else if (offset > maxRight) {
          offset = maxRight;
        }
        setCurrentPosition(offset)
        const value = offset / (maxRight / max);
        setCurrentValue(Math.round(value))

      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("mouseup", handleMouseUpAndTouchEnd);
    window.addEventListener("touchend", handleMouseUpAndTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpAndTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUpAndTouchEnd);
    };
  }, [isDragging])


  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleOffSet(e.clientX - toggle?.current?.offsetLeft)
    setIsDragging(true);
  }

  const handleTouchDown = (e) => {
    e.preventDefault();
    const touch = e.touches[0]
    setToggleOffSet(touch.clientX - toggle?.current?.offsetLeft)
    setIsDragging(true);
  }

  return (
    <div className={classes.container}>
      <div ref={track} className={classes.bar}>
        <div ref={toggle} className={isDragging ? classes.toggle_active : classes.toggle} onTouchStart={handleTouchDown}
             onMouseDown={handleMouseDown}
             style={{left: `${currentPosition}px`}}>
          {currentValue}
        </div>
        <span className={classes.completedBarLength} style={{width: `${currentPosition + 30}px`}}/>
      </div>
    </div>
  );
};

export default RangeSlider;