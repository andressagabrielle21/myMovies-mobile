import { icons } from '@/constants/icons';
import { useMovieList } from '@/context/useMovieList';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IMovieLabel {
  label: string,
  value?: string | number | null
}

const MovieLabels = ({label, value}: IMovieLabel) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>

    <Text className='text-light-100 font-bold text-sm'>
      {value || "N/A"}
    </Text>
  </View>
)

const MovieDetails = () => {
  const {id} = useLocalSearchParams();

  const {fetchMovieInfo, movieInfo, loading} = useMovieList();

  useEffect(() => {
    fetchMovieInfo(id as string);
  }, []);

  if (loading) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
      >
        <View>
          <Image source={{
            uri: `https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`,
          }}
          className='w-full h-[550px]'
          resizeMode='stretch'
          />
        </View>

        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className="text-2xl font-bold text-white">{movieInfo?.title}</Text>
          
          <View className='flex-row items-center gap-x-5 mt-2'>
            <Text className="text-sm text-light-200">{movieInfo?.release_date.substring(0, 4)}</Text>

            <Text className="text-sm text-light-200">{movieInfo?.runtime}min</Text>

          </View>

          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-2 mt-2'>
            <Image source={icons.star} className='size-4'/>
            <Text  className='text-white text-sm font-bold'>{movieInfo?.vote_average.toFixed(1)}</Text>

            <Text className='text-light-200 text-sm'>({movieInfo?.vote_count} votes)</Text>
          </View>

          <MovieLabels label='Overview' value={movieInfo?.overview}/>

          <MovieLabels label='Genres' value={movieInfo?.genres?.map((item) => item.name).join(' - ') || 'N/A'}/>

          <View className='flex flex-row justify-between w-1/2'>
            <MovieLabels label='Budget' value={`${movieInfo?.budget / 1000000} millions`}/>
            <MovieLabels label='Revenue' value={`${(movieInfo?.revenue / 1000000).toFixed(2)} millions`}/>
          </View>

          <MovieLabels label='Production Companies' value={movieInfo?.production_companies.map((item) => item.name).join(' · ') || 'N/A'}/>

          <MovieLabels label='Languages' value={movieInfo?.spoken_languages.map((item) => item.name).join(' · ') || 'N/A'}/>

        </View>

      </ScrollView>

      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 rounded-lg bg-accent py-3.5 flex flex-row items-center justify-center' onPress={router.back}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
        <Text className='font-semibold text-white '>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails