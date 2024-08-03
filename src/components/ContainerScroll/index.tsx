import { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContainerScroll = ({ children, styleCss }: PropsWithChildren<{ styleCss?: StyleProp<ViewStyle> }>) => {
    return (
        <SafeAreaView>
            <ScrollView
                keyboardDismissMode="on-drag"
                style={{
                    paddingHorizontal: 20,
                    ...(styleCss as object),
                }}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ContainerScroll;
