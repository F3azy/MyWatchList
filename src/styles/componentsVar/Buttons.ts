const ButtonTheme = {
    variants: {
        'full': {
            bg: "#56B4DC",
            _hover:{bg: "#0B92F0"},
            color: "#141414",
        },
        
        'outline': {
            bg: "#141414",
            color: "#56B4DC",
            borderColor: "#56B4DC",
            _hover: {
                bg: "#0B92F0",
                color: "#141414",
                borderColor: "#0B92F0",
            },
        },
    }
}

export default ButtonTheme;