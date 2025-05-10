import { Button } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    text: string
    onClick?: () => void
}

function MyButton({text, onClick }: Props) {

    const { theme } = useTheme();
    const variant = theme === 'dark' ? 'dark' : 'light';
    
    return ( <Button variant={variant} onClick={onClick} className="shadow-xs shadow-gray-500 mx-2">{text}</Button> );
}

export default MyButton