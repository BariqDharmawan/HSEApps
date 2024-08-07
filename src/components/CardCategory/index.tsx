import { truncateString } from '@/utils/strNumber';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const CardCategory = ({ title, btnLabel, imgSrc, id }: { id: string; imgSrc: string; title: string; btnLabel: ReactNode | string }) => {
    const router = useRouter()

    return (
        <Card style={styles.item} mode="outlined">
            <Card.Cover
                source={{ uri: imgSrc }}
                style={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    shadowOffset: {
                        width: 3,
                        height: 3,
                    },
                    shadowRadius: 3,
                }}
            />
            <Card.Content style={styles.cardContent}>
                <Text style={styles.title} variant="titleMedium">
                    {truncateString(title, 20)}
                </Text>
                <Button mode="contained" style={styles.action} onPress={() => {
                    router.push(`/category/${id}`)
                }} dark compact>
                    {btnLabel}
                </Button>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1 / 2,
        overflow: 'hidden',
        flexDirection: 'column',
        backgroundColor: '#F8F9FE',
        borderColor: '#E0E2E6',
    },
    action: {
        marginTop: 'auto',
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
    },
    cardContent: {
        flex: 1,
        height: '100%',
        paddingVertical: 20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
});

export default CardCategory;
