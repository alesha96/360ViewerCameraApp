import {React,useEffect,useState} from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from "react-native";
import RNFS from "react-native-fs";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const gallery=(props)=>{
    const [imagePairs, setImagePairs] = useState([]);

    useEffect(() => {
        const fetchImagesFromFolder = async () => {
          const folderPath = `${RNFS.DocumentDirectoryPath}`;
          const files = await RNFS.readDir(folderPath);
          const imageFiles = files.filter(file => file.isFile() && file.name.endsWith('p.jpg'));
      console.log(imageFiles[0]);
          const sortedImages = imageFiles
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(file => file.path);
      
          const pairs = [];
          for (let i = 0; i < sortedImages.length; i += 10) {
            const pair = sortedImages.slice(i, i + 10);
            pairs.push(pair);
          }
      
          setImagePairs(pairs);
          console.log(pairs)
        };
      
        fetchImagesFromFolder();
      }, []);
    return(
<View style={{ flex: 1,alignItems:"center" }}>
  <FlatList
  numColumns={2}
    data={imagePairs}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => (
        <TouchableOpacity onPress={()=>props.navigation.navigate("ImageView",item)}>
        <View style={{ height:hp(20),width:hp(20),backgroundColor:"#549DCF",marginHorizontal:wp(5),marginVertical:wp(5)}}>
        <Image source={{ uri:"file://"+item[0] }} resizeMode="stretch" style={{ width:"100%", height: "75%" }} />
        <Text numberOfLines={1}>{item[0].substring(
            item[0].lastIndexOf('/') + 1,
            item[0].length
      )}</Text>
        </View>
        </TouchableOpacity>
      
    )}
  />
</View>
    )
}

export default gallery;