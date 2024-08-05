import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

const SwitcherLabel = ({
    label,
    onValueChange,
    value,
}: {
    value?: boolean;
    onValueChange?: ((value: boolean) => Promise<void> | void) & Function;
    label: string;
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
            }}
        >
            <Switch
                value={value}
                style={{
                    transform: [
                        {
                            scale: 1.3,
                        },
                    ],
                }}
                onValueChange={onValueChange}
            />
            <Text
                style={{
                    fontSize: 18,
                }}
            >
                {label}
            </Text>
        </View>
    );
};

export default SwitcherLabel;
