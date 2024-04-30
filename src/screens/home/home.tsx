import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FormData {
  name: string;
}

const pokemons = [
  {
    id: '1',
    name: 'bulbasaur',
    code: '#001',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
    color: '#74CB48',
  },
  {
    id: '2',
    name: 'charmander',
    code: '#004',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
    color: '#F57D31',
  },
  {
    id: '3',
    name: 'squirtle',
    code: '#007',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
    color: '#6493EB',
  },
  {
    id: '4',
    name: 'butterfree',
    code: '#012',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png',
    color: '#A7B723',
  },
  {
    id: '5',
    name: 'pikachu',
    code: '#025',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/025.png',
    color: '#F9CF30',
  },
  {
    id: '6',
    name: 'gastly',
    code: '#092',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/092.png',
    color: '#70559B',
  },
  {
    id: '7',
    name: 'ditto',
    code: '#132',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/132.png',
    color: '#AAA67F',
  },
  {
    id: '8',
    name: 'mew',
    code: '#152',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png',
    color: '#FB5584',
  },
  {
    id: '9',
    name: 'aron',
    code: '#304',
    url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/304.png',
    color: '#B7B9D0',
  },
];

export function Home() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.code.toLowerCase().includes(search.toLowerCase())
  );

  const renderPokemons = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => goToInformationPokemon(index)}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        width: 154,
        height: 174,
        paddingVertical: 16,
        paddingHorizontal: 8,
        margin: 8,
        shadowColor: '#1D1D1D',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 2 },
        backgroundColor: '#f4f4f4',
      }}>
      <Text style={{ textAlign: 'right' }}>{item?.code}</Text>
      <Image
        style={{ width: 100, height: 100, alignSelf: 'center' }}
        source={{
          uri: item?.url,
        }}
      />
      <Text style={{ textAlign: 'center' }}>{item?.name}</Text>
    </TouchableOpacity>
  );

  function goToInformationPokemon(index: number) {
    const pokemonsInfo = pokemons[index];
    navigation.navigate('InformationsScreen', { pokemonsInfo });
  }

  return (
    <View style={{ backgroundColor: '#DC0A2D', flex: 1 }}>
      <View style={{ marginTop: 89, paddingHorizontal: 16 }}>
        <Text style={{ color: '#f4f4f4', fontSize: 28, fontWeight: 'bold' }}>POKÉDEX</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={(text) => {
                setSearch(text);
                onChange(text);
              }}
              onBlur={onBlur}
              value={value}
              placeholder="Search"
              style={{
                backgroundColor: '#f4f4f4',
                padding: 16,
                borderRadius: 16,
                flexGrow: 1,
              }}
            />
          )}
          name="name"
          rules={{ required: 'Nome é obrigatório' }}
          defaultValue=""
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#f4f4f4',
          marginHorizontal: 16,
          marginTop: 32,
          borderRadius: 8,
        }}>
        <FlatList
          renderItem={renderPokemons}
          data={search ? filteredPokemons : pokemons}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
}
