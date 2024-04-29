import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PokemonData {
  name: string;
  stats: {
    base_stat: string;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

interface FormData {
  name: string;
}

export function Home() {
  const navigation = useNavigation();

  const pokemons = [
    {
      id: '1',
      name: 'bulbasaur',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
      color: '#74CB48',
    },
    {
      id: '2',
      name: 'charmander',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
      color: '#F57D31',
    },
    {
      id: '3',
      name: 'squirtle',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
      color: '#6493EB',
    },
    {
      id: '4',
      name: 'butterfree',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png',
      color: '#A7B723',
    },
    {
      id: '5',
      name: 'pikachu',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/025.png',
      color: '#F9CF30',
    },
    {
      id: '6',
      name: 'gastly',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/092.png',
      color: '#70559B',
    },
    {
      id: '7',
      name: 'ditto',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/132.png',
      color: '#AAA67F',
    },
    {
      id: '8',
      name: 'mew',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png',
      color: '#FB5584',
    },
    {
      id: '9',
      name: 'aron',
      url: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/304.png',
      color: '#B7B9D0',
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const renderPokemons = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => goToInformationPokemon(index)}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        width: 154,
        height: 174,
        paddingVertical: 16,
        alignItems: 'center',
        margin: 8,
        shadowColor: '#1D1D1D',
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 2 },
        backgroundColor: '#f4f4f4',
      }}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: item?.url,
        }}
      />
      <Text>{item?.name}</Text>
    </TouchableOpacity>
  );

  function goToInformationPokemon(index: number) {
    const pokemonsInfo = pokemons[index];
    navigation.navigate('InformationsScreen', { pokemonsInfo });
  }

  // async function getPokeons(formData: FormData) {
  //   try {
  //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formData.name}`);
  //     const data = await response.json();
  //     setPokemons([data]);

  //     return data;
  //   } catch (error) {
  //     console.error('Ocorreu um erro ao recuperar os dados da API:', error);
  //     return null;
  //   }
  // }

  return (
    <View style={{ backgroundColor: '#DC0A2D', flex: 1 }}>
      <View style={{ marginTop: 89, paddingHorizontal: 16 }}>
        <Text style={{ color: '#f4f4f4', fontSize: 28, fontWeight: 'bold' }}>POKÉDEX</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={(inputText) => onChange(inputText.toLowerCase())}
              onBlur={onBlur}
              value={value}
              placeholder="Pesquisar"
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
        <TouchableOpacity
          onPress={handleSubmit()}
          style={{ backgroundColor: '#f4f4f4', padding: 16, borderRadius: 8 }}>
          <Ionicons name="search-outline" size={16} color="#ccc" />
        </TouchableOpacity>
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
          data={pokemons}
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
