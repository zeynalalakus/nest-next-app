import {useContext} from "react";
import {ThemeContext} from "../../components/store/theme-context";

const Themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave",
    "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel",
    "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid",
    "lemonade", "night", "coffee", "winter"];

export default function Settings(props: any) {
    const themeCtx = useContext(ThemeContext);

    return (
        <div className="flex justify-center py-5 border-secondary-content/20">
            <div className="flex flex-col gap-3">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-5">Settings</h1>
                </div>
                <div className="form-control w-[200px]">
                    <label className="label">
                        <span className="label-text text-xl">Theme</span>
                    </label>
                    <select value={themeCtx.theme} className="select select-bordered text-lg"
                            onChange={($event) => themeCtx.onSetTheme($event.target.value)}>
                        {Themes.map(theme => {
                            return <option key={theme} value={theme}>{theme}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>

    )
}
