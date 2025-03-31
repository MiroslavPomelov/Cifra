import * as Slider from "@radix-ui/react-slider";
import './sliderstyle.css';
import { SliderProps } from "@/types/sliderProps.type";

export default function SliderDemo(props: SliderProps) {


    return (
        <Slider.Root  className="SliderRoot" defaultValue={[50]} max={100} step={1}>
            <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb style={{
                backgroundColor: 'red'
            }} className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
    )
}


