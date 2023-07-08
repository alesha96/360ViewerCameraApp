import {React,useEffect,useState} from "react";
import {View,Text,Image} from "react-native";
import Image360Viewer from '@hauvo/react-native-360-image-viewer';
import Carousel from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";

const imageView=(props)=>{
    var [images,setImages]=useState([]);
    useEffect(()=>{
        console.log(props.route.params)
        props.route.params.map((path)=>{
            setImages(oldImgs => [...oldImgs,"file://"+path] );
          //  images.push({uri:"file://"+path})
        })
      //  console.log(images[0])
    },[])
    return(
        <View style={{flex:1}}>
            <View style={{flex:5}}>
        {/* <Carousel
        data={images}
        renderItem={(item)=>{
            console.log("--88->",item.item);

             <Image source={{uri:"file://"+item.item}} resizeMode="contain" style={{width:"100%",height:"100%"}}/>

        }}
        sliderWidth={300}
        itemWidth={200}
      /> */}

        <SliderBox
  images={images}
  sliderBoxHeight={400}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  autoplay={false}
  circleLoop={true}
  resizeMethod={'resize'}
  resizeMode={'cover'}
  dotStyle={{display:"none"}}
  dotColor={'white'}
  inactiveDotColor={'gray'}
/>
{/* {console.log(";;;;;;",images)}
        <Image360Viewer
        scrset={{uri:images}}
        initialIndex={0}
        onImageChange={index => console.log('Current Image Index:', index)}
        style={{ flex: 1 }}
      /> */}
      </View>
        <View style={{flex:4}}>

        </View>
        </View>
    )
}

export default imageView;