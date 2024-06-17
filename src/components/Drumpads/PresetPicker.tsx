import Select, { SingleValue } from 'react-select';
import { Presets } from '../../db/presets/Presets';
import { useAppContext } from '../../context/useAppContext';
import { useState } from 'react';

export const PresetPicker = () => {
    const { handlePresetChange, preset } = useAppContext();

    const options = Object.entries(Presets).map(([key, value]) => ({
        value: key,
        label: value,
    }));

    const [selectedValue, setSelectedValue] = useState<SingleValue<{ label: string, value: string }>>({ label: preset, value: preset });

    const handleChange = (selectedOption: SingleValue<{ label: string, value: string }>) => {
        if (selectedOption) {
            const selectedPreset = Presets[selectedOption.value as keyof typeof Presets];
            setSelectedValue(selectedOption);
            handlePresetChange(selectedPreset);
        }
    };

    return (
        <Select
            value={selectedValue}
            defaultValue={selectedValue}
            theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: {
                    ...theme.colors,
                    primary25: '#c026d3', // Color de fondo para la opción en hover
                    primary: '#c026d3', // Color de fondo para la opción seleccionada
                    neutral0: '#262626', // Color de fondo del menú
                    neutral80: '#c026d3', // Color del texto de la opción seleccionada
                },
            })}
            styles={{
                container: (base) => ({
                    ...base,
                    borderRadius: '8px',
                    flexGrow: 1,
                }),
                control: (base) => ({
                    ...base,
                    backgroundColor: '#262626',
                    border: 'none',
                    color: '#c026d3',
                    borderRadius: '8px',
                }),
                dropdownIndicator: (base) => ({
                    ...base,
                    backgroundColor: '#555',
                    color: '#222',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display: 'none',
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: '#262626',
                    borderRadius: '8px',
                }),
                menuList: (base) => ({
                    ...base,
                    backgroundColor: '#262626',
                    color: '#777',
                    borderRadius: '8px',
                }),
                singleValue: (base) => ({
                    ...base,
                    color: '#777',
                }),
                option: (base, { isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? '#c026d3' : '#262626',
                    color: isSelected ? '#262626' : '#777',
                    '&:hover': {
                        backgroundColor: '#c026d3',
                        color: '#262626',
                    },
                }),
            }}
            onChange={handleChange}
            isSearchable={false}
            options={options}
        />
    );
};
