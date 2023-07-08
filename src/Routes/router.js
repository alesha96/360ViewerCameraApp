
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from "../Screens/camera";
import Gallery from "../Screens/gallery";
import ImageView from '../Screens/imageView';

const Stack = createNativeStackNavigator();

const router=()=>{
  return (
      <Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor:"#549DCF",
        }
      }}>
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="ImageView" component={ImageView} />
      </Stack.Navigator>
  );
}

export default router;