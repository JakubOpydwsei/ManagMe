import { Button } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

function ThemeButton() {
    const {theme,toggleTheme} = useTheme()

    return ( <>
    <Button onClick={toggleTheme} variant="primary">
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </Button>
    </> );
}

export default ThemeButton;