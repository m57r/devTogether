const colorStyles = {
    control : (styles) => (
        {
        ...styles, 
        backgroundColor: '#FFFFFF', 
        opacity : '0.7', 
        }), 
    option : (styles, { data, isFocused }) => {
        return {
            ...styles, 
            color: isFocused ? 'white' : 0, 
            backgroundColor : isFocused ? data.color : 0
        }
    }, 
    multiValue : (styles, { data }) => {
        return{
            ...styles, 
            backgroundColor : data.color, 
            color : '#FFFF'
        }
    }, 
    multiValueLabel: (styles, { data }) => {
        return {
            ...styles, 
            color: '#FFFF'
        }
    }, 
    multiValueRemove: (styles, { data }) => {
        return {
            ...styles, 
            color: '#FFFF', 
            cursor: 'pointer', 
            ':hover' : { 
                color : '#e32e45'
            }
        }
    }
}

export default colorStyles; 