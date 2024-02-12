import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import Lottie from 'lottie-react-native';
import Colors from '@/constants/Colors';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const CustomDrawerContent = (props : any ) => {
  const pathname = usePathname();


  return (
    <DrawerContentScrollView  {...props}>
      <View style={styles.userInfoWrapper}>
            <Lottie style={{
          width: 45,
          height: 45,
        }}  speed = {1.5} resizeMode="cover"  source={require('../../assets/animations/sticker.json')} autoPlay loop />

        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}>Mobile App</Text>
          <Text style={styles.userEmail}>auca@email.rw</Text>
        </View>
      </View>
       <DrawerItem
        icon={({ color, size }) => (
          <TabBarIcon name="home"  color={pathname == "/" ? "#fff" : "#000"}/>


          
        )}
        label={"Home"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome name="calculator" size={25} color={pathname == "/calculator" ? "#fff" : "#000"} />


        )}
        label={"Calculator"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/calculator" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/calculator" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/calculator");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome6 name="face-grin-wink" size={28} color={pathname == "/aboutUs" ? "#fff" : "#000"}
 />
        )}
        label={"About Me"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/aboutUs" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/aboutUs" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/aboutUs");
        }}
      />
     
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props}  />} screenOptions={{headerShown: true}}>
      <Drawer.Screen name="(tabs)" options={{headerShown: true , headerTitle: ''}} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
   
  },
  userImg: {
    borderRadius: 40,
  },
  userDetailsWrapper: {
    // marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize:16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});
