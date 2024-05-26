import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Image, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { get } from './api/client';

import { MultipleSelect } from '~/components/MultipleSelect';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

export default function Screen() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ['characters'],
    queryFn: async () => await get('/character'),
  });

  const filteredData = React.useMemo(() => {
    if (!data || selectedIds.length === 0) return data?.results || [];
    return data.results.filter((item: CharacterItem) => selectedIds.includes(item.id));
  }, [data, selectedIds]);

  return (
    <FlashList
      ListHeaderComponent={<MultipleSelect onSelectedOptionsChange={setSelectedIds} />}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={filteredData}
      estimatedItemSize={200}
      contentContainerClassName="py-4 android:pb-12"
      extraData={selectedIds}
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      ListEmptyComponent={filteredData.length === 0 ? ListEmptyComponent : undefined}
    />
  );
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return <View style={{ height }} className="flex-1 items-center justify-center gap-1 px-12" />;
}

type CharacterItem = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

function keyExtractor(item: CharacterItem) {
  return item.id.toString();
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: CharacterItem }) {
  return (
    <Card>
      <View className="flex-1 items-center justify-center">
        <View className="flex w-full flex-row items-center  gap-4">
          <Image source={{ uri: item.image }} className="h-24 w-24 rounded-full" />
          <View className="flex flex-shrink flex-col gap-2  ">
            <Text className="text-xl">
              {item.name} ({item.status})
            </Text>
            <Text className="text-lg">{item.episode.length} Episodes</Text>
            <Text className="text-lg">{item.origin.name}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className={` ${colorScheme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'} h-auto min-h-44 rounded-lg p-4`}>
      {children}
    </View>
  );
}
