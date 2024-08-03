import CardCategory from '@/components/CardCategory';
import PlusButton from '@/components/PlusButton';
import useGetCategory from '@/hooks/useGetCategory';
import { Link } from 'expo-router';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { FAB as Fab } from 'react-native-paper';

const CategoryScreen = () => {
    const { posts } = useGetCategory();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={posts}
                columnWrapperStyle={{
                    gap: 20,
                }}
                contentContainerStyle={{
                    gap: 20,
                }}
                renderItem={({ item: post }) => (
                    <CardCategory imgSrc="https://picsum.photos/700" title={post.title} btnLabel="Lihat Laporan" />
                )}
                numColumns={2}
                key={2}
                keyExtractor={(item) => item.title.replaceAll(' ', '-')}
            />
            <Link href="/AddCategoryPages" style={styles.tabHref} asChild>
                <PlusButton />
            </Link>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tabHref: {
        position: 'absolute',
        left: '50%',
        bottom: 16,
        marginLeft: -10,
    },
});

export default CategoryScreen;
