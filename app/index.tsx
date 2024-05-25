import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/lib/useColorScheme';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

export default function Screen() {
  const searchValue: string = '';

  const data = searchValue
    ? CHARACTERS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    : CHARACTERS;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={data}
      estimatedItemSize={200}
      contentContainerClassName="py-4 android:pb-12"
      extraData={searchValue}
      removeClippedSubviews={false} // used for selecting text on android
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      ListEmptyComponent={CHARACTERS.length === 0 ? ListEmptyComponent : undefined}
    />
  );
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return <View style={{ height }} className="flex-1 items-center justify-center gap-1 px-12" />;
}

type CharacterItem = { name: string };

function keyExtractor(item: CharacterItem) {
  return item.name;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: CharacterItem }) {
  return (
    <Card>
      <View className="flex-1 items-center justify-center">
        <View className="text-center">
          <View className="text-lg font-bold">{item.name}</View>
        </View>
      </View>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <View className="px-4" />;
}

const CHARACTERS: CharacterItem[] = [
  {
    name: 'Rick',
  },
];
