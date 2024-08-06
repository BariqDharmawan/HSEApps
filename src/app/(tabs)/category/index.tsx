import CardCategory from '@/components/CardCategory';
import PlusButton from '@/components/PlusButton';
import useGetCategory from '@/hooks/useGetCategory';
import { Link } from 'expo-router';
import {  FlatList, SafeAreaView,  StyleSheet } from 'react-native';

const CategoryScreen = () => {
    const { data: categories } = useGetCategory();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={categories}
                columnWrapperStyle={{
                    gap: 20,
                }}
                contentContainerStyle={{
                    gap: 20,
                }}
                renderItem={({ item: post }) => (
                    <CardCategory imgSrc="https://picsum.photos/700" title={post.label} btnLabel="Lihat Laporan" />
                )}
                numColumns={2}
                key={2}
                keyExtractor={(item) => item.label.replaceAll(' ', '-')}
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
        flex: 1,
        paddingHorizontal: 20,
    },
    tabHref: {
        position: 'absolute',
        left: '50%',
        bottom: 24,
        marginLeft: -10,
    },
});

export default CategoryScreen;
