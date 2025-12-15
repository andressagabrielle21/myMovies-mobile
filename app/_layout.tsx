import { useForm } from "@/context/useUsername";
import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";


export default function RootLayout() {
  const {setAuth} = useForm();

  useEffect(() => {
    const getInitalSession = async () => {
      const {data: {session}} = await supabase.auth.getSession();

      if (session?.user) {
        setAuth(session.user);
        router.replace('/(tabs)');
      } else {
        setAuth(null);
        router.replace('(auth)/login');
      }
    }

    getInitalSession();

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuth(session.user);
        router.replace('/(tabs)');
      } else {
        setAuth(null);
        router.replace('(auth)/login');
      }
    })
  }, [])

  return (
    <>
      <StatusBar hidden={true}/>
      <Stack> 
        <Stack.Screen 
          name="index"
          // Not show the header on the app
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="(auth)/signup"
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="(auth)/login"
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="(tabs)"
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="movies/[id]"
          options={{headerShown: false}}
        />

      </Stack>
    </>
  )}
