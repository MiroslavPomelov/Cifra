'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { ImageSliderProps } from './interfaces/imageSliderInterface';

const sliderContainerSyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0.2)'
}

const sildeStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',

}

const textOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px 20px',
    borderRadius: '5px'
}

const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    fontSize: '24px',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1
}

// export function ImageSlider({ slides, interval = 3000 }: ImageSliderProps): ReactNode {
//     return (

// )
// }


const ImageSlider: React.FC<ImageSliderProps> = ({ slides, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0); //Index текущего слайда

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => ((prevIndex - 1) + slides.length) % slides.length)
    }

    useEffect(() => {
        const timer = setInterval(goToNextSlide, interval);

        return () => {
            clearInterval(timer);
        }
    }, [interval]);

    return (
        <div style={sliderContainerSyle}>

            <div style={sildeStyle}>
                <Image
                    src={slides[currentIndex].src}
                    alt={slides[currentIndex].title}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                />

                <div style={textOverlayStyle}>
                    <h2>{slides[currentIndex].title}</h2>
                    <p>{slides[currentIndex].description}</p>
                </div>
            </div>

            <button style={{ ...buttonStyle, left: 0 }} onClick={goToPrevSlide}>◄</button>
            <button style={{ ...buttonStyle, right: 0 }} onClick={goToNextSlide}>►</button>

        </div>
    );
}

export default ImageSlider;