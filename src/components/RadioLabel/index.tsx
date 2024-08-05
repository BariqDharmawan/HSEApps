import { GestureResponderEvent } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const RadioLabel = ({
    label,
    value,
    status,
    onPress,
}: {
    label: string;
    onPress?: (e: GestureResponderEvent) => void;
    value: string;
    status?: 'checked' | 'unchecked';
}) => {
    return (
        <>
            <Text
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {label}
            </Text>
            <RadioButton key={label.replaceAll(' ', '-')} value={value} status={status} onPress={onPress} />
        </>
    );
};

export default RadioLabel;
