import { Button } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    text: string
    onClick?: () => void
    className?: string
}

function MyButton({text, onClick, className }: Props) {

    const { theme } = useTheme();
    const variant = theme === 'dark' ? 'dark' : 'light';
    
    return ( <Button variant={variant} onClick={onClick} className={"shadow-xs shadow-gray-500 mx-2" + className}>{text}</Button> );
}

export default MyButton