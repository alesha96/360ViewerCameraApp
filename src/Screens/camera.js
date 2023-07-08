import {React,useEffect, useState, useRef} from "react";
import {View,Text,StyleSheet, TouchableOpacity} from "react-native";
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RNFS from "react-native-fs";
import ProgressCircle from 'react-native-progress-circle'

const camera=(props)=>{

    const camera = useRef(null);
    const devices = useCameraDevices();
    const device = devices.back;
  
    const [showCamera, setShowCamera] = useState(true);
    const [imageSource, setImageSource] = useState('');
    const [capturing,setCapturing]=useState(false);
    const [percent,setPercent]=useState(0);
  
    useEffect(() => {
        console.log(devices)
      async function getPermission() {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log(newCameraPermission);
      }
      getPermission();
    }, []);
  
    const capturePhoto = async () => {
        setCapturing(true);
        for(var i=0;i<10;i++){
            if (camera.current !== null) {
                const photo = await camera.current.takePhoto({});
                setImageSource(photo.path);
                setShowCamera(true);
        
                const imagePath = photo.path;
                const imageFileName = new Date()+'p.jpg';
                const destinationDir = RNFS.DocumentDirectoryPath;
                const destinationPath = destinationDir + '/' + imageFileName;
        
                RNFS.moveFile(imagePath, destinationPath)
                .then(() => {
                  console.log('Image saved successfully');
                  setPercent((i+1)*10);

                })
                .catch(error => {
                  console.log('Error saving image:', error);
                });
                console.log(photo.path);
  
              }
              
        }
        setCapturing(false);
        props.navigation.navigate("Gallery")
     
    };
  
    if (device == null) {
      return <Text>Camera not available</Text>;
    }
  
    return(
        <View style={{flex:1}}>
        <View style={{flex:3}}>
        <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />
        </View>
        <View style={{flex:0.5,backgroundColor:"#549DCF",justifyContent:"center",alignItems:"center"}}>
        {capturing?        
        <ProgressCircle
            percent={percent}
            radius={40}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{percent+'%'}</Text>
        </ProgressCircle>
        :<TouchableOpacity onPress={()=>{capturePhoto()}}>
        <View style={{flex:0.9,width:wp(22),backgroundColor:"white",borderRadius:hp(50),justifyContent:"center",alignItems:"center"}}>
        <View style={{flex:0.83,width:wp(18),backgroundColor: 'rgba(52, 52, 52, 0.5)',borderRadius:hp(50)}}>

        </View>
        </View>
        </TouchableOpacity>}
        

        </View>

        </View>
    )
}

export default camera;