import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ModalSearch } from '~/components/modal/modalSearch';

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
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState(false);

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

  const orderedPokemons = order
    ? pokemons.slice().sort((a, b) => a.name.localeCompare(b.name))
    : pokemons;

  const renderPokemons = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => goToInformationPokemon(index)}
      style={{
        borderRadius: 8,
        width: 126,
        height: 154,
        paddingVertical: 8,
        margin: 4,
        marginBottom: 16,
        shadowColor: '#1D1D1D',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 2 },
        backgroundColor: '#ffff',
      }}>
      <Text style={{ textAlign: 'right', paddingHorizontal: 8, color: '#666666' }}>
        {item?.code}
      </Text>
      <Image
        style={{ width: 85, height: 70, alignSelf: 'center', top: 10, zIndex: 2 }}
        source={{
          uri: item?.url,
        }}
      />
      <View
        style={{
          backgroundColor: '#EFEFEF',
          height: 59,
          width: 126,
          borderRadius: 7,
          justifyContent: 'flex-end',
          paddingBottom: 8,
        }}>
        <Text style={{ textAlign: 'center', color: '#1D1D1D', fontSize: 16 }}>
          {item?.name && item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  function goToInformationPokemon(index: number) {
    const pokemonsInfo = pokemons[index];
    navigation.navigate('InformationsScreen', { pokemonsInfo });
  }

  function openModal() {
    setModal(true);
  }

  function changeOrder() {
    setOrder(!order);
  }

  return (
    <View style={{ backgroundColor: '#DC0A2D', flex: 1 }}>
      <ModalSearch
        open={modal}
        onClose={() => setModal(false)}
        onPress={changeOrder}
        order={order}
      />

      <View
        style={{
          marginTop: 89,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <Image source={require('../../components/images/Pokeball-2.png')} />
        <Text
          style={{
            color: '#ffff',
            fontSize: 28,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          Pokédex
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#ffff',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 100,
            gap: 8,
            flex: 1,
          }}>
          <Ionicons name="search-outline" size={24} color="#DC0A2D" />
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
                style={{ flexGrow: 1 }}
              />
            )}
            name="name"
            rules={{ required: 'Nome é obrigatório' }}
            defaultValue=""
          />
        </View>
        <TouchableOpacity
          onPress={openModal}
          style={{
            backgroundColor: '#f4f4f4',
            width: 37,
            height: 37,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
          }}>
          <Text style={{ color: '#DC0A2D', fontSize: 17 }}>#</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#ffff',
          marginHorizontal: 8,
          marginTop: 32,
          borderRadius: 8,
        }}>
        <FlatList
          renderItem={renderPokemons}
          data={search ? filteredPokemons : order ? orderedPokemons : pokemons}
          keyExtractor={(item) => item.id}
          numColumns={3}
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
