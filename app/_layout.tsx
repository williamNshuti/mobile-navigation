import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { SessionProvider } from "@/util/ctx";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-root-toast";

// const IOSClientID =
//   "991200331563-hcfe89mbc8q9t71bgdcmilj250b5oru7.apps.googleusercontent.com";
// const AndroidClientID =
//   "991200331563-r1r845nmbafjajfmrbbi4b6am2rfuknt.apps.googleusercontent.com";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected || false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SessionProvider>
      <RootSiblingParent>
        <Toast
          visible={isOnline === false}
          duration={Toast.durations.SHORT}
          position={Toast.positions.TOP}
          shadow={true}
          animation={true}
          hideOnPress={true}
          backgroundColor="red">
          You Are Offline! 🚫
        </Toast>
        {/* <Toast
          visible={isOnline}
          duration={20}
          position={Toast.positions.TOP}
          shadow={true}
          animation={true}
          hideOnPress={true}
          backgroundColor="blue">
          You Are Online!
        </Toast> */}
        <Stack initialRouteName="(drawer)">
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="project" options={{ headerShown: false }} />
          <Stack.Screen name="quiz" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>
      </RootSiblingParent>
    </SessionProvider>
  );
}
