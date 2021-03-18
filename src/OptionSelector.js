const OptionSelector = ({ options, handleSelectOption }) => {
    return (
        <select onChange={(e) => { handleSelectOption(e.target.value) }}>
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.optionName}
                </option>
            ))}
        </select>
    );
}

export default OptionSelector;
