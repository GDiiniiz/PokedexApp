import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PokemonData {
  name: string;
  stats: {
    base_stat: string;
    stat: {
      name: string;
    };
    types: {
      slot: string;
      type: {
        name: string;
      };
    };
    height: string;
    weight: string;
  }[];
  sprites: {
    front_default: string;
  };
}

export function InfoPokemon() {
  const route = useRoute();
  const navigation = useNavigation();

  const { pokemonsInfo } = route?.params || {};
  const [pokemons, setPokemons] = useState<PokemonData[] | null>(null);

  function backPage() {
    navigation.goBack();
  }

  async function getPokeons() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonsInfo?.name}`);
      const data = await response.json();
      setPokemons([data]);
      console?.log(data?.height);

      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar os dados da API:', error);
      return null;
    }
  }

  useEffect(() => {
    getPokeons();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pokemonsInfo?.color }}>
      <ScrollView>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: 32, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={backPage}>
            <Ionicons name="arrow-back-outline" size={44} color="#f4f4f4" />
          </TouchableOpacity>
          <Text style={{ color: '#f4f4f4', fontWeight: 'bold', fontSize: 44 }}>
            {pokemonsInfo?.name &&
              pokemonsInfo.name.charAt(0).toUpperCase() + pokemonsInfo.name.slice(1)}
          </Text>
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <Image
            source={require('../../../components/images/pokeball.png')}
            style={{ position: 'absolute', right: 0 }}
          />
        </View>

        <View style={{ alignSelf: 'center', top: 53, zIndex: 2 }}>
          <Image source={{ uri: pokemonsInfo?.url }} style={{ width: 250, height: 250 }} />
        </View>

        <View
          style={{
            backgroundColor: '#f4f4f4',
            marginHorizontal: 8,
            borderRadius: 8,
            height: '100%',
            paddingTop: 66,
          }}>
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}>
              <View style={{ backgroundColor: pokemonsInfo?.color, padding: 8, borderRadius: 16 }}>
                <Text style={{ color: '#f4f4f4', fontWeight: 'bold', fontSize: 16 }}>
                  {pokemons?.[0]?.types[0]?.type?.name}
                </Text>
              </View>
              {pokemons?.[0]?.types[1]?.type?.name && (
                <View
                  style={{ backgroundColor: pokemonsInfo?.color, padding: 8, borderRadius: 16 }}>
                  <Text style={{ color: '#f4f4f4', fontWeight: 'bold', fontSize: 16 }}>
                    {pokemons?.[0]?.types[1]?.type?.name}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
            <Text style={{ color: pokemonsInfo?.color, fontWeight: 'bold', fontSize: 28 }}>
              About
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', gap: 16 }}>
              <Text>{pokemons?.[0]?.weight} kg</Text>
              <Text style={{ color: '#666666' }}>Weight</Text>
            </View>
            <View
              style={{ width: 1, height: 54, backgroundColor: '#E0E0E0', marginHorizontal: 20 }}
            />
            <View style={{ alignItems: 'center', gap: 16 }}>
              <Text>{pokemons?.[0]?.height} cm</Text>
              <Text style={{ color: '#666666' }}>Height</Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
            <Text style={{ color: pokemonsInfo?.color, fontWeight: 'bold', fontSize: 28 }}>
              Base Stats
            </Text>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{ color: pokemonsInfo?.color, fontWeight: 'bold', fontSize: 17 }}>
                {pokemons?.[0]?.stats?.[0]?.stat?.name}
              </Text>

              <Text>{pokemons?.[0]?.stats?.[0]?.base_stat}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: pokemonsInfo?.color,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {pokemons?.[0]?.stats?.[1]?.stat?.name}
              </Text>

              <Text>{pokemons?.[0]?.stats?.[1]?.base_stat}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: pokemonsInfo?.color,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {pokemons?.[0]?.stats?.[2]?.stat?.name}
              </Text>

              <Text
                style={{
                  textAlign: 'right',
                }}>
                {pokemons?.[0]?.stats?.[2]?.base_stat}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{ color: pokemonsInfo?.color, fontWeight: 'bold', fontSize: 17 }}>
                {pokemons?.[0]?.stats?.[3]?.stat?.name}
              </Text>

              <Text>{pokemons?.[0]?.stats?.[3]?.base_stat}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{ color: pokemonsInfo?.color, fontWeight: 'bold', fontSize: 17 }}>
                {pokemons?.[0]?.stats?.[4]?.stat?.name}
              </Text>

              <Text>{pokemons?.[0]?.stats?.[4]?.base_stat}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{ color: pokemonsInfo?.color, fontWeight: 'bold', fontSize: 17 }}>
                {pokemons?.[0]?.stats?.[5]?.stat?.name}
              </Text>

              <Text>{pokemons?.[0]?.stats?.[5]?.base_stat}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
