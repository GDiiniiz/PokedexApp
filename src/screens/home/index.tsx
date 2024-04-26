import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [pokemons, setPokemons] = useState<PokemonData[] | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function getPokeons(formData: FormData) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formData.name}`);
      const data = await response.json();
      setPokemons([data]);

      return data;
    } catch (error) {
      console.error('Ocorreu um erro ao recuperar os dados da API:', error);
      return null;
    }
  }

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', marginTop: 89 }}>
        <Text style={{ color: '#ffcb05', fontSize: 28, fontWeight: 'bold' }}>POKEDEX</Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Procurar informações pokemon:</Text>
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
              placeholder="Digite seu nome"
              style={{ backgroundColor: '#ccc', padding: 16, borderRadius: 8, flexGrow: 1 }}
            />
          )}
          name="name"
          rules={{ required: 'Nome é obrigatório' }}
          defaultValue=""
        />
        <TouchableOpacity
          onPress={handleSubmit(getPokeons)}
          style={{ backgroundColor: '#2a75bb', padding: 16, borderRadius: 8 }}>
          <Ionicons name="search-outline" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginHorizontal: 16,
          marginTop: 24,
          borderWidth: 1,
          borderRadius: 6,
          height: 548,
          padding: 16,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#2a75bb', fontSize: 28, fontWeight: 'bold' }}>
            {pokemons && pokemons[0]?.name}
          </Text>
        </View>
        <View
          style={{
            width: 200,
            height: 400,
            alignSelf: 'center',
          }}>
          <Image
            source={{ uri: pokemons && pokemons[0]?.sprites?.front_default }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: '#2a75bb', fontSize: 28, fontWeight: 'bold' }}>
            HP:
            {pokemons && pokemons[0]?.stats[0]?.base_stat}
          </Text>
          <Text style={{ color: '#2a75bb', fontSize: 28, fontWeight: 'bold' }}>
            Ataque:
            {pokemons && pokemons[0]?.stats[1]?.base_stat}
          </Text>
          <Text style={{ color: '#2a75bb', fontSize: 28, fontWeight: 'bold' }}>
            Defesa:
            {pokemons && pokemons[0]?.stats[2]?.base_stat}
          </Text>
          <Text style={{ color: '#2a75bb', fontSize: 28, fontWeight: 'bold' }}>
            Velocidade:
            {pokemons && pokemons[0]?.stats[5]?.base_stat}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
