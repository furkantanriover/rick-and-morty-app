import Entypo from '@expo/vector-icons/Entypo';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { get } from '~/app/api/client';
import { useColorScheme } from '~/lib/useColorScheme';
import { truncateText } from '~/lib/utils';

type Option = {
  id: string;
  label: string;
  episodes: number;
  image: string;
};

const fetchOptions = async (query: string): Promise<Option[]> => {
  const data = await get('/character/', { name: query });
  return data.results.map((character: any) => ({
    id: character.id,
    image: character.image,
    label: character.name,
    episodes: character.episode.length,
  }));
};

export const MultipleSelect: React.FC<{ onSelectedOptionsChange: (name: string[]) => void }> = ({
  onSelectedOptionsChange,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const { refetch: filteredCharactersRefetch, data: filteredCharactersData } = useQuery({
    queryKey: ['filteredCharacters', query],
    queryFn: async () => await fetchOptions(query),
    enabled: query.length >= 3,
  });

  const toggleSelectOption = (option: Option) => {
    let newSelectedOptions;
    console.log('toggleSelectOption', option);
    if (selectedOptions.some((selected) => selected.id === option.id)) {
      newSelectedOptions = selectedOptions.filter((selected) => selected.id !== option.id);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onSelectedOptionsChange(newSelectedOptions.map((opt) => opt.id));
  };

  const removeSelectedOption = (option: Option) => {
    console.log('removeSelectedOption', option);
    const newSelectedOptions = selectedOptions.filter((selected) => selected.id !== option.id);
    setSelectedOptions(newSelectedOptions);
    onSelectedOptionsChange(newSelectedOptions.map((opt) => opt.id));
  };

  const { colorScheme } = useColorScheme();
  return (
    <View
      className={`${colorScheme === 'dark' ? 'border-slate-700' : 'border-slate-300'} decoration-none mb-4 flex items-center justify-center rounded-lg border px-4 pt-2`}>
      <View className="flex flex-row flex-wrap items-center">
        {selectedOptions.map((option) => (
          <View
            key={option.id}
            className={`m-1.5 flex flex-row items-center rounded-full ${colorScheme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} p-1.5`}>
            <Text className={`mr-1.5 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
              {option.label}
            </Text>
            <TouchableOpacity onPress={() => removeSelectedOption(option)}>
              <Text
                className={`text-lg font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                ×
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <View className="flex w-full flex-row items-center">
          <TextInput
            className={`h-8 flex-1 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}
            value={query}
            onChangeText={(text) => {
              setQuery(text.toLowerCase());
              if (text.length >= 3) {
                setShowOptions(true);
                filteredCharactersRefetch();
              } else {
                setShowOptions(false);
              }
            }}
            placeholder="Type to search"
          />
          <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
            <Entypo
              name={showOptions ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showOptions && (
        <ScrollView className="mt-3.5 max-h-52 w-full">
          {filteredCharactersData?.map((option) => (
            <TouchableOpacity
              key={option.id}
              className={`border-b p-2.5 ${colorScheme === 'dark' ? 'border-slate-300' : 'border-slate-700'}`}
              onPress={() => toggleSelectOption(option)}>
              <View className="flex flex-row items-center gap-2">
                <View
                  className={`mr-2.5 h-5 w-5 items-center justify-center border ${colorScheme === 'dark' ? 'border-white' : 'border-black'}`}>
                  {selectedOptions.some((selected) => selected.id === option.id) && (
                    <View
                      className={`h-2.5 w-2.5 ${colorScheme === 'dark' ? 'bg-white' : 'bg-black'}`}
                    />
                  )}
                </View>
                <Image source={{ uri: option.image }} className="h-10 w-10 rounded-lg" />
                <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {truncateText(`${option.label} (${option.episodes} Episodes)`, 29)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
