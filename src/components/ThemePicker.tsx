import { COLORS } from "../db/theme/Colors";

export const ThemePicker = () => {
    
    const setTheme = (theme: string) => {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    return (
        <ul className="m-2 flex justify-center gap-2">
            {COLORS.map((color) => (
                <li style={{background:color.value}} key={color.name} onClick={() => setTheme(color.name)} className="rounded-lg"> 
                    <button style={{background:color.value}} className={`rounded-lg p-4`}></button>
                </li>
            ))}
        </ul>
    )
}