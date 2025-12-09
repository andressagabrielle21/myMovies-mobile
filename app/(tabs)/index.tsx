import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useMovieList } from "@/context/useMovieList";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import FilmCard from "../components/FilmCard";
import SearchBar from "../components/SearchBar";

export default function Index() {
  const router = useRouter();
  
  const {movieList, fetchMovies, error} = useMovieList();

  useEffect(() => {
    setTimeout(() => {
        fetchMovies()
    }, 800);
    }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10
        }}
      > 
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

        <View 
          className="flex-1 mt-5"
        > 
          {movieList ? 
            (
              <View className="grid grid-cols-3">
                <SearchBar 
                  onPress={() => router.push("/search")}
                  placeholder="Search for a movie"
                />
      
                <Text className="text-2xl font-bold my-3 text-white">Latest Movies</Text>

                <FlatList 
                  data={movieList}
                  renderItem={({item}) => (
                    <FilmCard {...item}/>
                    
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle= {{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 30
                  }}
                  className="mt-2 pb-32 "
                  scrollEnabled= {false}
                />
              </View>
            ) :
            (
              <Text>{error}</Text>
            )
          }
        </View>

      </ScrollView>
    </View>
  );
}
