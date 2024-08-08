import React, { PropsWithChildren } from 'react';
import { Card, TextInput } from 'react-native-paper';

const FormCategorySection = ({
    value,
    onChangeText,
    children,
}: PropsWithChildren<{ value: string; onChangeText: ((text: string) => void) & Function }>) => {
    return (
        <Card
            style={{
                marginTop: 40,
                borderRadius: 4,
                backgroundColor: 'white',
            }}
        >
            <Card.Content>
                <TextInput
                    label="Section Title"
                    mode="flat"
                    style={{
                        flexGrow: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: '#C1C1C1',
                        marginBottom: 30,
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    blurOnSubmit
                />

                {children}
            </Card.Content>
        </Card>
    );
};

export default FormCategorySection;
