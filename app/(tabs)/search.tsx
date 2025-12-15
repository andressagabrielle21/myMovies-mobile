import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useMovieList } from '@/context/useMovieList';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import FilmCard from '../components/FilmCard';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>('');

  const {searchMovies, loading, error, reset} = useMovieList();
  const fetchMovies = useMovieList(state => state.fetchMovies)

  useEffect(() => {

    const delay = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchMovies(searchTerm);
      } else {
        reset()
      }
    }, 600);

    return () => clearTimeout(delay);
  }, [searchTerm, fetchMovies]);

  return (
    <View
      className='flex-1 bg-primary'
    >
      <Image 
        source={images.bg} 
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList
        data={searchMovies}
        renderItem={({item}) => <FilmCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'> 
              <Text className='text-center text-gray-500'>
                {searchTerm.trim() ? "No movies were found." : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className="w-12 h-10"/>
            </View>

            <View className='my-5'>
              <SearchBar 
                placeholder='Searching movies' 
                value={searchTerm}
                onChangeText={(text: string) => setSearchTerm(text)}
                autoFocus={true}
              />
            </View>

            {loading && (
              <ActivityIndicator 
                size="large" 
                color="#0000ff"
                className='my-3'
              />
            )}

            {error && (
              <Text className='text-2xl text-red-400 font-bold'>Unable to find movie. Try again.</Text>
            )}

            {!loading && !error && searchTerm.trim() && searchMovies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search results for {' '}
                <Text className='text-accent'>{searchTerm}</Text>
              </Text>
            )}
        </>
        }
      />
    </View>
  )
}

export default Search;